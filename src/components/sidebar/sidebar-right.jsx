import { CheckCircleIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import classNames from '../../utils/classname';
import Avatar from '../avatar';

export default function Sidebar({ className }) {
  return (
    <aside
      className={classNames(
        'top-0 z-20 h-full w-full max-w-full border border-slate-100 bg-sidebar-body  left-0 border-r xs:w-full xl:fixed xl:w-72 xl:pt-6 2xl:w-[350px]',
        className
      )}
    >
      <div className=" pb-5 ">
        <div className="mx-5 flex h-full flex-col justify-center rounded-lg  bg-transparent sm:mx-6 xl:my-0 xl:mx-0">
          <div className="ml-4">
            <span className="font-semibold">Profile</span>
          </div>
          <Avatar
            image={
              'https://img.freepik.com/free-vector/illustration-web-design_53876-5835.jpg?w=740&t=st=1674844562~exp=1674845162~hmac=b58988180586fec271791eb3e945363ec9b438b4a8166615ffb772b889d03568'
            }
            alt="B1"
            className="mx-auto mb-3"
            size="lg"
          />

          <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500  3xl:mb-3">
            Batch 1
          </h3>
          <div class="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left bg-card-gray p-2 m-2 rounded-lg">
            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Exercise</p>
              <p class="font-bold text-zinc-700">45</p>
            </div>

            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Problem</p>
              <p class="font-bold text-zinc-700">30</p>
            </div>

            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Project</p>
              <p class="font-bold text-zinc-700">07</p>
            </div>
          </div>
          <div className="h-screen overflow-y-scroll">
            <p className="font-semibold ml-4 mt-2">Schedule</p>
            <div className="h-full mb-2">
              <div class="mt-2 text-center lg:text-left bg-white p-2 ml-3 m-auto rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">HTML and CSS</p>
                  <p className="text-xs text-gray-400">
                    Jan 30,2023 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <div class="mt-2 text-center lg:text-left bg-white p-2 ml-3 m-auto rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">Javascript Basic</p>
                  <p className="text-xs text-gray-400">
                    Feb 01,2023 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <div class="mt-2 text-center lg:text-left bg-white p-2 ml-3 m-auto rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">HTML, CSS and JS</p>
                  <p className="text-xs text-gray-400">
                    Feb 02,2023 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <div class="mt-2 text-center lg:text-left bg-white p-2 ml-3 m-auto rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">Javascript Advance</p>
                  <p className="text-xs text-gray-400">
                    Feb 05,2023 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <div class="mt-2 text-center lg:text-left bg-white p-2 ml-3 m-auto rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">Basic Algorithm</p>
                  <p className="text-xs text-gray-400">
                    Feb 07,2023 from 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
