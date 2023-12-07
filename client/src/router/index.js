import { createBrowserRouter } from "react-router-dom";
import { AuthoriseUser } from "../middleware/auth";
import { Register, Login } from "../pages";
import { Profile } from "../components";
import App from "../App";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthoriseUser>
        <App />
      </AuthoriseUser>
    ),
    children: [
      {
        path: "",
        element: <Profile />
      }
    ]
  },
  {
      path: '/register',
      element: <Register />,
  },
  {
      path: '/login',
      element: <Login />,
  },
]);

export default router;