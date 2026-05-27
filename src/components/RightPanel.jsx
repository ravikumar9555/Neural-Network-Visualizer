import DatasetCanvas from "./DatasetCanvas";
import LossChart from "./LossChart";

export default function RightPanel({

  data,
  predictions,
  model,
  lossData,

}) {

  // FINAL LOSS

  const finalLoss =

    lossData[
      lossData.length - 1
    ]?.loss || 0;

  return (

    <div className="
      space-y-4
    ">

      {/* OUTPUT */}

      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        p-4
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-4
          text-gray-700
        ">
          Decision Boundary
        </h2>

        <DatasetCanvas

          data={data}

          predictions={
            predictions
          }

          model={model}
        />

      </div>

      {/* LOSS */}

      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        p-4
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-4
          text-gray-700
        ">
          Training Loss
        </h2>

        <LossChart
          lossData={lossData}
        />

      </div>

      {/* STATS */}

      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        p-4
      ">

        <h2 className="
          text-xl
          font-bold
          mb-4
          text-gray-700
        ">
          Training Stats
        </h2>

        <div className="
          space-y-3
        ">

          {/* EPOCHS */}

          <div className="
            flex
            justify-between
          ">

            <span className="
              text-gray-500
            ">
              Epochs
            </span>

            <span className="
              font-bold
            ">
              {lossData.length}
            </span>

          </div>

          {/* FINAL LOSS */}

          <div className="
            flex
            justify-between
          ">

            <span className="
              text-gray-500
            ">
              Final Loss
            </span>

            <span className="
              font-bold
            ">
              {finalLoss.toFixed(4)}
            </span>

          </div>

          {/* STATUS */}

          <div className="
            flex
            justify-between
          ">

            <span className="
              text-gray-500
            ">
              Status
            </span>

            <span className="
              font-bold
              text-green-500
            ">
              Running
            </span>

          </div>

          {/* NETWORK */}

          <div className="
            flex
            justify-between
          ">

            <span className="
              text-gray-500
            ">
              Model
            </span>

            <span className="
              font-bold
            ">
              Neural Net
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}