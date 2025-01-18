import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/Home/HomePage";
import AllClass from "../pages/AllClass/AllClass/AllClass";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import DashboardLayout from "../layouts/StudentDashboardLayout";
import MyEnrollClass from "../pages/Dashboard/Student/MyEnrollClass/MyEnrollClass";
import ProfilePage from "../pages/Dashboard/Student/Profile/ProfilePage";
import BecomeInstructor from "../pages/BecomeInstructor/BecomeInstructor";
import TeacherDashboardLayout from "../layouts/TeacherDashboardLayout";
import AddClassPage from "../pages/TeacherDashboard/AddClass/AddClassPage";
import MyClassPage from "../pages/TeacherDashboard/MyClass/MyClassPage";
import UpdateClassPage from "../pages/TeacherDashboard/UpdateClass/UpdateClassPage";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import TeacherRequestPage from "../pages/Dashboard/Admin/TeacherRequest/TeacherRequestPage";
import AllClassesListPage from "../pages/Dashboard/Admin/AllClassesList/AllClassesListPage";
import UserListPage from "../pages/Dashboard/Admin/UserList/UserListPage";

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
                path: "profile",
                element:<ProfilePage></ProfilePage>,
            },
            {
                path: "classUpdate/:id",
                element: <UpdateClassPage></UpdateClassPage>,
                loader: ({ params }) => fetch(`http://localhost:3000/classes/${params.id}`),
            }
            
        ]
    },
    {
        path: "admin",
        element: <AdminDashboardLayout></AdminDashboardLayout>,
        children:[
            {
                path:"teacherRequest",
                element: <TeacherRequestPage></TeacherRequestPage>
            },
            {
                path:"allClasses",
                element: <AllClassesListPage></AllClassesListPage>
            },
            {
                path:"userList",
                element: <UserListPage></UserListPage>
            },
            {
                path:"profile",
                element: <ProfilePage></ProfilePage>
            },
            
        ]
    }
]);

export default router;