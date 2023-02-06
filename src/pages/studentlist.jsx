import React, { useEffect, useState } from 'react';
import NavBar from '../components/navigation';
import Table from '../components/table';
import app_api from '../config/config';
import { Sample } from '../assets/sample';
import avatar4 from '../assets/images/avatar4.jpeg';
import SidebarRight from '../components/sidebar/sidebar-right';
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const tabs = [
  { name: 'Batch 1', href: '#', current: true },
  { name: 'Batch 2', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const StudentList = () => {
  const onLogout = () => {
    navigate('/logout');
  };

  return (
    <div className="mb-20">
      <NavBar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-6 py-4 sm:ml-64 mr-[22em]">
        <div className="">
          <h1 className="mt-4 mb-12 text-4xl font-bold">
            Student List
          </h1>

          <div className="flex flex-wrap justify-between mb-20 ">
            <div className="w-64  rounded-2xl border p-3">
              <p className="text-gray-500 mb-4">Total members</p>
              <div className="flex flex-wrap justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold">1,786</h1>
                </div>
                <div>
                  <button
                    type="button"
                    className="font-bold inline-flex items-center rounded-3xl border-2 border-black bg-white px-2.5 py-1.5 text-xs  text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    20%
                  </button>
                </div>
              </div>
            </div>
            <div className="w-64  rounded-2xl border p-3">
              <p className="text-gray-500 mb-4">Total members</p>
              <div className="flex flex-wrap justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold">1,786</h1>
                </div>
                <div>
                  <button
                    type="button"
                    className="font-bold inline-flex items-center rounded-3xl border-2 border-black bg-white px-2.5 py-1.5 text-xs  text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    20%
                  </button>
                </div>
              </div>
            </div>

            <div className="w-64 rounded-2xl border p-3">
              <p className="text-gray-500 mb-4">Total members</p>
              <div className="flex flex-wrap justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold">1,786</h1>
                </div>
                <div>
                  <button
                    type="button"
                    className="font-bold inline-flex items-center rounded-3xl border-2 border-black bg-white px-2.5 py-1.5 text-xs  text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    20%
                  </button>
                </div>
              </div>
            </div>

            <div className="w-64 rounded-2xl border p-3">
              <p className="text-gray-500 mb-4">Total members</p>
              <div className="flex flex-wrap justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold">1,786</h1>
                </div>
                <div>
                  <button
                    type="button"
                    className="font-bold inline-flex items-center rounded-3xl border-2 border-black bg-white px-2.5 py-1.5 text-xs  text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    20%
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-1">Select Batch</h3>
            
          </div>
          <div className="flex flex-wrap  justify-between ">
            <div className='w-[200px]'>
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
                          ? 'text-gray-900 '
                          : 'text-gray-500  hover:text-gray-900 ',
                        tabIdx === 0 ? 'rounded-l-lg' : '',
                        tabIdx === tabs.length - 1 ? 'rounded-r-lg ' : '',
                        'group relative flex-1 overflow-hidden border-black bg-white py-3 px-5 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 focus:bg-black focus:text-white'
                      )}
                      aria-current={tab.current ? 'page' : undefined}
                    >
                      <span>{tab.name}</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          tab.current ? 'bg-indigo-500' : 'bg-transparent',
                          'absolute inset-x-0 '
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
                  className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500"
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
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search "
                    required
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="mt-20">
            <Table />
          </div>
        </div>
      </div>
      <SidebarRight className="right-0 left-auto xl:block" />
    </div>
  );
};

export default StudentList;
