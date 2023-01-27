import classNames from '../utils/classname';
import SidebarRight from '../components/sidebar/sidebar-right';
import StudentCharts from '../components/student-chart';
import NestedProgressBar from '../components/progressbar/nested_progress_bar';
import {
  ArrowSmallRightIcon,
  CheckCircleIcon,
  FolderOpenIcon,
} from '@heroicons/react/24/outline';
import Dropdown from '../components/dropdown';
import NavBar from '../components/navigation';

export default function StudentDashboard() {
  return (
    <div>
      <div className="xl:pr-72 2xl:px-8 py-4">
        <NavBar />
        <main className="">
          <div className="px-6">
            <h1 className="font-bold text-lg">Welcome back, Prem!</h1>
            <span className="text-gray-400 text-sm font-medium">
              April 23, Thursday
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
                <p className="text-gray-400 text-xs mb-4 mt-2">
                  Total completed:{' '}
                  <span className="text-black font-bold text-xs">23/50</span>
                </p>
                <div className="flex">
                  <div className="flex items-center ml-6">
                    <div className="h-8 w-[6px] bg-blue-600 rounded-md mr-1"></div>
                    <div>
                      <p className="text-xs font-bold">18/60</p>
                      <p className="text-[10px] text-gray-600">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-6">
                    <div className="h-8 w-[6px] bg-yellow-600 rounded-md mr-1"></div>
                    <div>
                      <p className="text-xs font-bold">18/60</p>
                      <p className="text-[10px] text-gray-600">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-6">
                    <div className="h-8 w-[6px] bg-red-600 rounded-md mr-1"></div>
                    <div>
                      <p className="text-xs font-bold">18/60</p>
                      <p className="text-[10px] text-gray-600">Completed</p>
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

                <div class="mt-6 text-center lg:text-left bg-card-gray-light p-2 m-auto rounded-lg flex justify-center max-w-max items-center">
                  <CheckCircleIcon className="h-6 w-6" />
                  <div className="mx-6">
                    <p className="font-bold text-sm">Software Architecture</p>
                    <p className="text-xs text-gray-400">
                      May 2,2022 from 8am to 10am
                    </p>
                  </div>
                  <ArrowSmallRightIcon className="h-6 w-6" />
                </div>
                <div class="mt-4 text-center lg:text-left bg-card-gray-light p-2 m-auto rounded-lg flex justify-center max-w-max items-center">
                  <CheckCircleIcon className="h-6 w-6" />
                  <div className="mx-6">
                    <p className="font-bold text-sm">Software Architecture</p>
                    <p className="text-xs text-gray-400">
                      May 2,2022 from 8am to 10am
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
