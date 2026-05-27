import { useState } from "react";

import ControlPanel from "./components/ControlPanel";
import NeuralNetwork from "./components/NeuralNetwork";
import DatasetCanvas from "./components/DatasetCanvas";
import LossChart from "./components/LossChart";

import { generateData } from "./utils/generateData";
import { trainModel } from "./utils/trainModel";

export default function App() {

  const [lossData, setLossData] = useState([]);

  const [predictions, setPredictions] = useState([]);

  const [data] = useState(generateData());

  const handleTrain = async () => {

    await trainModel(
      data,
      setLossData,
      setPredictions
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-4xl font-bold mb-6 text-center">
        Neural Network Visualizer
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="col-span-1">

          <ControlPanel
            onTrain={handleTrain}
          />

        </div>

        <div className="col-span-2">

          <NeuralNetwork />

        </div>

        <div className="col-span-1">

          <DatasetCanvas
            data={data}
            predictions={predictions}
          />

          <LossChart
            lossData={lossData}
          />

        </div>

      </div>
    </div>
  );
}