import {
  memo,
  useMemo,
} from "react";

import {

  LineChart,
  Line,

  XAxis,
  YAxis,

  Tooltip,

  ResponsiveContainer,

  CartesianGrid,

  Area,

  AreaChart,

} from "recharts";

function LossChart({

  lossData,

}) {

  // MEMOIZED DATA
  // PERFORMANCE BOOST

  const optimizedData =
    useMemo(() => {

      // REDUCE POINTS
      // FOR HUGE EPOCHS

      if (
        lossData.length < 300
      ) {
        return lossData;
      }

      return lossData.filter(
        (_, index) =>
          index % 2 === 0
      );

    }, [lossData]);

  // AUTO SCALE

  const maxLoss =
    Math.max(
      ...optimizedData.map(
        (d) => d.loss
      ),
      1
    );

  return (

    <div className="
      w-full
      h-[260px]
    ">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <AreaChart
          data={optimizedData}
        >

          {/* GRADIENT */}

          <defs>

            <linearGradient
              id="lossGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#2563EB"
                stopOpacity={0.4}
              />

              <stop
                offset="100%"
                stopColor="#2563EB"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          {/* GRID */}

          <CartesianGrid

            strokeDasharray="3 3"

            stroke="#E5E7EB"

            opacity={0.5}
          />

          {/* X */}

          <XAxis

            dataKey="epoch"

            tick={{
              fill: "#6B7280",
              fontSize: 11,
            }}

            axisLine={{
              stroke: "#D1D5DB",
            }}

            tickLine={false}
          />

          {/* Y */}

          <YAxis

            domain={[
              0,
              maxLoss,
            ]}

            tick={{
              fill: "#6B7280",
              fontSize: 11,
            }}

            axisLine={{
              stroke: "#D1D5DB",
            }}

            tickLine={false}
          />

          {/* TOOLTIP */}

          <Tooltip

            contentStyle={{

              borderRadius: "12px",

              border:
                "1px solid #E5E7EB",

              background:
                "rgba(255,255,255,0.95)",

              backdropFilter:
                "blur(8px)",
            }}
          />

          {/* AREA */}

          <Area

            type="monotone"

            dataKey="loss"

            stroke="none"

            fill="url(#lossGradient)"
          />

          {/* LINE */}

          <Line

            type="monotone"

            dataKey="loss"

            stroke="#2563EB"

            strokeWidth={3}

            dot={false}

            activeDot={{
              r: 5,
            }}

            isAnimationActive={
              false
            }
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default memo(LossChart);