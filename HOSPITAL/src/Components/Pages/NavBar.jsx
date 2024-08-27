import React, { useContext } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800 w-full">
        <div className="px-2 sm:px-6 lg:px-8 w-full">
          <div className="relative flex h-16 items-center justify-between w-full">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start w-full">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {user ? (
                    user.is_admin ? (
                      <Link
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                        to="/adminpanel"
                      >
                        <h1>ADMIN PANEL</h1>
                      </Link>
                    ) : user.is_doctor ? (
                      <Link
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                        to="/home"
                      >
                        <h1>DOCTOR HOME</h1>
                      </Link>
                    ) : (
                      <Link
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                        to="/home"
                      >
                        <h1>USER HOME</h1>
                      </Link>
                    )
                  ) : (
                    <Link
                      className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                      to="/login"
                    >
                      <h1>SIGN IN</h1>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {user ? (
              <p
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
                onClick={logoutUser}
              >
                Logout
              </p>
            ) : (
              <span className="space-x-4">
                <Link
                  to="/Login"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/"
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </span>
            )}

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default NavBar;
