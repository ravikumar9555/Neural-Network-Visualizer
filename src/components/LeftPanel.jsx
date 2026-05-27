export default function LeftPanel({

  dataset,
  setDataset,

  problemType,

}) {

  // CLASSIFICATION DATASETS

  const classificationDatasets = [

    {
      id: "circle",
      label: "Circle",
    },

    {
      id: "xor",
      label: "XOR",
    },

    {
      id: "spiral",
      label: "Spiral",
    },

    {
      id: "gaussian",
      label: "Gaussian",
    },
  ];

  // REGRESSION DATASETS

  const regressionDatasets = [

    {
      id: "plane",
      label: "Plane",
    },

    {
      id: "wave",
      label: "Wave",
    },
  ];

  const datasets =

    problemType ===
    "classification"

      ? classificationDatasets

      : regressionDatasets;

  return (

    <div className="
      space-y-4
    ">

      {/* DATASET CARD */}

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
          DATA
        </h2>

        <p className="
          text-gray-500
          mb-5
        ">
          Which dataset do
          you want to use?
        </p>

        {/* DATASETS */}

        <div className="
          grid
          grid-cols-2
          gap-3
        ">

          {datasets.map(
            (item) => (

              <div

                key={item.id}

                onClick={() =>
                  setDataset(
                    item.id
                  )
                }

                className={`
                  h-20
                  rounded-xl
                  border-2
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  transition-all
                  duration-200

                  ${
                    dataset ===
                    item.id

                      ? `
                        border-blue-500
                        bg-blue-50
                        text-blue-600
                        scale-105
                      `

                      : `
                        border-gray-200
                        hover:border-gray-400
                      `
                  }
                `}
              >

                <div className="
                  text-center
                ">

                  <p className="
                    text-lg
                    font-semibold
                  ">
                    {item.label}
                  </p>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* INFO CARD */}

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
          Playground Info
        </h2>

        <div className="
          space-y-4
          text-sm
          text-gray-600
        ">

          <div>

            <p className="
              font-bold
            ">
              Blue Connections
            </p>

            <p>
              Positive neural
              weights
            </p>

          </div>

          <div>

            <p className="
              font-bold
            ">
              Orange Connections
            </p>

            <p>
              Negative neural
              weights
            </p>

          </div>

          <div>

            <p className="
              font-bold
            ">
              Moving Particles
            </p>

            <p>
              Signal flow through
              the network
            </p>

          </div>

          <div>

            <p className="
              font-bold
            ">
              Glowing Nodes
            </p>

            <p>
              Higher neuron
              activation
            </p>

          </div>

        </div>

      </div>

      {/* NETWORK GUIDE */}

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
          Neural Network
        </h2>

        <div className="
          space-y-4
          text-sm
          text-gray-600
        ">

          <div>

            <p className="
              font-bold
            ">
              Input Layer
            </p>

            <p>
              Receives input
              features
            </p>

          </div>

          <div>

            <p className="
              font-bold
            ">
              Hidden Layers
            </p>

            <p>
              Learn patterns
              from data
            </p>

          </div>

          <div>

            <p className="
              font-bold
            ">
              Output Layer
            </p>

            <p>
              Produces final
              predictions
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}