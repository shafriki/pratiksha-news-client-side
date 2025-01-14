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
import AddArticles from "../Pages/Add Articles/AddArticles";
import PremiumArticles from "../Pages/Premium Articles/PremiumArticles";
import ViewAllArticles from "../Pages/All Articles/ViewAllArticles";
import MyArticles from "../Pages/My Articles/MyArticles";
import Subscription from "../Pages/Subscription/Subscription";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
      {
        path: 'add-articles',
        element: <PrivateRoute><AddArticles></AddArticles></PrivateRoute>,
      },
      {
        path: 'subscriptions',
        element: <PrivateRoute><Subscription></Subscription></PrivateRoute>,
      },
      {
        path: 'my-articles',
        element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>,
      },
      {
        path: 'all-articles',
        element: <ViewAllArticles></ViewAllArticles>,
      },
      {
        path: 'premium-articles',
        element: <PrivateRoute><PremiumArticles></PremiumArticles></PrivateRoute>,
      },
    ]
  },

  // dashboard
  {
    path: '/dashboard',
    element: <AdminRoute><DashboardLayout></DashboardLayout></AdminRoute>,
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