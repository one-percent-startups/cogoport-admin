import React, { useState, useEffect } from 'react';
import NavBar from '../components/navigation';
import Leaderboard from '../components/leaderboard';

import Table from '../components/tables/table';

import moment from 'moment';
import app_api from '../config/config';
import SidebarRight from '../components/sidebar/sidebar-right';
import { student_list_score } from '../components/tables/tableheader';
import ReactSelect from 'react-select';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const Dashboard = () => {
  const [user, setUser] = useState({});

  const [score, setTotalScore] = useState([]);
  const [totalpoints, setTotalPoints] = useState(true);
  const [d2dError, setd2dError] = useState(null);

  const [studentdata, setStudentData] = useState([]);

  const [stream, setStream] = useState([]);
  const [streamLoading, setStreamLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);

  const [filterStream, setFilterStream] = useState(null);

  const getCourseContentForBatch = (batchId) => {
    app_api
      .get(`course-content/batch/${batchId}`)
      .then((res) => {
        setStudentData(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getCourseContentForBatch(tabs[0].batchId);
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

  const getBatchDetails = (batchId) => {
    app_api
      .get(`batch/${batchId}`)
      .then((res) => {
        setBatch(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {});
  };

  const getPointsForBatch = (batchId) => {
    app_api
      .get(`points/all/batch/${batchId}`)
      .then((res) => {
        setTotalPoints(res.data);
      })
      .catch((err) => {});
  };

  const getLeaderBoardByBatch = (batchId) => {
    app_api
      .get(`leaderboard/all/batch/${batchId}`)
      .then((res) => {
        setTotalScore(res.data);
      })
      .catch((err) => {});
  };

  const getLeaderboardDayToDay = () => {
    app_api
      .get(`leaderboard/d2d`)
      .then((res) => {
        setTotalScore(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('cogoportAdminKey')).data);
    } catch {}
    getBatchDetails(tabs[0].batchId);
    getLeaderBoardByBatch(tabs[0].batchId);
    getPointsForBatch(tabs[0].batchId);
  }, []);

  const onStreamFilterChange = (value) => {
    if (value) setFilterStream(value.value);
    else setFilterStream(null);
  };

  const tabs = [
    { name: 'Academy Batch 1', batchId: '1' },
    { name: 'Academy Batch 2', batchId: '3' },
  ];

  const [tabIdx, setTabIdx] = useState(0);

  const onTabChange = (newIdx) => {
    setTabIdx(newIdx);
    getPointsForBatch(tabs[newIdx].batchId);
    getBatchDetails(tabs[newIdx].batchId);
    getCourseContentForBatch(tabs[newIdx].batchId);
    getLeaderBoardByBatch(tabs[newIdx].batchId);
  };

  const [selectdate, setSelectDate] = useState('all');

  const onChangeSelectDate = (value) => {
    setSelectDate(value);
    if (value === 'all') {
      getLeaderBoardByBatch(tabs[tabIdx].batchId);
    } else {
      getLeaderboardDayToDay();
    }
  };

  return (
    <div className="flex flex-row">
      <div className="hidden xs:hidden lg:block md:block">
        <NavBar />
      </div>
      <div className="">
        <SidebarRight className="right-0 left-auto xl:block" />
      </div>
      <div className="p-4 h-screen xs:ml-[0em] md:ml-[17em] lg:mr-[19em] 2xl:mr-[23em]">
        <div className="flex flex-wrap justify-between mb-5">
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
                    defaultValue={tabs[tabIdx].name}
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
                    {tabs.map((tab, idx) => (
                      <button
                        key={tab.name}
                        style={{ backgroundColor: 'black' }}
                        className={classNames(
                          tabIdx === idx
                            ? 'text-white bg-balck'
                            : 'text-gray-500 hover:text-gray-900 bg-balck',
                          idx === 0 ? 'rounded-l-lg bg-balck' : '',
                          idx === tabs.length - 1
                            ? 'rounded-r-lg bg-balck'
                            : '',
                          'group relative flex-1 overflow-hidden border-black bg-balck py-3 px-5 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 focus:bg-black focus:text-white'
                        )}
                        aria-current={tabIdx === idx ? 'page' : undefined}
                        onClick={() => onTabChange(idx)}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tabIdx === idx ? 'bg-indigo-500' : 'bg-transparent',
                            'absolute inset-x-0 '
                          )}
                        />
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <Leaderboard
            className="w-8/12"
            selectDate={selectdate}
            onChangeSelectDate={onChangeSelectDate}
            leaderboardd2d={score || []}
          />
          <div className="w-3/12 mt-[30px] 2xl:mt-[10px] mx-auto xl:mx-[0]">
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
        <ReactSelect
          className="w-4/12 float-right"
          placeholder="Filter by track"
          isClearable
          isSearchable
          options={stream.map((s) => ({ ...s, label: s.name, value: s.id }))}
          loadingMessage="Getting tracks..."
          isLoading={streamLoading}
          onChange={onStreamFilterChange}
        />
        <Table
          data={studentdata.filter((l) => {
            if (filterStream) return l.streamId == filterStream;
            else return true;
          })}
          columns={student_list_score}
        />
      </div>
    </div>
  );
};
export default Dashboard;
