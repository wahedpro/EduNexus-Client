import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/Home/HomePage";
import AllClass from "../pages/AllClass/AllClass/AllClass";

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
            }
        ]
    },
]);

export default router;