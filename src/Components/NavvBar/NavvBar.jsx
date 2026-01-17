import {
  faShareNodes,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/Auth.context";

export default function NavvBar() {
  let { token, setToken } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    setIsOpen(false);
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto flex justify-between p-4 items-center">
        {/* Logo */}
        <Link
          to="/"
          className="logo flex text-2xl justify-center items-center gap-2"
        >
          <FontAwesomeIcon className="text-sky-600" icon={faShareNodes} />
          <h1 className="font-bold text-gray-800">Social Hub</h1>
        </Link>

        {/* User Photo with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center cursor-pointer"
          >
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-sky-500 transition-colors"
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faUser} className="text-sky-600" />
                <span>Profile</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => signOut()}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
