import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/logout");
  };
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 pr-0 z-40 w-64 h-full overflow-y-auto transition-transform -translate-x-full sm:translate-x-0 border-r"
        aria-label="Sidebar"
      >
        
          <div className="my-7">
            <img src={logo} className="w-[64%] pl-[28px]" />
          </div>
          <div className="flex flex-col justify-between space-y-1 px-2 pb-4 h-[90vh]">
            <ul className="space-y-2">
              <li>
                <a
                  href="dashboard"
                  className="bg-sky-100 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-sky-50 focus:bg-sky-100"
                >
                  <span className="ml-3 text-md font-medium ">Dashboard</span>
                </a>
              </li>
              {/* <li>
                <a
                  href="/studentlist"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-sky-100 focus:bg-sky-100"
                >
                  <span className="flex-1 ml-3 whitespace-nowrap text-md font-medium">
                    Student List
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-sky-100"
                >
                  <span className="flex-1 ml-3 whitespace-nowrap text-md font-medium">
                    Curiculum
                  </span>
                </a>
              </li> */}
            </ul>
            <div className="p-3 rounded-lg bg-sky-50 text-sky-800">
              <p className="text-sm font-medium mt-3 mb-2">
                Welcome to Cogo Academy!
              </p>
              <p className="text-sm">
                Check out our new courses by clicking on any categories above!
              </p>
              <div className="py-10 my-5 rounded-lg bg-sky-100">
                <img
                  className="h-16 mx-auto w-100"
                  src={logo2}
                  alt="Your Company"
                />
              </div>
              <div className="flex font-medium">
                <span className="text-sm mr-3">©onepercentstartups</span>
              </div>
            </div>
          </div>
     
      </aside>
    </>
  );
};
export default NavBar;
