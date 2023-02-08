import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import app_api from '../config/config';
// const people = [
//   {
//     name: "Lindsay Walton",
//     title: "Front-end Developer",
//     email: "lindsay.walton@example.com",
//     role: "Member",
//   },
//   // More people...
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Table() {
  const [studentdata, setStudentData] = useState([]);
  useEffect(() => {
    app_api
      .get(`course-content/batch/1`)
      .then((res) => {
        setStudentData(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-1">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      FullName
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Exercises
                    </th>
                    <th scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Problem sets
                    </th>
                    <th scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Projects
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {studentdata.map((studentlist, idx) => (
                    <tr key={idx}>
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 px-3 text-sm font-medium capitalize'
                        )}
                      >
                        <a
                          href={`/student/${studentlist.id}`}
                          className="hover:text-gray-400"
                        >
                          {studentlist.name}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {studentlist.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {studentlist.exercise}%
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {studentlist.problem_set}%
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {studentlist.project}%
                      </td>

                      {/* <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {studentlist.name}</span>
                        </a>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
