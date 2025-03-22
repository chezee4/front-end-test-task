import { JSX } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
];

interface ChartProps<T> {
  title: string;
  type: 'bar' | 'pie' | 'line';
  data: T[];
  dataKey: keyof T;
  nameKey?: keyof T;
}

const Chart = <T,>({ title, type, data, dataKey, nameKey }: ChartProps<T>) => {
  const chartRenderers: Record<string, () => JSX.Element> = {
    bar: () => (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey as string} fill="#0088FE" />
      </BarChart>
    ),
    pie: () => (
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey as string}
          nameKey={nameKey as string}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    ),
    line: () => (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey as string} stroke="#8884d8" />
      </LineChart>
    ),
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="h-[300px]">
        <ResponsiveContainer>
          {chartRenderers[type] ? (
            chartRenderers[type]()
          ) : (
            <div>Invalid chart type</div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
