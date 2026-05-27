import ControlPanel from "./components/ControlPanel";
import NeuralNetwork from "./components/NeuralNetwork";
import DatasetCanvas from "./components/DatasetCanvas";
import LossChart from "./components/LossChart";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      
      <h1 className="text-4xl font-bold mb-6 text-center">
        Neural Network Visualizer
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="col-span-1">
          <ControlPanel />
        </div>

        <div className="col-span-2">
          <NeuralNetwork />
        </div>

        <div className="col-span-1">
          <DatasetCanvas />
          <LossChart />
        </div>

      </div>
    </div>
  );
}