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
  const [chartData, setChartData] = useState(yearlyComparison);

  const handleOnChange = (value) => {
    setStatus(value);
    switch (value) {
      case 'Rank':
        setChartData(weeklyComparison);
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
      { x: 1, y: 23, z: 122 },
      { x: 2, y: 3, z: 73 },
      { x: 3, y: 15, z: 32 },
      { x: 4, y: 35, z: 23 },
      { x: 5, y: 45, z: 20 },
      { x: 6, y: 25, z: 29 },
      { x: 7, y: 17, z: 61 },
      { x: 8, y: 32, z: 45 },
      { x: 9, y: 43, z: 93 },
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
          dataKey="y"
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
          dataKey="z"
          stroke="red"
          strokeWidth={4}
          fill="url(#liquidity-gradient)"
          activeDot={{
            stroke: '#fff',
            strokeWidth: 5,
            r: 10,
          }}
        />
        <XAxis
          dataKey="x"
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
        onMouseMove={(data) => {
          if (data.isTooltipActive) {
            setDate(data.activePayload && data.activePayload[0].payload.date);
          }
        }}
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
          content={<></>}
          cursor={{
            strokeWidth: 50,
            stroke: 'rgb(237, 239, 243)',
          }}
          wrapperStyle={{
            boxShadow: '0 0 1px 0px 4px 50px rgba(73, 93, 112, 0.08)',
            background: 'red',
          }}
        />
        <CartesianGrid
          vertical={false}
          strokeDasharray="10 5"
          stroke={'#E5E7EB'}
        />
        <Area
          type="monotone"
          dataKey="btc"
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
