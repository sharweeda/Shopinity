import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Navbar() {
  const { token, setToken } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  const navgate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setOpenMenu(false);
    navgate("/login");
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Shopinity
        </NavLink>

        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="text-sm rounded-full focus:outline-none focus:ring-2"
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/300" alt="user" />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-700 z-50">
              {token ? (
                <div className="py-1">
                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpenMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </NavLink>
                  <span
                    onClick={handleLogout}
                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    LogOut
                  </span>
                </div>
              ) : (
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <li>
                    <NavLink
                      to="/login"
                      onClick={() => setOpenMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      onClick={() => setOpenMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
