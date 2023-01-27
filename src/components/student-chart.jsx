import { useState } from 'react';
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

export default function StudentCharts() {
  const [price, setPrice] = useState(6.2);
  const [date, setDate] = useState(1624147200);
  const [status, setStatus] = useState('Rank');
  const [chartData, setChartData] = useState(monthlyComparison);

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
    const data = [
      { label: 'Day 1', 'Expected Point': 23, 'Obtain Point': 122 },
      { label: 'Day 2', 'Expected Point': 3, 'Obtain Point': 73 },
      { label: 'Day 3', 'Expected Point': 15, 'Obtain Point': 32 },
      { label: 'Day 4', 'Expected Point': 35, 'Obtain Point': 23 },
      { label: 'Day 5', 'Expected Point': 45, 'Obtain Point': 20 },
      { label: 'Day 6', 'Expected Point': 25, 'Obtain Point': 29 },
      { label: 'Day 7', 'Expected Point': 17, 'Obtain Point': 61 },
      { label: 'Day 8', 'Expected Point': 32, 'Obtain Point': 45 },
      { label: 'Day 9', 'Expected Point': 43, 'Obtain Point': 93 },
      { label: 'Day 10', 'Expected Point': 43, 'Obtain Point': 93 },
      { label: 'Day 11', 'Expected Point': 43, 'Obtain Point': 93 },
      { label: 'Day 12', 'Expected Point': 43, 'Obtain Point': 93 },
    ];

    return (
      <LineChart
        width={500}
        height={300}
        data={data}
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
          dataKey="Expected Point"
          stroke="#3A63E0"
          strokeWidth={4}
          fill="url(#liquidity-gradient)"
          activeDot={{
            stroke: '#fff',
            strokeWidth: 5,
            r: 10,
          }}
        />
        <Line
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
        />
        <XAxis
          dataKey="label"
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
        data={chartData}
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
          dataKey="name"
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
          dataKey="rank"
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
