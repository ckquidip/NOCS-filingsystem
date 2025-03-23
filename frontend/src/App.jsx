import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./views/AdminDashboard";
import LoginPage from "./views/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
