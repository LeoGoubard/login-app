import { Username, Profile, Register, PageNotFound, Password, Recovery, Reset } from '../components';
import { AuthoriseUser, Protectroute } from "../middleware/auth";

export const router = [
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
      element: <Protectroute><Password /></Protectroute>
    },
    {
      path: "/profile",
      element: <AuthoriseUser><Profile /></AuthoriseUser>
    },
    {
      path: "/recovery",
      element: <Protectroute><Recovery /></Protectroute>
    },
    {
      path: "/reset",
      element: <Protectroute><Reset /></Protectroute>
    },
    {
      path: "*",
      element: <PageNotFound></PageNotFound>
    }
  ]