import "bootstrap/dist/css/bootstrap.min.css"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routing.tsx'
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
      <RouterProvider router={router} />
</ProductsProvider>
    </AuthProvider>
  </StrictMode>,
)
