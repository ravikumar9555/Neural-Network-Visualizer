import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function LossChart({
  lossData,
}) {

  return (
    <div className="bg-slate-800 p-4 rounded-2xl">

      <h2 className="text-xl font-bold mb-4">
        Training Loss
      </h2>

      <LineChart
        width={300}
        height={200}
        data={lossData}
      >
        <XAxis dataKey="epoch" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="loss"
        />
      </LineChart>

    </div>
  );
}