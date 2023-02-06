import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarRight from '../components/sidebar/sidebar-right';
import StudentCharts from '../components/student-chart';
import NestedProgressBar from '../components/progressbar/nested_progress_bar';
import {
  ArrowSmallRightIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Dropdown from '../components/dropdown';
import moment from 'moment';
import NavBar from '../components/navigation';
import app_api from '../config/config';

export default function StudentDashboard() {
  const [studentinfo, setStudentInfo] = useState([]);
  const [studentname, setStudentName] = useState([]);
  const params = useParams();
  useEffect(() => {
    app_api
      .get(`leaderboard/progression/user/${params.studentid}`)
      .then((res) => {
        setStudentInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => {});
    app_api.get('users/me').then((res) => {
      setStudentName(res.data);
      console.log(res.data);
    });
  }, []);
  // console.log(studentname[params.studentid].fullName);
  return (
    <div>
      <div className=" py-4">
        <NavBar />
        <main className="ml-[16em] mr-[23em]">
          <div className="p-4">
            <h1 className="font-bold text-2xl mb-2">
              {studentname[params.studentid]}
            </h1>
            <span className="text-gray-400 text-lg font-medium">
              {moment().format('MMMM DD, dddd')}
            </span>
          </div>
          <StudentCharts />
          <div className="m-4 flex">
            {/* Left */}
            <div className="max-w-1/2 w-full flex-col">
              <div className="flex justify-between mr-5">
                <p className="font-bold">My Progress</p>
                <Dropdown initialLable="Batch" />
              </div>
              <div className="flex flex-col items-center bg-card-gray-light py-10 mt-4">
                <NestedProgressBar />
                <p className="text-gray-400 text-xs mb-4 mt-3">
                  Total completed:{' '}
                  <span className="text-black font-bold text-xs">82/120</span>
                </p>
                <div className="flex">
                  <div className="flex items-center ml-6">
                    <div className="h-8 w-[6px] bg-yellow-600 rounded-md mr-1"></div>
                    <div>
                      <p className="text-xs font-bold">45/50</p>
                      <p className="text-[10px] text-gray-600">Exercises</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-6">
                    <div className="h-8 w-[6px] bg-primary rounded-md mr-1"></div>
                    <div>
                      <p className="text-xs font-bold">30/60</p>
                      <p className="text-[10px] text-gray-600">Problem Set</p>
                    </div>
                  </div>

                  <div className="flex items-center ml-6">
                    <div className="h-8 w-[6px] bg-red-600 rounded-md mr-1"></div>
                    <div>
                      <p className="text-xs font-bold">07/10</p>
                      <p className="text-[10px] text-gray-600">Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
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
