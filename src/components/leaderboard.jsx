import { useLayoutEffect, useRef, useState, useEffect } from "react";
import app_api from "../config/config";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon,StarIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Leaderboard() {
  //   const checkbox = useRef();
  //   const [checked, setChecked] = useState(false);
  //   const [indeterminate, setIndeterminate] = useState(false);
  //   const [selectedPeople, setSelectedPeople] = useState([]);

  //   useLayoutEffect(() => {
  //     const isIndeterminate =
  //       selectedPeople.length > 0 && selectedPeople.length < studentdata.length;
  //     setChecked(selectedPeople.length === studentdata.length);
  //     setIndeterminate(isIndeterminate);
  //     checkbox.current.indeterminate = isIndeterminate;
  //   }, [selectedPeople]);

  //   function toggleAll() {
  //     setSelectedPeople(checked || indeterminate ? [] : studentdata);
  //     setChecked(!checked && !indeterminate);
  //     setIndeterminate(false);
  //   }

  //   const [studentdata, setStudentData] = useState([]);
  //   useEffect(() => {
  //     app_api
  //       .get(`/users/batch/1`)
  //       .then((res) => {
  //         setStudentData(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  return (
    <div className="px-8 sm:px-6 lg:px-1">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-row justify-between px-5 py-3">
          <div>
            <h2 className="text-black font-bold text-lg ">
              Leaderboard
            </h2>
          </div>
          <div className="">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                  Select Date
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Today
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Overall
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" px-10 py-3">
                Ranking
              </th>
              <th scope="col" className="px-10 py-3">
                Student Name
              </th>
              <th scope="col" className="px-10 py-3">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-10 py-4 text-lg flex font-semibold text-black text-black font-medium  whitespace-nowrap dark:text-white"
              >
               <StarIcon className="text-yellow-500 w-4 mr-1" />01
              </th>
              <td className="px-10 py-4 text-lg font-semibold text-black text-black">
                Rishabh Mehta
              </td>
              <td className="px-10 py-4 text-lg font-semibold text-black text-black">
                100
              </td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-10 flex py-4 text-lg font-semibold text-black text-black font-medium  whitespace-nowrap dark:text-white"
              >
                <StarIcon className="text-gray-500 w-4 mr-1" />02
              </th>
              <td className="px-10 py-4 text-lg font-semibold text-black text-black">
                Prabjyot Sudan
              </td>
              <td className="px-10 py-4 text-lg font-semibold text-black text-black">
                100
              </td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-10 py-4 flex text-lg font-semibold text-black text-black font-medium  whitespace-nowrap dark:text-white"
              >
               <StarIcon className="text-amber-900 w-4 mr-1" /> 03
              </th>
              <td className="px-10 py-4 text-lg font-semibold text-black text-black">
                Utkarsh Mehta
              </td>
              <td className="px-10 py-4 text-lg font-semibold text-black text-black">
                100
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
