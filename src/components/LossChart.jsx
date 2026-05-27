import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { epoch: 1, loss: 0.9 },
  { epoch: 2, loss: 0.7 },
  { epoch: 3, loss: 0.5 },
];

export default function LossChart() {
  return (
    <div className="bg-slate-800 p-4 rounded-2xl">

      <h2 className="text-xl font-bold mb-4">
        Loss Graph
      </h2>

      <LineChart width={300} height={200} data={data}>
        <XAxis dataKey="epoch" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="loss" />
      </LineChart>
    </div>
  );
}