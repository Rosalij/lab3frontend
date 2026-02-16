import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            
           {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/admin",
                element: (<ProtectedRoute><AdminPage /></ProtectedRoute>)
            },  
             { path: "/product/:id", element: <ProductPage /> },
        ]
    }


])

export default router;