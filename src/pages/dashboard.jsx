import React from "react";
import NavBar from "../components/navigation";
import Leaderboard from "../components/leaderboard";
import { ChevronUpIcon, StarIcon } from "@heroicons/react/24/outline";
import Table from "../components/table";
import avatar4 from "../assets/images/avatar4.jpeg";

const tabs = [
  { name: "Batch 1", href: "#", current: true },
  { name: "Batch 2", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {

    

  return (
    <>
      <NavBar />
      <div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
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
          className="fixed top-0 right-0 z-40 w-3/12 h-screen transition-transform -translate-x-full sm:translate-x-0 border-l"
          aria-label="Sidebar"
        >
          <div className="h-full px-5 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <h2 className="text-black text-lg font-semibold ">Profile</h2>
            <img src={avatar4} className="w-40 rounded-full mx-auto mt-6" />
            <p className="font-semibold text-xl text-center mt-3">
              Rishabh Mehta
            </p>
            <p className=" text-md text-center">@rishabh_47</p>
            <div className="flex bg-gray-200 rounded-2xl justify-around py-3 px-1 mt-8 mx-auto w-11/12">
              <div className="text-center">
                <p>Rank</p>
                <h3 className="font-semibold text-black text-lg">01</h3>
              </div>
              <div className="text-center">
                <p>Rank</p>
                <h3 className="font-semibold text-black text-lg">01</h3>
              </div>
              <div className="text-center">
                <p>Course</p>
                <h3 className="font-semibold text-black text-lg">12</h3>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-black text-lg font-semibold ">Upcoming</h2>
              <div className="flex bg-white shadow-md rounded-3xl mt-2 py-3 px-4 items-center">
                <div className="flex items-center h-5 rounded-full">
                  <input
                    id="helper-checkbox"
                    aria-describedby="helper-checkbox-text"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="ml-5 text-sm">
                  <label
                    for="helper-checkbox"
                    className="font-medium text-black text-lg font-semibold "
                  >
                    Flex Box
                  </label>
                  <p
                    id="helper-checkbox-text"
                    className="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    27 January 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div
          className="p-4 sm:ml-64  h-screen"
          style={{ marginRight: "24rem" }}
        >
          <div className="flex flex-wrap  justify-between">
            <div className="flex flex-wrap w-full justify-between items-center">
              <div className="mb-10 w-6/12">
                <h1 className="text-2xl mb-2 mt-5 font-bold ">
                  Welcome back, Rishabh!
                </h1>
                <p className="text-lg font-semibold text-gray-400">
                  January 27, Friday
                </p>
              </div>
              <div className="w-3/12 text-right">
                <div>
                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                      id="tabs"
                      name="tabs"
                      className="block p-4 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      defaultValue={tabs.find((tab) => tab.current).name}
                    >
                      {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className=" w-fullhidden sm:block ">
                    <nav
                      className=" isolate flex divide-x divide-gray-400 rounded-lg shadow border-2"
                      aria-label="Tabs"
                    >
                      {tabs.map((tab, tabIdx) => (
                        <a
                          key={tab.name}
                          href={tab.href}
                          className={classNames(
                            tab.current
                              ? "text-gray-900 bg-gray-900"
                              : "text-gray-500  hover:text-gray-900 ",
                            tabIdx === 0 ? "rounded-l-lg" : "",
                            tabIdx === tabs.length - 1 ? "rounded-r-lg " : "",
                            "group relative flex-1 overflow-hidden border-black bg-white py-3 px-5 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 focus:bg-black focus:text-white"
                          )}
                          aria-current={tab.current ? "page" : undefined}
                        >
                          <span>{tab.name}</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              tab.current ? "bg-indigo-500" : "bg-transparent",
                              "absolute inset-x-0 "
                            )}
                          />
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <Leaderboard className="8/12" />
            <div className="3/12">
              <h3 className="text-gray-400 mb-3">Overral Information</h3>
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Score
                </h3>
                <h2 className="inline-flex text-3xl font-bold">
                  210
                  <span className="ml-2 text-sm text-green-400 inline-flex items-center">
                    <ChevronUpIcon className="w-4 " />
                    +3%
                  </span>
                </h2>
              </div>

              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Hour Spend
                </h3>
                <h2 className="inline-flex text-3xl font-bold">
                  10h
                  <span className="ml-2 text-sm text-green-400 inline-flex items-center">
                    <ChevronUpIcon className="w-4 " />
                    +3%
                  </span>
                </h2>
              </div>

              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Total Student
                </h3>
                <h2 className="inline-flex text-3xl font-bold">
                  87
                  {/* <span className="ml-2 text-sm text-green-400 inline-flex items-center">
                    <ChevronUpIcon className="w-4 " />+3%
                  </span> */}
                </h2>
              </div>
            </div>
            <div />
          </div>
          <Table />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
