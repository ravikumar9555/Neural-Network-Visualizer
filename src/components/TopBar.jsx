export default function TopBar({

  epoch,

  learningRate,
  setLearningRate,

  activation,
  setActivation,

  onTrain,
  onStop,

  isTraining,

}) {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      p-4
      mb-6
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        {/* LEFT */}

        <div className="
          flex
          items-center
          gap-6
        ">

          {!isTraining ? (

            <button
              onClick={onTrain}
              className="
                w-16
                h-16
                rounded-full
                bg-slate-800
                text-white
                text-2xl
              "
            >
              ▶
            </button>

          ) : (

            <button
              onClick={onStop}
              className="
                w-16
                h-16
                rounded-full
                bg-red-500
                text-white
                text-2xl
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
              text-4xl
              font-bold
            ">
              {String(epoch)
                .padStart(6, "0")}
            </h1>

          </div>

        </div>

        {/* RIGHT */}

        <div className="
          flex
          gap-10
        ">

          {/* LEARNING RATE */}

          <div>

            <p className="
              text-sm
              text-gray-500
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

            <p>
              {learningRate}
            </p>

          </div>

          {/* ACTIVATION */}

          <div>

            <p className="
              text-sm
              text-gray-500
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
                border
                rounded-lg
                px-3
                py-2
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

        </div>

      </div>

    </div>
  );
}