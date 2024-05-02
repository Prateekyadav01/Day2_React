import axios from "axios";

export const logout = async (email) => {
    try {
        const response = await axios.post("/api/v1/users/logout", { email });
        return response.data;
    } catch (error) {

        console.error("Error during logout API call:", error.message);

        throw error;
    }
};
