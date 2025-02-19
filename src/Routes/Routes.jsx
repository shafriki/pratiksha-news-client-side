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
import Profile from "../Pages/Profile";
import ArticleDetails from "../Pages/ArticlesDetails/ArticleDetails";
import ErrorPage from "../Pages/Error Page/ErrorPage";
import Payment from "../Pages/Payment/Payment";
import Details from "../Pages/My Articles/Details";
import UpdateArticle from "../Pages/My Articles/UpdateArticle";
import ContactUs from "../Pages/ContactUs/ContactUs";

export const router = createBrowserRouter([

    // main layout
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
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
        path: '/contact',
        element: <ContactUs></ContactUs>
      },
      {
        path: '/payment',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
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
        path: 'my-articles/details/:id',
        element: <PrivateRoute><Details></Details></PrivateRoute>
      },
      {
        path: 'my-articles/update/:id',
        element: <PrivateRoute><UpdateArticle></UpdateArticle></PrivateRoute>
    },
    
      {
        path: 'all-articles',
        element: <ViewAllArticles></ViewAllArticles>,
      },
      {
        path: 'articles-details/:id',
        element: <PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>,
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