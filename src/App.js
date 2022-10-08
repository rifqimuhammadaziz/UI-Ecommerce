import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import CategoryAdminPage from "./pages/admin/CategoryAdminPage";
import ProductAdminListPage from "./pages/admin/ProductAdminListPage";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import ProductAdminCreatePage from "./pages/admin/ProductAdminCreatePage";
import ProductAdminDetailPage from "./pages/admin/ProductAdminDetailPage";
import ProductAdminEditPage from "./pages/admin/ProductAdminEditPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoutes>
            <DashboardAdminPage />
          </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoutes>
            <CategoryAdminPage />
          </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/admin/products"
        element={
          <ProtectedRoutes>
            <ProductAdminListPage />
          </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/admin/products/create"
        element={
          <ProtectedRoutes>
            <ProductAdminCreatePage />
          </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/admin/products/detail/:id"
        element={
          <ProtectedRoutes>
            <ProductAdminDetailPage />
          </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/admin/products/edit/:id"
        element={
          <ProtectedRoutes>
            <ProductAdminEditPage />
          </ProtectedRoutes>
        }
      ></Route>
    </Routes>
  );
};

export default App;
