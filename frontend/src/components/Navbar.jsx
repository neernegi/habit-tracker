import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, LogOut, User, Plus, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-24 bg-linear-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">
                HabitTracker
              </span>
              <p className="text-xs text-white/80">Build better habits daily</p>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`md:flex items-center space-x-6 ${
              mobileMenuOpen
                ? "block absolute top-full left-0 right-0 bg-linear-to-r from-indigo-600 to-purple-600 p-6 md:p-0 md:relative md:bg-transparent shadow-lg md:shadow-none"
                : "hidden md:flex"
            }`}
          >
            {user ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-purple-400 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {user.email.split("@")[0]}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 hover:shadow-lg backdrop-blur-sm group"
                  >
                    <LogOut className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                    <span className="text-white font-medium">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-3 bg-linear-to-r from-white to-cyan-100 text-indigo-700 font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
