import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import AllUsers from "../Pages/Dashboard/AllUsers";
import Statistics from "../Pages/Dashboard/Statistics";
import AllPublishers from "../Pages/Dashboard/AllPublishers";
import AllArticles from "../Pages/Dashboard/AllArticles";

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
        path: 'statistics',
        element: <Statistics></Statistics>,
      },
      {
        path: 'all-users',
        element: <AllUsers></AllUsers>,
      },
      {
        path: 'all-publishers',
        element: <AllPublishers></AllPublishers>,
      },
      {
        path: 'all-articles',
        element: <AllArticles></AllArticles>,
      },
    ]
  },
]);