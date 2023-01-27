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
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
            }
            alt="Author"
            className="mx-auto mb-3"
            size="lg"
          />

          <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500  3xl:mb-3">
            Data Coming
          </h3>
          <div class="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left bg-card-gray p-2 m-2 rounded-lg">
            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Posts</p>
              <p class="font-bold text-zinc-700">345</p>
            </div>

            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Followers</p>
              <p class="font-bold text-zinc-700">200k</p>
            </div>

            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Following</p>
              <p class="font-bold text-zinc-700">38</p>
            </div>
          </div>
          <div className="h-screen overflow-y-scroll">
            <p className="ml-4 font-semibold mt-4">Schedule</p>
            <div className="h-full mb-6">
              <div class="mt-6 text-center lg:text-left bg-white p-2 m-2 rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">Software Architecture</p>
                  <p className="text-xs text-gray-400">
                    May 2,2022 from 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <div class="mt-2 text-center lg:text-left bg-white p-2 m-2 rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">Digital Illustration</p>
                  <p className="text-xs text-gray-400">
                    May 2,2022 from 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <div class="mt-2 text-center lg:text-left bg-white p-2 m-2 rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">Digital Illustration</p>
                  <p className="text-xs text-gray-400">
                    May 2,2022 from 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <div class="mt-2 text-center lg:text-left bg-white p-2 m-2 rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">Digital Illustration</p>
                  <p className="text-xs text-gray-400">
                    May 2,2022 from 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <div class="mt-2 text-center lg:text-left bg-white p-2 m-2 rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">Digital Illustration</p>
                  <p className="text-xs text-gray-400">
                    May 2,2022 from 8am to 10am
                  </p>
                </div>
                <FolderOpenIcon className="h-6 w-6" />
              </div>
              <div class="mt-2 text-center lg:text-left bg-white p-2 m-2 rounded-lg flex justify-evenly items-center">
                <CheckCircleIcon className="h-6 w-6" />
                <div className="">
                  <p className="font-bold text-sm">Digital Illustration</p>
                  <p className="text-xs text-gray-400">
                    May 2,2022 from 8am to 10am
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
