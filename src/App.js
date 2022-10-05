import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";

const App = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<DashboardAdminPage />}></Route>
    </Routes>
  );
};

export default App;
