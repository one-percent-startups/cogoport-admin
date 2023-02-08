import { useLayoutEffect, useRef, useState, useEffect } from "react";
import app_api from "../config/config";
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
  return classes.filter(Boolean).join(" ");
}

export default function Table() {

  const [studentdata, setStudentData] = useState([]);
  useEffect(() => {
    app_api
      .get(`/users/batch/1`)
      .then((res) => {
        setStudentData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      FullName
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Github Username
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {studentdata.map((studentlist) => (
                    <tr
                      key={studentlist.email}
                     
                    >
                      
                      <td
                        className={classNames(
                          "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                         
                        )}
                      >
                      <a href={`/student/${studentlist.id}`} className="hover:text-gray-400">
                        {studentlist.fullName}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {studentlist.githubUsername}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {studentlist.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {studentlist.role}
                        </span>
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
