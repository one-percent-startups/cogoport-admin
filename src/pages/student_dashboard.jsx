import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { CheckIcon } from '@heroicons/react/24/outline';
import {
  ArrowSmallRightIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import avatar4 from '../assets/images/avatar4.jpeg';
import classNames from '../utils/classname';
import Dropdown from '../components/dropdown';
import moment from 'moment';
import NavBar from '../components/navigation';
import app_api from '../config/config';
import '../components/progressbar/nested_progress_bar.css';
import ProgressBar from 'react-customizable-progressbar';
import { Dialog, Transition } from '@headlessui/react';
import AsyncSelect from 'react-select/async';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from 'recharts';
import { motion } from 'framer-motion';
import {
  weeklyComparison,
  monthlyComparison,
  yearlyComparison,
} from '../data/student-graph.js';
import { RadioGroup } from '@headlessui/react';
import Table from '../components/tables/table';
import { student_dashboard } from '../components/tables/tableheader';

function CustomAxis({ x, y, payload }) {
  return (
    <g
      transform={`translate(${x},${y})`}
      className="text-sm text-gray-500 dark:text-gray-400"
    >
      <text x={0} y={0} dy={25} textAnchor="middle" fill="currentColor">
        {payload.value}
      </text>
    </g>
  );
}

function RadioGroupOption({ value }) {
  return (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <span
          className={`relative flex h-8 cursor-pointer items-center justify-center rounded-lg px-3 text-sm uppercase tracking-wider ${
            checked ? 'text-white' : 'text-darkColor dark:text-gray-400'
          }`}
        >
          {checked && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-darkColor shadow-large"
              layoutId="statusIndicator"
            />
          )}
          <span className="relative">{value}</span>
        </span>
      )}
    </RadioGroup.Option>
  );
}

function StudentCharts() {
  const [status, setStatus] = useState('Rank');
  const [studentinfo, setStudentInfo] = useState([]);
  const [userpoints, setUserPoints] = useState([]);

  const params = useParams();

  useEffect(() => {
    app_api
      .get(`leaderboard/progression/user/${params.studentid}`)
      .then((res) => {
        setStudentInfo(res.data);
      })
      .catch((err) => {});

    app_api
      .get(`points/history/user/${params.studentid}`)
      .then((res) => {
        setUserPoints(res.data);
      })
      .catch((err) => {});
  }, [params.studentid]);

  const handleOnChange = (value) => {
    setStatus(value);
    switch (value) {
      case 'Rank':
      case 'Points':
        setChartData(monthlyComparison);
        break;
      default:
        setChartData(yearlyComparison);
        break;
    }
  };

  const getLineChart = () => {
    return (
      <LineChart
        width={500}
        height={300}
        data={userpoints}
        margin={{
          top: 20,
          right: 25,
          left: 25,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="liquidity-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3A63E0" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#3A63E0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Line
          type={'monotone'}
          dataKey="_count.pointsEarned"
          name="Points earned"
          stroke="#3A63E0"
          strokeWidth={4}
          fill="url(#liquidity-gradient)"
          activeDot={{
            stroke: '#fff',
            strokeWidth: 5,
            r: 10,
          }}
        />
        {/* <Line
          type={'monotone'}
          dataKey="Obtain Point"
          stroke="green"
          strokeWidth={4}
          fill="url(#liquidity-gradient)"
          activeDot={{
            stroke: '#fff',
            strokeWidth: 5,
            r: 10,
          }}
        /> */}
        <XAxis
          dataKey="day"
          tick={<CustomAxis />}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
        //   content={<></>}
        //   cursor={{
        //     strokeWidth: 50,
        //     stroke: 'rgb(237, 239, 243)',
        //   }}
        //   wrapperStyle={{
        //     boxShadow: '0 0 1px 0px 4px 50px rgba(73, 93, 112, 0.08)',
        //     background: 'red',
        //   }}
        />
        <CartesianGrid
          vertical={false}
          strokeDasharray="10 5"
          stroke={'#E5E7EB'}
        />
        <YAxis />
      </LineChart>
    );
  };

  const getAreaChart = () => {
    return (
      <AreaChart
        data={studentinfo}
        margin={{
          top: 20,
          right: 25,
          left: 25,
          bottom: 5,
        }}
        // onMouseMove={(data) => {
        //   if (data.isTooltipActive) {
        //     setDate(data.activePayload && data.activePayload[0].payload.date);
        //   }
        // }}
      >
        <defs>
          <linearGradient id="liquidity-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3A63E0" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#3A63E0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          tick={<CustomAxis />}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
        // content={<></>}
        // cursor={{
        //   strokeWidth: 50,
        //   stroke: 'rgb(237, 239, 243)',
        // }}
        // wrapperStyle={{
        //   boxShadow: '0 0 1px 0px 4px 50px rgba(73, 93, 112, 0.08)',
        //   background: 'red',
        // }}
        />
        <CartesianGrid
          vertical={false}
          strokeDasharray="10 5"
          stroke={'#E5E7EB'}
        />
        <Area
          type="monotone"
          dataKey="position"
          name="Rank"
          stroke="#3A63E0"
          strokeWidth={4}
          fill="url(#liquidity-gradient)"
          activeDot={{
            stroke: '#fff',
            strokeWidth: 5,
            r: 10,
          }}
        />
      </AreaChart>
    );
  };

  const loadChart = {
    Rank: getAreaChart(),
    Points: getLineChart(),
  };

  return (
    <div className="light:border light:border-slate-200 rounded-lg bg-white p-6 dark:bg-light-dark sm:p-8">
      <div className="flex flex-col-reverse justify-between gap-8 md:items-start lg:flex-row lg:items-center lg:gap-4">
        <div></div>
        <RadioGroup
          value={status}
          onChange={handleOnChange}
          className="flex items-center gap-5"
        >
          <RadioGroupOption value="Rank" />
          <RadioGroupOption value="Points" />
        </RadioGroup>
      </div>

      <div className="-mx-6 mt-5 h-56 sm:mt-8 md:h-96 lg:h-[380px] xl:h-[402px] 2xl:h-[30rem] 3xl:h-[496px] 4xl:h-[580px]">
        <ResponsiveContainer width="100%" height="100%">
          {loadChart[status]}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  // const [studentinfo, setStudentInfo] = useState([]);
  // const [studentname, setStudentName] = useState([]);
  const [coursedetails, setCourseDetails] = useState([]);
  const [totalpoints, setTotalPoints] = useState({});
  const [userContent, setUserContent] = useState([]);
  const [selected, setSelected] = useState({});
  const [categoryoptions, setCategoryoptions] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [courseoptions, setCourseOptions] = useState([]);
  const [studentinfo, setStudentInfo] = useState({});
  const params = useParams();

  const [courseFilter, setCourseFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [contentTypeFilter, setContentTypeFilter] = useState(null);

  useEffect(() => {
    app_api
      .get(`course-content/user-completed/${params.studentid}/stream`)
      .then((res) => {
        setCourseDetails(res.data);
      })
      .catch((err) => {
        setCourseDetails({
          EXERCISE: { total: 0, completed: 0 },
          PROBLEM_SET: { total: 0, completed: 0 },
          PROJECT: { total: 0, completed: 0 },
        });
      });
    app_api.get(`course-category`).then((res) => {
      setCategoryoptions(res.data);
    });
    app_api.get('course').then((res) => {
      setAllCourses(res.data.data);
      setCourseOptions(res.data.data);
    });
    app_api.get(`points/user/${params.studentid}`).then((res) => {
      setTotalPoints(res.data);
    });
    app_api
      .get(`course-content/user/${params.studentid}`)
      .then((res) => {
        setUserContent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setUserContent([]);
      });
    app_api.get(`users/${params.studentid}`).then((res) => {
      setStudentInfo(res.data);
      console.log(res.data);
    });
  }, []);

  const onFilterContentTypeChange = (value) => {
    if (value) setContentTypeFilter(value.value);
    else setContentTypeFilter(null);
  };

  const onFilterCategoryChange = (value) => {
    if (value) {
      setCategoryFilter(value.value);
      let courses = allCourses.filter(
        (c) => c.courseCategoryId === value.value
      );
      setCourseOptions(courses);
    } else {
      setCategoryFilter(null);
      setCourseOptions(allCourses);
    }
  };

  const onFilterCourseChange = (value) => {
    if (value) setCourseFilter(value.value);
    else setCourseFilter(null);
  };

  const reportClick = (object) => {
    setSelected(object);
  };

  const reportClose = () => setSelected({});

  return (
    <>
      <div>
        <div>
          <div className="hidden xs:hidden lg:block md:block">
            {' '}
            <NavBar />
          </div>
          <main className="xs:ml-[0em] md:ml-[17em] lg:mr-[19em] 2xl:mr-[23em]">
            <div className="p-4">
              <h1 className="font-bold text-2xl mb-2">Student Dashboard</h1>
              <span className="text-gray-400 text-lg font-medium">
                {moment().format('MMMM DD, dddd')}
              </span>
            </div>
            <div className="w-full flex flex-col lg:flex-row">
              <div className="w-12/12 md:w-12/12 lg:w-7/12 xl:7/12 2xl:7/12">
                <StudentCharts />
              </div>
              <div className="w-12/12 ml-5 lg:w-5/12 xl:5/12">
                <h3 className="text-black mb-3 font-bold">
                  Overall Information
                </h3>
                <div className="flex flex-wrap justify-between w-11/12">
                  <div className="mb-5 w-6/12">
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">
                      Stream
                    </h3>
                    <h2 className="inline-flex text-xl font-bold">
                      {studentinfo?.stream?.name}
                    </h2>
                  </div>
                  <div className="mb-5 w-6/12">
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">
                      Batch
                    </h3>
                    <h2 className="inline-flex text-2xl font-bold">Batch 1</h2>
                  </div>
                </div>
                <div className="max-w-1/2 w-full flex-col">
                  <div className="flex justify-between mr-5">
                    <p className="font-bold">My Progress</p>
                    {/* <Dropdown initialLable="Batch" /> */}
                  </div>
                </div>
                <div className="flex flex-col items-center bg-card-gray-light py-10 mt-4">
                  <NestedProgressBar />
                  {/* <p className="text-gray-400 text-xs mb-4 mt-3">
                  Total completed:{' '}
                  <span className="text-black font-bold text-xs">82/120</span>
                </p> */}
                  <div className="flex mt-4">
                    <div className="flex items-center ml-6">
                      <div className="h-8 w-[6px] bg-yellow-600 rounded-md mr-1"></div>
                      <div>
                        <p className="text-sm font-bold">
                          {coursedetails?.EXERCISE?.completed +
                            '/' +
                            coursedetails?.EXERCISE?.total}
                        </p>
                        <p className="text-[14px] text-gray-600">Exercises</p>
                      </div>
                    </div>
                    <div className="flex items-center ml-6">
                      <div className="h-8 w-[6px] bg-primary rounded-md mr-1"></div>
                      <div>
                        <p className="text-sm font-bold">
                          {coursedetails?.PROBLEM_SET?.completed +
                            '/' +
                            coursedetails?.PROBLEM_SET?.total}
                        </p>
                        <p className="text-[14px] text-gray-600">Problem Set</p>
                      </div>
                    </div>

                    <div className="flex items-center ml-6">
                      <div className="h-8 w-[6px] bg-red-600 rounded-md mr-1"></div>
                      <div>
                        <p className="text-sm font-bold">1/1</p>
                        <p className="text-[14px] text-gray-600">Projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-end space-x-2 mt-5">
              <Select
                className="w-3/12"
                placeholder="Filter by type"
                onChange={onFilterContentTypeChange}
                isClearable
                isSearchable
                options={[
                  { value: 'EXERCISE', label: 'Exercises' },
                  { value: 'PROBLEM_SET', label: 'Problem sets / Projects' },
                  { value: 'READING_MATERIAL', label: 'Reading materials' },
                ]}
              />
              <Select
                className="w-3/12"
                placeholder="Filter by categories"
                onChange={onFilterCategoryChange}
                isClearable
                isSearchable
                options={categoryoptions.map((x) => ({
                  ...x,
                  label: x.name,
                  value: x.id,
                }))}
              />
              <Select
                onChange={onFilterCourseChange}
                className="w-3/12"
                placeholder="Filter by courses"
                isClearable
                isSearchable
                options={courseoptions.map((y) => ({
                  ...y,
                  label: y.name,
                  value: y.id,
                }))}
              />
            </div>
            <div className="px-4 sm:px-6 lg:px-8 pb-10">
              <div className="mt-8 flex flex-col">
                <Table
                  data={userContent
                    .filter((u) => {
                      if (categoryFilter)
                        return (
                          u?.courseContent?.course?.courseCategory?.id ===
                          categoryFilter
                        );
                      else return true;
                    })
                    .filter((u) => {
                      if (courseFilter)
                        return u?.courseContent?.course?.id === courseFilter;
                      else return true;
                    })
                    .filter((u) => {
                      if (contentTypeFilter)
                        return u?.courseContent?.type === contentTypeFilter;
                      else return true;
                    })}
                  columns={student_dashboard({ onClickReport: reportClick })}
                />
                {/* <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-1">
                    <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full table-fixed divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="max-w-[33.33%] py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="max-w-[33.33%] py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                            >
                              Course
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Scored
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {userContent
                            .filter((u) => {
                              if (categoryFilter)
                                return (
                                  u?.courseContent?.course?.courseCategory
                                    ?.id === categoryFilter
                                );
                              else return true;
                            })
                            .filter((u) => {
                              if (courseFilter)
                                return (
                                  u?.courseContent?.course?.id === courseFilter
                                );
                              else return true;
                            })
                            .filter((u) => {
                              if (contentTypeFilter)
                                return (
                                  u?.courseContent?.type === contentTypeFilter
                                );
                              else return true;
                            })
                            .map((u, idx) => (
                              <tr key={idx}>
                                <td className=" px-3 py-4 text-sm text-gray-500">
                                  {u?.courseContent?.title}
                                </td>
                                <td className=" px-3 py-4 text-sm text-gray-500">
                                  {u?.courseContent?.course?.name}
                                </td>
                                <td className=" px-3 py-4 text-sm text-gray-500">
                                  {u?.pointsEarned}/{u?.courseContent?.points}
                                </td>
                                <td className=" px-3 py-4 text-sm text-gray-500">
                                  {[
                                    'EXERCISE',
                                    'PROBLEM_SET',
                                    'PROJECT',
                                  ].includes(u?.courseContent?.type) && (
                                    <button
                                      onClick={() => reportClick(u)}
                                      className="bg-gray-100 text-black w-full p-1 text-sm rounded-lg hover:bg-gray-200"
                                    >
                                      Report
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </main>
          <SidebarRight className="right-0 left-auto xl:block" />
        </div>
      </div>
      <Transition.Root show={Object.keys(selected).length > 0} as={Fragment}>
        <Dialog as="div" className="relative z-[99]" onClose={reportClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  {selected?.courseContent?.type === 'EXERCISE' ? (
                    <div>
                      <label>
                        Code{' '}
                        <span
                          className={classNames(
                            'p-0.5 px-1.5 rounded-full text-xs',
                            selected?.status === 'PENDING'
                              ? 'text-red-700 bg-red-200'
                              : 'text-green-700 bg-green-200'
                          )}
                        >
                          {selected?.status}
                        </span>
                      </label>
                      <textarea
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none disabled:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm min-h-[400px]"
                        disabled
                        value={selected?.code}
                      />
                    </div>
                  ) : (
                    <div>
                      <label>Comment</label>
                      <textarea
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none disabled:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm min-h-[100px]"
                        disabled
                        value={selected?.comments}
                      />
                      <table className="w-full text-sm text-left mt-5">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className=" px-10 py-3">
                              Rubric
                            </th>
                            <th scope="col" className="px-10 py-3">
                              Score
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selected?.rubrics?.map((r, idx) => (
                            <tr key={idx} className="bg-white border-b">
                              <td className="px-10 py-4 text-black">
                                {r?.rubric}
                              </td>
                              <td className="px-10 py-4">
                                {r?.score}/{r?.outOf}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={reportClose}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function NestedProgressBar() {
  // var Exercise = coursedetails?.EXERCISE?.completed / coursedetails?.EXERCISE?.total * 100
  // console.log(Exercise)
  const [coursedetails, setCourseDetails] = useState([]);
  const params = useParams();
  useEffect(() => {
    app_api
      .get(`course-content/user-completed/${params.studentid}/stream`)
      .then((res) => {
        setCourseDetails(res.data);
        console.log(res.data);
      });
  }, [params.studentid]);

  function isWhatPercentOf(x, y) {
    return (x / y) * 100;
  }

  return (
    <div className="mainIndicator w-12/12">
      <ProgressBar
        className="first-circle"
        radius={100}
        progress={isWhatPercentOf(
          coursedetails?.EXERCISE?.completed,
          coursedetails?.EXERCISE?.total
        )}
        strokeColor="#ffbc38"
        pointerRadius={3}
        pointerStrokeWidth={0}
        strokeWidth={8}
        trackStrokeWidth={8}
        pointerStrokeColor="#7bcd5c"
        initialAnimationDelay={1000}
        initialAnimation={true}
        trackTransition=".1s ease"
        transition="1s ease"
      >
        <div className="indicator">
          <ProgressBar
            radius={70}
            className="second-circle"
            progress={isWhatPercentOf(
              coursedetails?.PROBLEM_SET?.completed,
              coursedetails?.PROBLEM_SET?.total
            )}
            strokeWidth={8}
            trackStrokeWidth={8}
            strokeColor="#09678C"
            pointerRadius={3}
            pointerStrokeWidth={0}
            pointerStrokeColor="#7bcd5c"
            initialAnimationDelay={1000}
            initialAnimation={true}
            trackTransition=".1s ease"
            transition="1s ease"
          >
            <div className="indicator-2">
              <ProgressBar
                radius={40}
                className="third-circle"
                progress={isWhatPercentOf(
                  coursedetails?.PROJECT?.completed,
                  coursedetails?.PROJECT?.total
                )}
                strokeColor="#d84639"
                strokeWidth={8}
                trackStrokeWidth={8}
                pointerRadius={3}
                pointerStrokeWidth={0}
                pointerStrokeColor="#7bcd5c"
                initialAnimationDelay={1000}
                initialAnimation={true}
                trackTransition=".1s ease"
                transition="1s ease"
              />
            </div>
          </ProgressBar>
        </div>
      </ProgressBar>
    </div>
  );
}

function SidebarRight({ className }) {
  const [batch, setBatch] = useState([]);
  const [user, setUser] = useState({});
  const [studentname, setStudentName] = useState([]);
  const params = useParams();
  const [coursedetails, setCourseDetails] = useState([]);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('cogoportAdminKey')).data);
    } catch {}
    app_api.get(`users/${params.studentid}`).then((res) => {
      setStudentName(res.data);
    });
    app_api
      .get(`course-content/user-completed/${params.studentid}/stream`)
      .then((res) => {
        setCourseDetails(res.data);
      })
      .catch((err) => {
        setCourseDetails({
          EXERCISE: { total: 0, completed: 0 },
          PROBLEM_SET: { total: 0, completed: 0 },
          PROJECT: { total: 0, completed: 0 },
        });
      });
    app_api
      .get('batch/1')
      .then((res) => {
        setBatch(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {});
  }, [params.studentid]);

  // console.log(coursedetails);
  return (
    <aside
      className={classNames(
        'top-0 z-20 h-full w-full max-w-full border border-slate-100 bg-sidebar-body left-0 border-r xs:w-full xl:fixed xl:w-72 xl:pt-6 2xl:w-[350px]',
        className
      )}
    >
      <div className=" pb-5 ">
        <div className="mx-5 flex h-full flex-col justify-center rounded-lg  bg-transparent sm:mx-6 xl:my-0 xl:mx-0">
          <h2 className="text-black text-lg font-semibold pl-2">Profile</h2>
          <img src={avatar4} className="w-40 rounded-full mx-auto mt-6" />
          <p className="font-semibold text-xl text-center mt-3">
            {studentname?.fullName}
          </p>
          <p className=" text-md text-center">Student </p>
          <div class="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left bg-card-gray p-2 m-2 rounded-lg">
            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Exercises</p>
              <p class="font-bold text-zinc-700">
                {coursedetails?.EXERCISE?.completed}
              </p>
            </div>

            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Problem Sets</p>
              <p class="font-bold text-zinc-700">
                {coursedetails?.PROBLEM_SET?.completed}
              </p>
            </div>

            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Projects</p>
              <p class="font-bold text-zinc-700">1</p>
            </div>
          </div>

          <div className="h-screen overflow-y-scroll">
            <p className="font-semibold ml-4 mt-2">Schedule</p>
            <div className="h-full mb-2">
              <div class="mt-2 text-center lg:text-left bg-white p-2 ml-3 m-auto rounded-lg flex justify-start items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="ml-5">
                  <p className="font-bold text-sm">Final Project</p>
                  <p className="text-xs text-gray-400">
                    Feb 8, 2023 9am to 8pm
                  </p>
                </div>
                {/* <FolderOpenIcon className="h-6 w-6" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
