import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import app_api from '../config/config';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  StarIcon,
  MinusCircleIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Leaderboard() {
  const [user, setUser] = useState({});
  const [leaderboardd2d, setLeaderboardd2d] = useState([]);
  const [d2dLoading, setd2dLoading] = useState(true);
  const [d2dError, setd2dError] = useState(null);
  const [selectdate, setSelectDate] = useState('d2d');

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('cogoportAdminKey')).data);
    } catch {}
  }, []);

  useEffect(() => {
    app_api
      .get(`leaderboard/${selectdate}`)
      // .get('leaderboard/d2d')
      .then((res) => {
        setLeaderboardd2d(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setd2dError(err);
      });
  }, [selectdate]);

  return (
    <div className="px-8 sm:px-6 lg:px-1">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[270px]">
        <div className="flex flex-row justify-between px-5 py-3">
          <div>
            <h2 className="text-black font-bold text-lg ">Leaderboard</h2>
          </div>
          <div className="">
            {/* <Menu as="div" className="relative inline-block text-left">
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
                          id="today"
                          onClick={setdateToday}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Today
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          id="all"
                          onClick={setdateOverall}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Overall
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu> */}
            <select
              className="border-0 p-2"
              onChange={(e) => setSelectDate(e.target.value)}
            >
              <option value="d2d" className="p-3">
                Today
              </option>
              <option value="all" className="p-3">
                Overall
              </option>
            </select>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-50">
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
            {leaderboardd2d.map((d2d, d2dIndx) => (
              <tr key={d2dIndx} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-10 py-4 text-lg flex font-semibold text-black text-black font-medium  whitespace-nowrap"
                >
                  {leaderboardd2d.indexOf(d2d) + 1 === 1 ? (
                    <>
                      <StarIcon className="text-yellow-500 w-4 mr-1" />{' '}
                      {leaderboardd2d.indexOf(d2d) + 1}{' '}
                    </>
                  ) : leaderboardd2d.indexOf(d2d) + 1 === 2 ? (
                    <>
                      <StarIcon className="text-gray-400 w-4 mr-1" />
                      {leaderboardd2d.indexOf(d2d) + 1}{' '}
                    </>
                  ) : leaderboardd2d.indexOf(d2d) + 1 === 3 ? (
                    <>
                      <StarIcon className="text-amber-900 w-4 mr-1" />
                      {leaderboardd2d.indexOf(d2d) + 1}
                    </>
                  ) : (
                    <>
                      <p className="mx-auto">
                        {leaderboardd2d.indexOf(d2d) + 1}
                      </p>
                    </>
                  )}
                  
                  {d2d.yesterday ? (d2d.yesterday != -1 ? (
                    d2d.yesterday > leaderboardd2d.indexOf(d2d) ? (
                      <span className="ml-2 text-sm text-green-400 inline-flex items-center">
                        <ChevronUpIcon className="w-4 " />
                        {d2d.yesterday - leaderboardd2d.indexOf(d2d)}
                      </span>
                    ) : d2d.yesterday < leaderboardd2d.indexOf(d2d) ? (
                      <span className="ml-2 text-sm text-red-400 inline-flex items-center">
                        <ChevronDownIcon className="w-4 " />
                        {d2d.yesterday - leaderboardd2d.indexOf(d2d)}
                      </span>
                    ) : leaderboardd2d.indexOf(d2d) ? (
                      <span className="ml-2 text-sm text-green-400 inline-flex items-center">
                        <ChevronUpIcon className="w-4 " />
                        {leaderboardd2d.indexOf(d2d)}
                      </span>
                    ) : null
                  ) : (
                    <span className="ml-2 text-sm text-gray-300 inline-flex items-center">
                      <MinusCircleIcon className="bg-grey-500 w-4 ml-auto" />
                    </span>
                  )):null}
                </th>
                <td className="px-10 py-4 text-lg font-semibold text-black text-black">
                  <a href={`/student/${leaderboardd2d.indexOf(d2d)}`} className="hover:text-gray-400">
                  {d2d.user.fullName}
                  </a>
                </td>
                <td className="px-10 py-4 text-lg font-semibold text-black text-black">
                  {d2d.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
