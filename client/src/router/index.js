import { createBrowserRouter } from "react-router-dom";
import { Username, Profile, Register, PageNotFound, Password, Recovery, Reset } from '../components';


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Username></Username>
    },
    {
      path: "/register",
      element: <Register></Register>
    },
    {
      path: "/password",
      element: <Password></Password>
    },
    {
      path: "/profile",
      element: <Profile></Profile>
    },
    {
      path: "/recovery",
      element: <Recovery></Recovery>
    },
    {
      path: "/reset",
      element: <Reset></Reset>
    },
    {
      path: "*",
      element: <PageNotFound></PageNotFound>
    }
  ])