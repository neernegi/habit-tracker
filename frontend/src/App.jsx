import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return null; // or a loader while checking auth

  return (
    <div>
      <Navbar />
      <main className="mt-24">
        <Routes>
         
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          {/* Redirect root and unknown routes */}
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </main>
    </div>
  );
}
