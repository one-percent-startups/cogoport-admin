import { useState, useEffect } from 'react';
import app_api from '../config/config';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  StarIcon,
  MinusCircleIcon,
} from '@heroicons/react/20/solid';

export default function Leaderboard({
  onChangeSelectDate,
  selectDate,
  leaderboardd2d,
}) {
  return (
    <div className="px-8 sm:px-6 lg:px-1">
      <div className="flex flex-row justify-between px-5 py-3">
        <div>
          <h2 className="text-black font-bold text-lg ">Leaderboard</h2>
        </div>
        <div className="">
          <select
            className="border-0 p-2"
            onChange={(e) => onChangeSelectDate(e.target.value)}
            value={selectDate}
          >
            <option value="all" className="p-3">
              Overall
            </option>
            <option value="d2d" className="p-3">
              Today
            </option>
          </select>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[270px]">
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
                  className="px-10 py-4 text-lg flex font-semibold text-black text-black font-medium"
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

                  {d2d.yesterday ? (
                    d2d.yesterday != -1 ? (
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
                    )
                  ) : null}
                </th>
                <td className="px-10 py-4 text-lg font-semibold text-black text-black">
                  <a
                    href={`/student/${d2d.userId}`}
                    className="hover:text-gray-400"
                  >
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
