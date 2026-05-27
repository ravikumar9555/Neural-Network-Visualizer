import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,

} from "recharts";

export default function LossChart({

  lossData,

}) {

  return (

    <div className="
      w-full
      h-[250px]
    ">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <LineChart
          data={lossData}
        >

          {/* GRID */}

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
          />

          {/* X AXIS */}

          <XAxis

            dataKey="epoch"

            tick={{
              fill: "#6B7280",
            }}

            axisLine={{
              stroke: "#D1D5DB",
            }}
          />

          {/* Y AXIS */}

          <YAxis

            tick={{
              fill: "#6B7280",
            }}

            axisLine={{
              stroke: "#D1D5DB",
            }}
          />

          {/* TOOLTIP */}

          <Tooltip />

          {/* LOSS LINE */}

          <Line

            type="monotone"

            dataKey="loss"

            stroke="#2563EB"

            strokeWidth={3}

            dot={false}

            isAnimationActive={true}

            animationDuration={300}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}