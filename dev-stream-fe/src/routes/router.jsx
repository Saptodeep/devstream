import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Login from "../pages/Login";
import CourseDetails from "../pages/CourseDetails";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import UserProfile from "../pages/UserProfile";
import Settings from "../pages/Settings";
import MyCourses from "../pages/MyCourses";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/about', element: <About /> },
            {
                path: '/courses',
                loader: async () => {
                    //throw new Error("Something went wrong");
                    // return [
                    //     {id: 1, name: "NodeJS"},
                    //     {id: 2, name: "Java"},
                    //     {id: 3, name: "React"},
                    //     {id: 4, name: "MongoDB"}
                    // ]
                    const response = await fetch('http://localhost:8000/api/courses');
                    if (!response.ok) {
                        throw new Error('Failed to fetch courses');
                    }
                    return await response.json();
                },
                action: async ({ request }) => {
                    await new Promise((resolve) => {
                        setTimeout(resolve, 2000)
                    })
                    const formData = await request.formData();
                    const courseName = formData.get('course-name');
                    const courseDescription = formData.get('course-description');
                    const response = await fetch('http://localhost:8000/api/courses', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: courseName,
                            description: courseDescription
                        })
                    });
                    if (!response.ok) {
                        throw new Error("Failed to create the course")
                    }
                },
                element: <Courses />,
                errorElement: <ErrorPage />
            },
            { path: '/courses/:id', element: <CourseDetails /> },
            { path: '/login', element: <Login /> },
            { path: '*', element: <NotFound /> }
        ]
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute>
            <DashboardLayout />
        </ProtectedRoute>,
        children: [
            { index: true, element: <DashboardHome /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'settings', element: <Settings /> },
            { path: 'my-courses', element: <MyCourses /> },
            { path: '*', element: <NotFound /> }
        ]
    }
])

export default router;