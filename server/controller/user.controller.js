import { User } from "../models/user.model.js";

const generateAccessAndRefresToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.accessTokenGenerate();
    const refreshToken = user.refreshTokenGenerate();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (req, res) => {
  const { email, password, userName } = req.body;

  if ([email, password, userName].some((field) => field?.trim() == "")) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  const exitingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (exitingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    email,
    password,
    userName,
  });

  const creatingUserRefresToken = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!creatingUserRefresToken) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }

  return res.status(200).json({
    message: "user created successfully",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const exsitingUser = await User.findOne({
    $or: [{ email }],
  });

  if (!exsitingUser) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }

  const isPasswordValid = await exsitingUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }

  const { refreshToken, accessToken } = await generateAccessAndRefresToken(
    exsitingUser._id
  );

  const loggedInUser = await User.findById(exsitingUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "user is logged in successfully",
      email,
      password,
    });
};

export const logoutUser = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    // Find the user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    // Assuming your cookies are named accessToken and refreshToken
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict', // Add sameSite attribute for CSRF protection
    };

   
    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    return res.status(200).json({
      message: "User is logged out successfully",
    });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


