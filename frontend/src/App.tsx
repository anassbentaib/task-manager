import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Header from "./components/layout/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashbaord";
import { TaskProvider } from "./contexts/TaskContext";
import TaskDetails from "./pages/TaskDetails";
import CategoriesPage from "./pages/Categories";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto py-6 px-4">
            <Routes>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/categories"
                element={user ? <CategoriesPage /> : <Navigate to="/login" />}
              />

              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/task/:id"
                element={user ? <TaskDetails /> : <Navigate to="/login" />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
