import React from 'react'
import Section1 from './components/Section1'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }
  ]);
  
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
