import DatasetCanvas from "./DatasetCanvas";
import LossChart from "./LossChart";

export default function RightPanel({

  data,

  predictions,

  model,

  lossData,

  accuracy,

  problemType,

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
          Output
        </h2>

        <DatasetCanvas

          data={data}

          predictions={
            predictions
          }

          model={model}

          problemType={
            problemType
          }
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
          Loss Graph
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
          space-y-4
        ">

          {/* EPOCHS */}

          <div className="
            flex
            justify-between
            items-center
          ">

            <span className="
              text-gray-500
            ">
              Epochs
            </span>

            <span className="
              text-xl
              font-semibold
            ">
              {lossData.length}
            </span>

          </div>

          {/* LOSS */}

          <div className="
            flex
            justify-between
            items-center
          ">

            <span className="
              text-gray-500
            ">
              Final Loss
            </span>

            <span className="
              text-xl
              font-semibold
            ">
              {finalLoss.toFixed(4)}
            </span>

          </div>

          {/* ACCURACY */}

          {problemType ===
            "classification" && (

            <div className="
              flex
              justify-between
              items-center
            ">

              <span className="
                text-gray-500
              ">
                Accuracy
              </span>

              <span className="
                text-xl
                font-semibold
                text-blue-600
              ">
                {accuracy.toFixed(1)}
                %
              </span>

            </div>
          )}

          {/* PROBLEM */}

          <div className="
            flex
            justify-between
            items-center
          ">

            <span className="
              text-gray-500
            ">
              Problem Type
            </span>

            <span className="
              text-lg
              font-semibold
            ">

              {problemType ===
              "classification"

                ? "Classification"

                : "Regression"}

            </span>

          </div>

          {/* MODEL */}

          <div className="
            flex
            justify-between
            items-center
          ">

            <span className="
              text-gray-500
            ">
              Model
            </span>

            <span className="
              text-lg
              font-semibold
            ">
              Neural Network
            </span>

          </div>

          {/* STATUS */}

          <div className="
            flex
            justify-between
            items-center
          ">

            <span className="
              text-gray-500
            ">
              Status
            </span>

            <span className="
              text-green-500
              font-semibold
            ">
              Training
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}