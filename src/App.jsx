import {
  useState,
  useRef,
  useEffect,
} from "react";

import TopBar from "./components/TopBar";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import NetworkCanvas from "./components/NetworkCanvas";
import DatasetUploader from "./components/DatasetUploader";

import { generateData } from "./utils/generateData";
import { trainModel } from "./utils/trainModel";

export default function App() {

  // LOSS

  const [lossData, setLossData] =
    useState([]);

  // ACCURACY

  const [accuracy, setAccuracy] =
    useState(0);

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

  const [
    learningRate,
    setLearningRate
  ] = useState(0.03);

  // ACTIVATION

  const [
    activation,
    setActivation
  ] = useState("sigmoid");

  // REGULARIZATION

  const [
    regularization,
    setRegularization
  ] = useState("none");

  // REG RATE

  const [
    regularizationRate,
    setRegularizationRate
  ] = useState(0);

  // PROBLEM TYPE

  const [
    problemType,
    setProblemType
  ] = useState(
    "classification"
  );

  // DATASET

  const [
    dataset,
    setDataset
  ] = useState("circle");

  // BATCH SIZE

  const [
    batchSize,
    setBatchSize
  ] = useState(16);

  // TRAINING SPEED

  const [
    trainingSpeed,
    setTrainingSpeed
  ] = useState(5);

  // NOISE

  const [noise, setNoise] =
    useState(0);

  // TRAINING

  const [
    isTraining,
    setIsTraining
  ] = useState(false);

  // MODEL

  const [model, setModel] =
    useState(null);

  // NETWORK LAYERS

  const [layers, setLayers] =
    useState([2, 4, 1]);

  // CUSTOM DATASET FLAG

  const [
    customDataset,
    setCustomDataset
  ] = useState(false);

  // DATA

  const [data, setData] =
    useState(
      generateData(
        dataset,
        problemType,
        noise
      )
    );

  // PANEL WIDTHS

  const [
    leftWidth,
    setLeftWidth
  ] = useState(260);

  const [
    rightWidth,
    setRightWidth
  ] = useState(340);

  // STOP REF

  const stopTrainingRef =
    useRef(false);

  // RESET UI

  useEffect(() => {

    setWeights([]);

    setPredictions([]);

    setLossData([]);

    setGradients([]);

    setActivations([]);

    setEpoch(0);

    setAccuracy(0);

  }, [

    layers,

    dataset,

    problemType,

    noise,
  ]);

  // TRAIN MODEL

  const handleTrain =
    async () => {

      stopTrainingRef.current =
        false;

      setIsTraining(true);

      let newData;

      // CUSTOM DATASET

      if (customDataset) {

        newData = data;
      }

      // GENERATED DATASET

      else {

        newData =
          generateData(

            dataset,

            problemType,

            noise
          );

        setData(newData);
      }

      // AUTO INPUT FEATURES

      if (
        newData.xs.length > 0
      ) {

        const inputFeatures =

          newData.xs[0].length;

        const updatedLayers =
          [...layers];

        updatedLayers[0] =
          inputFeatures;

        setLayers(updatedLayers);
      }

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
          setAccuracy,

          learningRate,

          activation,

          regularization,

          regularizationRate,

          problemType,

          layers,

          batchSize,

          trainingSpeed,

          stopTrainingRef,
        );

      setModel(result.model);

      setIsTraining(false);
    };

  // STOP

  const handleStop = () => {

    stopTrainingRef.current =
      true;

    setIsTraining(false);
  };

  // LEFT RESIZE

  const startLeftResize =
    (e) => {

      e.preventDefault();

      const startX =
        e.clientX;

      const startWidth =
        leftWidth;

      const onMove =
        (moveEvent) => {

          setLeftWidth(

            Math.max(

              220,

              startWidth +

              (
                moveEvent.clientX -
                startX
              )
            )
          );
        };

      const onUp = () => {

        window.removeEventListener(
          "mousemove",
          onMove
        );

        window.removeEventListener(
          "mouseup",
          onUp
        );
      };

      window.addEventListener(
        "mousemove",
        onMove
      );

      window.addEventListener(
        "mouseup",
        onUp
      );
    };

  // RIGHT RESIZE

  const startRightResize =
    (e) => {

      e.preventDefault();

      const startX =
        e.clientX;

      const startWidth =
        rightWidth;

      const onMove =
        (moveEvent) => {

          setRightWidth(

            Math.max(

              280,

              startWidth -

              (
                moveEvent.clientX -
                startX
              )
            )
          );
        };

      const onUp = () => {

        window.removeEventListener(
          "mousemove",
          onMove
        );

        window.removeEventListener(
          "mouseup",
          onUp
        );
      };

      window.addEventListener(
        "mousemove",
        onMove
      );

      window.addEventListener(
        "mouseup",
        onUp
      );
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

        learningRate={
          learningRate
        }

        setLearningRate={
          setLearningRate
        }

        activation={
          activation
        }

        setActivation={
          setActivation
        }

        regularization={
          regularization
        }

        setRegularization={
          setRegularization
        }

        regularizationRate={
          regularizationRate
        }

        setRegularizationRate={
          setRegularizationRate
        }

        problemType={
          problemType
        }

        setProblemType={
          setProblemType
        }

        batchSize={
          batchSize
        }

        setBatchSize={
          setBatchSize
        }

        trainingSpeed={
          trainingSpeed
        }

        setTrainingSpeed={
          setTrainingSpeed
        }

        noise={noise}

        setNoise={setNoise}

        onTrain={
          handleTrain
        }

        onStop={
          handleStop
        }

        isTraining={
          isTraining
        }
      />

      {/* MAIN */}

      <div className="
        flex
        gap-4
        h-[85vh]
      ">

        {/* LEFT PANEL */}

        <div

          style={{
            width: leftWidth,
          }}

          className="
            relative
            flex-shrink-0
            overflow-y-auto
          "
        >

          <div className="
            space-y-4
          ">

            {/* CSV UPLOAD */}

            <DatasetUploader

              setData={(
                uploaded
              ) => {

                setData(uploaded);

                setCustomDataset(
                  true
                );
              }}
            />

            {/* BUILT-IN DATASETS */}

            <LeftPanel

              dataset={dataset}

              setDataset={(
                value
              ) => {

                setDataset(value);

                setCustomDataset(
                  false
                );
              }}

              problemType={
                problemType
              }
            />

          </div>

          {/* RESIZER */}

          <div

            onMouseDown={
              startLeftResize
            }

            className="
              absolute
              top-0
              right-0
              w-2
              h-full
              cursor-col-resize
              hover:bg-blue-300
            "
          />

        </div>

        {/* CENTER */}

        <div className="
          flex-1
          min-w-0
          overflow-hidden
        ">

          <NetworkCanvas

            layers={layers}

            setLayers={
              setLayers
            }

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

        <div

          style={{
            width: rightWidth,
          }}

          className="
            relative
            flex-shrink-0
            overflow-y-auto
          "
        >

          {/* RESIZER */}

          <div

            onMouseDown={
              startRightResize
            }

            className="
              absolute
              top-0
              left-0
              w-2
              h-full
              cursor-col-resize
              hover:bg-blue-300
              z-10
            "
          />

          <RightPanel

            data={data}

            predictions={
              predictions
            }

            model={model}

            lossData={
              lossData
            }

            accuracy={
              accuracy
            }

            problemType={
              problemType
            }
          />

        </div>

      </div>

    </div>
  );
}