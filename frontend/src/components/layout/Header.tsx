import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Task Manager
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.email}</span>
              <Button onClick={handleSignOut} variant="secondary">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Login
              </Link>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
