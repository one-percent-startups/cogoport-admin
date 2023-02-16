import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import app_api from '../config/config';
import Select from 'react-select';
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

  const [stream, setStream] = useState([]);
  const [streamLoading, setStreamLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);

  const [filterStream, setFilterStream] = useState(null);

  const [search, setSearch] = useState('');

  useEffect(() => {
    app_api
      .get(`course-content/batch/1`)
      .then((res) => {
        setStudentData(res.data);
      })
      .catch((err) => {});
    app_api
      .get('stream')
      .then((res) => res.data)
      .then((res) => {
        setStream(res.data);
        setStreamLoading(false);
        setStreamError(null);
      })
      .catch((err) => {
        setStreamLoading(false);
        setStreamError(err?.response?.data?.message || 'Error getting streams');
      });
  }, []);

  const onStreamFilterChange = (value) => {
    if (value) setFilterStream(value.value);
    else setFilterStream(null);
  };

  let regex = new RegExp(search.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'i');
  return (
    <div className="flex flex-col pb-10 mt-10">
      <div className="flex justify-between">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search through students"
          className="w-4/12 block px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none disabled:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        <Select
          className="w-4/12"
          placeholder="Filter by track"
          isClearable
          isSearchable
          options={stream.map((s) => ({ ...s, label: s.name, value: s.id }))}
          loadingMessage="Getting tracks..."
          isLoading={streamLoading}
          onChange={onStreamFilterChange}
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex flex-col">
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
                        Full name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Track
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Exercises
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Problem sets
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Projects
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {studentdata
                      .filter((l) => {
                        if (filterStream) return l.streamId == filterStream;
                        else return true;
                      })
                      .filter((l) => {
                        if (search) return l?.name.match(regex);
                        else return true;
                      })
                      .map((studentlist, idx) => (
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
                            {studentlist.stream}
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
    </div>
  );
}
