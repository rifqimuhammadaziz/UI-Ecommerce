import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import CategoryAdminPage from "./pages/admin/CategoryAdminPage";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";

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
    </Routes>
  );
};

export default App;
