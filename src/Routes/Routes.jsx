import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import AllUsers from "../Pages/Dashboard/AllUsers";

export const router = createBrowserRouter([

    // main layout
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <h1>error bro</h1>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
    ]
  },

  // dashboard
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: 'all-users',
        element: <AllUsers></AllUsers>
      }
    ]
  },
]);