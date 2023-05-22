import { Routes, Route, Navigate } from "react-router-dom";
import './index.css';

import Auth from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import RtlLayout from "./layouts/rtl";
import UserPage from "./layouts/user";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<Auth />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="user/*" element={<UserPage />} />
      <Route path="/" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

export default App;
