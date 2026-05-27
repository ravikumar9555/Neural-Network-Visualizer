export default function LeftPanel({

  dataset,
  setDataset,

}) {

  return (

    <div className="
      space-y-4
    ">

      {/* DATA CARD */}

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
          Dataset
        </h2>

        {/* SELECT */}

        <select

          value={dataset}

          onChange={(e) =>
            setDataset(
              e.target.value
            )
          }

          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            text-gray-700
          "
        >

          <option value="xor">
            XOR
          </option>

          <option value="circle">
            Circle
          </option>

        </select>

      </div>

      {/* INFO */}

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
          space-y-3
          text-sm
          text-gray-600
        ">

          <div>

            <p className="
              font-bold
            ">
              Blue Region
            </p>

            <p>
              Model predicts
              class 1
            </p>

          </div>

          <div>

            <p className="
              font-bold
            ">
              Orange Region
            </p>

            <p>
              Model predicts
              class 0
            </p>

          </div>

          <div>

            <p className="
              font-bold
            ">
              Thick Connections
            </p>

            <p>
              Strong neural
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
              network
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
          space-y-3
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
              Receives dataset
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
              and relationships
            </p>

          </div>

          <div>

            <p className="
              font-bold
            ">
              Output Layer
            </p>

            <p>
              Final prediction
              probability
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}