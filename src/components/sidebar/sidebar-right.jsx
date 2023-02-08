import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import classNames from '../../utils/classname';
import Avatar from '../avatar';
import avatar4 from '../../assets/images/avatar4.jpeg';
import app_api from '../../config/config';

export default function Sidebar({ className }) {
  const [batch, setBatch] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('cogoportAdminKey')).data);
    } catch {}
    app_api
      .get('batch/1')
      .then((res) => {
        setBatch(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {});
  }, []);
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
            {user?.fullName}
          </p>
          <p className=" text-md text-center">Admin </p>
          <div class="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left bg-card-gray p-2 m-2 rounded-lg">
            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Exercise</p>
              <p class="font-bold text-zinc-700">{batch?.completedExercise}</p>
            </div>

            <div className="text-center">
              <p class="text-xs font-semibold text-gray-500">Problem</p>
              <p class="font-bold text-zinc-700">{batch?.completedProblemSets}</p>
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
