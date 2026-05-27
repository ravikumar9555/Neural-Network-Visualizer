import {
  useState,
  useRef,
  useEffect,
} from "react";

import TopBar from "./components/TopBar";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import NetworkCanvas from "./components/NetworkCanvas";

import { generateData } from "./utils/generateData";
import { trainModel } from "./utils/trainModel";

export default function App() {

  // LOSS DATA
  const [lossData, setLossData] =
    useState([]);

  // WEIGHTS
  const [weights, setWeights] =
    useState([]);

  // ACTIVATIONS
  const [activations, setActivations] =
    useState([]);

  // GRADIENTS
  const [gradients, setGradients] =
    useState([]);

  // PREDICTIONS
  const [predictions, setPredictions] =
    useState([]);

  // EPOCH
  const [epoch, setEpoch] =
    useState(0);

  // LEARNING RATE
  const [learningRate, setLearningRate] =
    useState(0.03);

  // ACTIVATION FUNCTION
  const [activation, setActivation] =
    useState("relu");

  // DATASET
  const [dataset, setDataset] =
    useState("circle");

  // TRAINING STATE
  const [isTraining, setIsTraining] =
    useState(false);

  // MODEL
  const [model, setModel] =
    useState(null);

  // NETWORK LAYERS
  const [layers, setLayers] =
    useState([2, 4, 1]);

  // DATA
  const [data, setData] =
    useState(
      generateData(dataset)
    );

  // STOP REF
  const stopTrainingRef =
    useRef(false);

  // RESET WHEN ARCHITECTURE CHANGES

  useEffect(() => {

    setWeights([]);

    setPredictions([]);

    setLossData([]);

    setGradients([]);

    setActivations([]);

    setEpoch(0);

  }, [layers]);

  // TRAIN MODEL

  const handleTrain = async () => {

    stopTrainingRef.current =
      false;

    setIsTraining(true);

    // REGENERATE DATA

    const newData =
      generateData(dataset);

    setData(newData);

    // TRAIN

    const result =
      await trainModel(

        newData,

        setLossData,
        setPredictions,
        setWeights,
        setActivations,
        setGradients,
        setEpoch,

        learningRate,
        activation,

        layers,

        stopTrainingRef,
      );

    setModel(result.model);

    setIsTraining(false);
  };

  // STOP TRAINING

  const handleStop = () => {

    stopTrainingRef.current =
      true;

    setIsTraining(false);
  };

  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-6
    ">

      {/* TOP BAR */}

      <TopBar

        epoch={epoch}

        learningRate={learningRate}
        setLearningRate={
          setLearningRate
        }

        activation={activation}
        setActivation={
          setActivation
        }

        onTrain={handleTrain}

        onStop={handleStop}

        isTraining={isTraining}
      />

      {/* MAIN GRID */}

      <div className="
        grid
        grid-cols-12
        gap-6
      ">

        {/* LEFT PANEL */}

        <div className="
          col-span-2
        ">

          <LeftPanel

            dataset={dataset}

            setDataset={
              setDataset
            }
          />

        </div>

        {/* CENTER PANEL */}

        <div className="
          col-span-7
        ">

          <NetworkCanvas

            layers={layers}
            setLayers={setLayers}

            weights={weights}

            activations={
              activations
            }

            gradients={
              gradients
            }

            isTraining={
              isTraining
            }
          />

        </div>

        {/* RIGHT PANEL */}

        <div className="
          col-span-3
        ">

          <RightPanel

            data={data}

            predictions={
              predictions
            }

            model={model}

            lossData={
              lossData
            }
          />

        </div>

      </div>

    </div>
  );
}