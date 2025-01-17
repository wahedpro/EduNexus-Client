import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/Home/HomePage";
import AllClass from "../pages/AllClass/AllClass/AllClass";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import DashboardLayout from "../layouts/StudentDashboardLayout";
import MyEnrollClass from "../pages/Dashboard/MyEnrollClass/MyEnrollClass";
import ProfilePage from "../pages/Dashboard/Profile/ProfilePage";
import BecomeInstructor from "../pages/BecomeInstructor/BecomeInstructor";
import TeacherDashboardLayout from "../layouts/TeacherDashboardLayout";
import AddClassPage from "../pages/TeacherDashboard/AddClass/AddClassPage";
import MyClassPage from "../pages/TeacherDashboard/MyClass/MyClassPage";
import TeacherProfilePage from "../pages/TeacherDashboard/TeacherProfile/TeacherProfilePage";

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
            {
                path: 'becomeInstructor',
                element: <BecomeInstructor></BecomeInstructor>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path:"MyEnrollClass",
                element: <MyEnrollClass></MyEnrollClass>
            },
            {
                path:"profile",
                element: <ProfilePage></ProfilePage>
            }
        ]
    },
    {
        path: "teacherDashboard",
        element: <TeacherDashboardLayout></TeacherDashboardLayout>,
        children: [
            {
                path: "addClass",
                element: <AddClassPage></AddClassPage>
            },
            {
                path: "myClass",
                element: <MyClassPage></MyClassPage>
            },
            {
                path:"teacherProfile",
                element: <TeacherProfilePage></TeacherProfilePage>
            }
        ]
    }
]);

export default router;