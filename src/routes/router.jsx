import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/Home/HomePage";
import AllClass from "../pages/AllClass/AllClass/AllClass";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import DashboardPage from "../pages/Dashboard/Dashboard/DashboardPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            },
            {
                path: 'AllClass',
                element: <AllClass></AllClass>
            },
            {
                path: 'Login',
                element: <LoginPage></LoginPage>
            },
            {
                path: 'register',
                element: <RegistrationPage></RegistrationPage>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardPage></DashboardPage>
    }
]);

export default router;