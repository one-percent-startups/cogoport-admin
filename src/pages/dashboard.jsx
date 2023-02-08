import React, { useState, useEffect } from 'react';
import NavBar from '../components/navigation';
import Leaderboard from '../components/leaderboard';

import Table from '../components/table';

import moment from 'moment';
import app_api from '../config/config';
import SidebarRight from '../components/sidebar/sidebar-right';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const Dashboard = () => {
  const [user, setUser] = useState({});

  const [score, setTotalScore] = useState(true);
  const [totalpoints, setTotalPoints] = useState(true);
  const [d2dError, setd2dError] = useState(null);

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

    app_api
      .get('leaderboard/all')
      .then((res) => {
        setTotalScore(res.data);
        console.log(res.data, 'text');
      })
      .catch((err) => {});
      app_api
      .get('points/all/batch/1')
      .then((res) => {
      setTotalPoints(res.data);
      console.log(res.data)
    })
      .catch((err) =>{

     
    });
  }, []);

  const tabs = [
    { name: 'Academy Batch 1', href: '#', current: true },
    // { name: 'Batch 2', href: '#', current: false },
  ];

  return (
    <div className="flex flex-row">
      <div className="">
        <NavBar />
      </div>
      <div className="ml-64">
        
      <SidebarRight className="right-0 left-auto xl:block" />
      </div>
      <div className="p-4   h-screen mr-[22em]">
        <div className="flex flex-wrap  justify-between">
          <div className="flex flex-wrap w-full justify-between items-center">
            <div className="mb-10 w-6/12">
              <h1 className="text-2xl mb-2 mt-5 font-bold ">Welcome back!</h1>
              <p className="text-lg font-semibold text-gray-400">
                {moment().format('MMMM DD, dddd')}
              </p>
            </div>
            <div className="w-3/12 text-right">
              <div>
                <div className="sm:hidden">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="tabs"
                    name="tabs"
                    className="block p-4 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className=" w-fullhidden sm:block ">
                  <nav
                    className=" isolate flex divide-x divide-gray-400 rounded-lg shadow border-2"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        style={{backgroundColor:"black"}}
                        className={classNames(
                          tab.current
                            ? 'text-white bg-balck'
                            : 'text-gray-500 hover:text-gray-900 bg-balck',
                          tabIdx === 0 ? 'rounded-l-lg bg-balck' : '',
                          tabIdx === tabs.length - 1 ? 'rounded-r-lg bg-balck' : '',
                          'group relative flex-1 overflow-hidden border-black bg-balck py-3 px-5 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 focus:bg-black focus:text-white '
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tab.current ? 'bg-indigo-500' : 'bg-transparent',
                            'absolute inset-x-0 '
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <Leaderboard className="w-8/12" />
          
          <div className="3/12">
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
              <h2 className="inline-flex text-3xl font-bold">{score.length}</h2>
            </div>
          </div>
          <div />
        </div>
        <Table />
      </div>
    </div>
  );
};
export default Dashboard;
