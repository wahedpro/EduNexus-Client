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
                loader: () => fetch('http://localhost:3000/allClasses'),
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
            },
            {
                path: 'classDetailsPage/:id',
                element: <ClassDetailsPage></ClassDetailsPage>,
                loader: ({ params }) => fetch(`http://localhost:3000/classes/${params.id}`),
            },
            {
                path: 'payment',
                element: <PaymentPage></PaymentPage>
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
            },
            {
                path: "/dashboard/MyEnrollClass/:id",
                element: <MyEnrollClassDetails />
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
            },
            {
                path: "myClass/:id",
                element: <SeeDetailsPage></SeeDetailsPage>,
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
                element: <TeacherRequestPage></TeacherRequestPage>,
                loader: () => fetch('http://localhost:3000/requests'),
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