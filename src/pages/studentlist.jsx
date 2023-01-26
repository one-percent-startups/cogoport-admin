import React from "react";
import NavBar from "../components/navigation";
import Table from "../components/table";
const tabs = [
  { name: "Batch A", href: "#", current: true },
  { name: "Batch A", href: "#", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StudentList = () => {
  return (
    <div className="mb-20">
      <NavBar />
      <div className="md:container mx-auto">
        <div className="">
          <h1 className="my-12 text-4xl font-bold">
            Student List<span className="text-gray-500 text-sm ml-1  ">10</span>
          </h1>

          <div className="flex flex-wrap justify-between mb-20 ">
            <div className="w-3/12  rounded-2xl border-2 p-3">
              <p className="text-gray-500 mb-4">Total members</p>
              <div className="flex flex-wrap justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold">1,786</h1>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-3xl border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    20%
                  </button>
                </div>
              </div>
            </div>

            <div className="w-3/12 rounded-2xl border-2 p-3">
              <p className="text-gray-500 mb-4">Total members</p>
              <div className="flex flex-wrap justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold">1,786</h1>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-3xl border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    20%
                  </button>
                </div>
              </div>
            </div>

            <div className="w-3/12 rounded-2xl border-2 p-3">
              <p className="text-gray-500 mb-4">Total members</p>
              <div className="flex flex-wrap justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold">1,786</h1>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-3xl border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    20%
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-1">Select Batch</h3>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum</p>
          </div>
          <div className="flex flex-wrap  justify-between ">
            <div>
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
                        "group relative flex-1 overflow-hidden border-black bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 focus:bg-black focus:text-white"
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
            <div>
              <form>
                <label
                  for="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Mockups, Logos..."
                    required
                  />
                  {/* <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button> */}
                </div>
              </form>
            </div>
          </div>

          <div className="mt-20">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
