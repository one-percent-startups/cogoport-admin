import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ArrowSmallRightIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import avatar4 from '../assets/images/avatar4.jpeg';
import classNames from '../utils/classname';
import Dropdown from '../components/dropdown';
import moment from 'moment';
import NavBar from '../components/navigation';
import app_api from '../config/config';
import '../components/progressbar/nested_progress_bar.css';
import ProgressBar from 'react-customizable-progressbar';
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
        console.log(params.studentid);
        console.log(res.data);
      })
      .catch((err) => {});

    app_api
      .get(`points/history/user/${params.studentid}`)
      .then((res) => {
        setUserPoints(res.data);
        console.log(res.data);
      })
      .catch((err) => {});
  }, []);

  const handleOnChange = (value) => {
    setStatus(value);
    switch (value) {
      case 'Rank':
        setChartData(monthlyComparison);
        break;
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
          name="points earned"
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
          dataKey="createdAtDate"
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
          dataKey="createdAtDate"
          name="Date"
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
  const [studentinfo, setStudentInfo] = useState([]);
  // const [studentname, setStudentName] = useState([]);
  const [coursedetails, setCourseDetails] = useState([]);
  const [totalpoints, setTotalPoints] = useState();
  const [score, setTotalScore] = useState(true);
  const params = useParams();
  useEffect(() => {
    app_api
      .get(`course-content/user-completed/${params.studentid}`)
      .then((res) => {
        setCourseDetails(res.data);
        console.log(res.data);
      });
  }, []);
  useEffect(() => {
    // app_api.get(`users/${params.studentid}`).then((res) => {
    //   setStudentName(res.data);
    //   console.log(res.data);
    // });
    app_api
      .get('leaderboard/all')
      .then((res) => {
        setTotalScore(res.data);
        console.log(res.data, 'text');
      })

      .catch((err) => {});
    app_api.get('points/all/batch/1').then((res) => {
      setTotalPoints(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <div className=" py-4">
        <NavBar />
        <main className="ml-[16em] mr-[23em]">
          <div className="p-4">
            <h1 className="font-bold text-2xl mb-2">Student Dashboard</h1>
            <span className="text-gray-400 text-lg font-medium">
              {moment().format('MMMM DD, dddd')}
            </span>
          </div>
          <div className="w-full flex flex-row ">
            <div className="w-9/12">
              <StudentCharts />
            </div>
            <div className="3/12 ml-5">
              <h3 className="text-gray-400 mb-3">Overall Information</h3>
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Total Score
                </h3>
                <h2 className="inline-flex text-3xl font-bold">
                  {totalpoints?._sum?.pointsEarned}
                </h2>
              </div>

              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Total Student
                </h3>
                <h2 className="inline-flex text-3xl font-bold">
                  {score.length}
                </h2>
              </div>
            </div>
          </div>
          <div className="m-4 flex">
            <div className="max-w-1/2 w-full flex-col">
              <div className="flex justify-between mr-5">
                <p className="font-bold">My Progress</p>
                <Dropdown initialLable="Batch" />
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
                      <p className="text-xs font-bold">
                        {coursedetails?.EXERCISE?.completed +
                          '/' +
                          coursedetails?.EXERCISE?.total}
                      </p>
                      <p className="text-[10px] text-gray-600">Exercises</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-6">
                    <div className="h-8 w-[6px] bg-primary rounded-md mr-1"></div>
                    <div>
                      <p className="text-xs font-bold">
                        {coursedetails?.PROBLEM_SET?.completed +
                          '/' +
                          coursedetails?.PROBLEM_SET?.total}
                      </p>
                      <p className="text-[10px] text-gray-600">Problem Set</p>
                    </div>
                  </div>

                  <div className="flex items-center ml-6">
                    <div className="h-8 w-[6px] bg-red-600 rounded-md mr-1"></div>
                    <div>
                      <p className="text-xs font-bold">
                        {coursedetails?.PROJECT?.completed +
                          '/' +
                          coursedetails?.PROJECT?.total}
                      </p>
                      <p className="text-[10px] text-gray-600">Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-1/2 w-full">
              <div className="">
                <div className="flex justify-between mr-5">
                  <p className="ml-4 font-semibold">Schedule</p>
                  <Dropdown initialLable="Role" />
                </div>
                <div class="mt-4 text-center lg:text-left bg-card-gray-light p-2 m-auto rounded-lg flex justify-center max-w-max items-center shadow-sm pr-4 pl-4 hover:shadow-lg">
                  <CheckBadgeIcon className="h-6 w-6" fill="#198754" />
                  <div className="mx-6">
                    <p className="font-bold text-sm">HTML Forms</p>
                    <p className="text-[11px] text-green-600 mt-[2px]">
                      10 Exercises Completed /10
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Last Visited 23, Jan 2023
                    </p>
                  </div>
                  <ArrowSmallRightIcon className="h-6 w-6" />
                </div>
                <div class="mt-4 text-center lg:text-left bg-card-gray-light p-2 m-auto rounded-lg flex justify-center max-w-max items-center shadow-sm pr-4 pl-4 hover:shadow-lg">
                  <CheckBadgeIcon className="h-6 w-6" fill="#198754" />
                  <div className="mx-6">
                    <p className="font-bold text-sm">HTML Input</p>
                    <p className="text-[11px] text-green-600  mt-[2px]">
                      09 Exercises Completed /10
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Last Visited 23, Jan 2023
                    </p>
                  </div>
                  <ArrowSmallRightIcon className="h-6 w-6" />
                </div>
                <div class="mt-4 text-center lg:text-left bg-card-gray-light p-2 m-auto rounded-lg flex justify-center max-w-max items-center shadow-sm pr-4 pl-4 hover:shadow-lg">
                  <ExclamationCircleIcon className="h-6 w-6" fill="red" />
                  <div className="mx-6">
                    <p className="font-bold text-sm">HTML Tags</p>
                    <p className="text-[11px] text-red-600  mt-[2px]">
                      02 Exercises Completed /10
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Last Visited 25, Jan 2023
                    </p>
                  </div>
                  <ArrowSmallRightIcon className="h-6 w-6" />
                </div>
                <div class="mt-4 text-center lg:text-left bg-card-gray-light p-2 m-auto rounded-lg flex justify-center max-w-max items-center shadow-sm pr-4 pl-4 hover:shadow-lg">
                  <CheckBadgeIcon className="h-6 w-6" fill="#198754" />
                  <div className="mx-6">
                    <p className="font-bold text-sm">HTML Dynamic Code</p>
                    <p className="text-[11px] text-green-600 mt-[2px]">
                      06 Exercises Completed /10
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Last Visited 26, Jan 2023
                    </p>
                  </div>
                  <ArrowSmallRightIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <SidebarRight className="right-0 left-auto xl:block" />
      </div>
    </div>
  );
}

function NestedProgressBar() {
  // var Exercise = coursedetails?.EXERCISE?.completed / coursedetails?.EXERCISE?.total * 100
  // console.log(Exercise)
  const [coursedetails, setCourseDetails] = useState([]);
  const params = useParams();
  useEffect(() => {
    app_api
      .get(`course-content/user-completed/${params.studentid}`)
      .then((res) => {
        setCourseDetails(res.data);
        console.log(res.data);
      });
    app_api. 
    get((res) => {

    });
  }, []);
  function isWhatPercentOf(x, y) {
    return (x / y) * 100;
  }

  return (
    <div className="mainIndicator">
      <ProgressBar
        className="first-circle"
        radius={64}
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
            radius={44}
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
                radius={25}
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

function SidebarRight({ className,coursedetails}) {
  const [batch, setBatch] = useState([]);
  const [user, setUser] = useState({});
  const [studentname, setStudentName] = useState([]);
  const params = useParams();

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('cogoportAdminKey')).data);
    } catch {}
    app_api.get(`users/${params.studentid}`).then((res) => {
      setStudentName(res.data);
      console.log(res.data);
    });
    app_api
      .get('batch/1')
      .then((res) => {
        setBatch(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {});
  }, []);

  console.log(coursedetails);
  return (
    <aside
      className={classNames(
        'top-0 z-20 h-full w-full max-w-full border border-slate-100 bg-sidebar-body  left-0 border-r xs:w-full xl:fixed xl:w-72 xl:pt-6 2xl:w-[350px]',
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
          <p className=" text-md text-center">Admin </p>
          <div class="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left bg-card-gray p-2 m-2 rounded-lg">
            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Exercise</p>
              <p class="font-bold text-zinc-700">{coursedetails?.EXERCISE?.completedExercise}</p>
            </div>

            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Problem</p>
              <p class="font-bold text-zinc-700">
                {batch?.completedProblemSets}
              </p>
            </div>

            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Project</p>
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
