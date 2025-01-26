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
import AddClassPage from "../pages/Dashboard/Teacher/AddClass/AddClassPage";
import MyClassPage from "../pages/Dashboard/Teacher/MyClass/MyClassPage";
import UpdateClassPage from "../pages/Dashboard/Teacher/UpdateClass/UpdateClassPage";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import TeacherRequestPage from "../pages/Dashboard/Admin/TeacherRequest/TeacherRequestPage";
import AllClassesListPage from "../pages/Dashboard/Admin/AllClassesList/AllClassesListPage";
import UserListPage from "../pages/Dashboard/Admin/UserList/UserListPage";
import ClassDetailsPage from "../pages/ClassDetails/ClassDetailsPage";
import PaymentPage from "../pages/Payment/PaymentPage";
import SeeDetailsPage from "../pages/Dashboard/Teacher/SeeDetails/SeeDetailsPage";
import MyEnrollClassDetails from "../pages/Dashboard/Student/MyEnrollClassDetails/MyEnrollClassDetails";
import StudentDashboard from "../pages/Dashboard/Student/StudentDashboard/StudentDashboard";
import TeacherDashboard from "../pages/Dashboard/Teacher/TeacherDashboard/TeacherDashboard";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

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
                element: <AllClass></AllClass>,
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
                element: <PrivateRoute><BecomeInstructor></BecomeInstructor></PrivateRoute>
            },
            {
                path: 'classDetailsPage/:id',
                element: <PrivateRoute><ClassDetailsPage></ClassDetailsPage></PrivateRoute>,
                loader: ({ params }) => fetch(`https://y-five-lemon.vercel.app/classes/${params.id}`),
            },
            {
                path: 'payment',
                element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path:"/dashboard",
                element: <PrivateRoute><StudentDashboard></StudentDashboard></PrivateRoute>,
            },
            {
                path:"MyEnrollClass",
                element: <PrivateRoute><MyEnrollClass></MyEnrollClass></PrivateRoute>
            },
            {
                path:"profile",
                element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>
            },
            {
                path: "/dashboard/MyEnrollClass/:id",
                element: <PrivateRoute><MyEnrollClassDetails/></PrivateRoute>
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
            }
        ]
    },
    {
        path: "teacherDashboard",
        element: <TeacherDashboardLayout></TeacherDashboardLayout>,
        children: [
            {
                path: "/teacherDashboard",
                element: <PrivateRoute><TeacherDashboard></TeacherDashboard></PrivateRoute>
            },
            {
                path: "addClass",
                element: <PrivateRoute><AddClassPage></AddClassPage></PrivateRoute>
            },
            {
                path: "myClass",
                element: <PrivateRoute><MyClassPage></MyClassPage></PrivateRoute>
            },
            {
                path: "profile",
                element:<PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>,
            },
            {
                path: "classUpdate/:id",
                element: <PrivateRoute><UpdateClassPage></UpdateClassPage></PrivateRoute>,
                loader: ({ params }) => fetch(`https://y-five-lemon.vercel.app/classes/${params.id}`),
            },
            {
                path: "myClass/:id",
                element: <PrivateRoute><SeeDetailsPage></SeeDetailsPage></PrivateRoute>,
                loader: ({ params }) => fetch(`https://y-five-lemon.vercel.app/classes/${params.id}`),
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
            }
            
        ]
    },
    {
        path: "admin",
        element: <AdminDashboardLayout></AdminDashboardLayout>,
        children:[
            {
                path:"teacherRequest",
                element: <PrivateRoute><TeacherRequestPage></TeacherRequestPage></PrivateRoute>,
                loader: () => fetch('https://y-five-lemon.vercel.app/requests'),
            },
            {
                path:"allClasses",
                element: <PrivateRoute><AllClassesListPage></AllClassesListPage></PrivateRoute>
            },
            {
                path:"userList",
                element: <PrivateRoute><UserListPage></UserListPage></PrivateRoute>
            },
            {
                path:"profile",
                element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
            }
        ]
    }
]);

export default router;