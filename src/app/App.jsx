import AuthLayout from "@/Pages/auth/AuthLayout";
import Login from "@/Pages/auth/Login";
import loginAction from "@/Pages/auth/model/loginAction";
import logoutLoader from "@/Pages/auth/model/logoutLoader";
import registerAction from "@/Pages/auth/model/registerAction";
import Register from "@/Pages/auth/Register";
import HomePage from "@/Pages/HomePage/HomePage";
import ChangeAccount from "@/Pages/Settings/ChangeAccount";
import {
  changeAction,
  ProfileLoader,
} from "@/Pages/Settings/model/AccountData";
import SettingsLayout from "@/Pages/Settings/SettingsLayout";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { NotificationProvider } from "@/shared/notification/NotificationProvider";
import { HomeLoader } from "@/Pages/HomePage/model/homeLoader";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: HomePage,
      loader: HomeLoader,
    },
    {
      path: "/settings",
      Component: SettingsLayout,
      children: [
        {
          index: true,
          element: <Navigate to={"account"} />,
        },
        {
          path: "account",
          Component: ChangeAccount,
          action: changeAction,
          loader: ProfileLoader,
        },
      ],
    },
    {
      path: "/auth",
      Component: AuthLayout,
      children: [
        {
          index: true,
          loader: () => {
            throw new Response("Not Found", { status: 404 });
          },
        },
        {
          path: "login",
          Component: Login,
          action: loginAction,
        },
        {
          path: "register",
          Component: Register,
          action: registerAction,
        },
        {
          path: "logout",
          loader: logoutLoader,
        },
      ],
    },
  ]);
  return (
    <NotificationProvider>
      <RouterProvider router={router}></RouterProvider>
    </NotificationProvider>
  );
};

export default App;
