export default function TopBar({

  epoch,

  learningRate,
  setLearningRate,

  activation,
  setActivation,

  regularization,
  setRegularization,

  regularizationRate,
  setRegularizationRate,

  problemType,
  setProblemType,

  trainingSpeed,
  setTrainingSpeed,

  batchSize,
  setBatchSize,

  noise,
  setNoise,

  onTrain,
  onStop,

  isTraining,

}) {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      p-6
      mb-6
    ">

      <div className="
        flex
        items-start
        justify-between
        flex-wrap
        gap-8
      ">

        {/* LEFT */}

        <div className="
          flex
          items-center
          gap-6
        ">

          {/* PLAY */}

          {!isTraining ? (

            <button

              onClick={onTrain}

              className="
                w-20
                h-20
                rounded-full
                bg-slate-800
                text-white
                text-3xl
                hover:scale-105
                transition-all
              "
            >
              ▶
            </button>

          ) : (

            <button

              onClick={onStop}

              className="
                w-20
                h-20
                rounded-full
                bg-slate-800
                text-white
                text-3xl
              "
            >
              ■
            </button>

          )}

          {/* EPOCH */}

          <div>

            <p className="
              text-gray-500
            ">
              Epoch
            </p>

            <h1 className="
              text-5xl
              font-light
              tracking-wider
            ">

              {String(epoch)
                .padStart(6, "0")}

            </h1>

          </div>

        </div>

        {/* RIGHT */}

        <div className="
          grid
          grid-cols-5
          gap-x-12
          gap-y-6
        ">

          {/* LEARNING RATE */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Learning Rate
            </p>

            <input

              type="range"

              min="0.001"
              max="1"

              step="0.001"

              value={learningRate}

              onChange={(e) =>
                setLearningRate(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <p className="
              text-lg
            ">
              {learningRate}
            </p>

          </div>

          {/* ACTIVATION */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Activation
            </p>

            <select

              value={activation}

              onChange={(e) =>
                setActivation(
                  e.target.value
                )
              }

              className="
                border-b-2
                border-gray-400
                bg-transparent
                text-xl
                outline-none
              "
            >

              <option value="relu">
                ReLU
              </option>

              <option value="sigmoid">
                Sigmoid
              </option>

              <option value="tanh">
                Tanh
              </option>

            </select>

          </div>

          {/* PROBLEM TYPE */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Problem Type
            </p>

            <select

              value={problemType}

              onChange={(e) =>
                setProblemType(
                  e.target.value
                )
              }

              className="
                border-b-2
                border-gray-400
                bg-transparent
                text-xl
                outline-none
              "
            >

              <option value="classification">
                Classification
              </option>

              <option value="regression">
                Regression
              </option>

            </select>

          </div>

          {/* REGULARIZATION */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Regularization
            </p>

            <select

              value={regularization}

              onChange={(e) =>
                setRegularization(
                  e.target.value
                )
              }

              className="
                border-b-2
                border-gray-400
                bg-transparent
                text-xl
                outline-none
              "
            >

              <option value="none">
                None
              </option>

              <option value="l1">
                L1
              </option>

              <option value="l2">
                L2
              </option>

            </select>

          </div>

          {/* REG RATE */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Regularization Rate
            </p>

            <input

              type="range"

              min="0"
              max="1"

              step="0.001"

              value={regularizationRate}

              onChange={(e) =>
                setRegularizationRate(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <p className="
              text-lg
            ">
              {regularizationRate}
            </p>

          </div>

          {/* BATCH SIZE */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Batch Size
            </p>

            <input

              type="range"

              min="1"
              max="64"

              step="1"

              value={batchSize}

              onChange={(e) =>
                setBatchSize(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <p className="
              text-lg
            ">
              {batchSize}
            </p>

          </div>

          {/* TRAINING SPEED

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Training Speed
            </p>

            <input

              type="range"

              min="1"
              max="10"

              step="1"

              value={trainingSpeed}

              onChange={(e) =>
                setTrainingSpeed(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <p className="
              text-lg
            ">
              {trainingSpeed}x
            </p>

          </div> */}

          {/* NOISE */}

          <div>

            <p className="
              text-gray-500
              mb-2
            ">
              Dataset Noise
            </p>

            <input

              type="range"

              min="0"
              max="1"

              step="0.01"

              value={noise}

              onChange={(e) =>
                setNoise(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <p className="
              text-lg
            ">
              {noise}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}