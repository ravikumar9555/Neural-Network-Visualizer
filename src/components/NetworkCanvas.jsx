import { motion } from "framer-motion";
import { memo } from "react";

function NetworkCanvas({

  layers,
  setLayers,

  weights,

  activations,

  gradients,

}) {

  // DYNAMIC SVG WIDTH

  const width =
    Math.max(
      1000,
      layers.length * 240
    );

  const height = 650;

  // ADD LAYER

  const addLayer = () => {

    const updated = [...layers];

    updated.splice(
      updated.length - 1,
      0,
      3
    );

    setLayers(updated);
  };

  // REMOVE LAYER

  const removeLayer = () => {

    if (layers.length <= 3)
      return;

    const updated = [...layers];

    updated.splice(
      updated.length - 2,
      1
    );

    setLayers(updated);
  };

  // ADD NEURON

  const addNeuron = (index) => {

    const updated = [...layers];

    updated[index]++;

    setLayers([...updated]);
  };

  // REMOVE NEURON

  const removeNeuron = (index) => {

    const updated = [...layers];

    if (updated[index] <= 1)
      return;

    updated[index]--;

    setLayers([...updated]);
  };

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      p-6
      overflow-x-auto
      overflow-y-hidden
    ">

      {/* TOP CONTROLS */}

      <div className="
        flex
        items-center
        justify-center
        gap-12
        mb-10
      ">

        {/* ADD HIDDEN */}

        <div
          onClick={addLayer}
          className="
            text-5xl
            text-gray-400
            cursor-pointer
            select-none
            hover:text-gray-600
          "
        >
          +
        </div>

        {/* TITLE */}

        <div className="
          text-3xl
          font-semibold
          text-gray-700
        ">
          {layers.length - 2}
          {" "}
          Hidden Layers
        </div>

        {/* REMOVE HIDDEN */}

        <div
          onClick={removeLayer}
          className="
            text-5xl
            text-gray-400
            cursor-pointer
            select-none
            hover:text-gray-600
          "
        >
          −
        </div>

      </div>

      {/* NETWORK */}

      <div className="
        overflow-x-auto
      ">

        <svg
          width={width}
          height={height}
        >

          {layers.map(
            (
              neurons,
              layerIndex
            ) => {

              const x =
                140 +
                layerIndex * 220;

              return (

                <g
                  key={layerIndex}
                >

                  {/* TITLE */}

                  <text

                    x={x - 40}

                    y={30}

                    fontSize="20"

                    fill="#374151"

                    fontWeight="500"
                  >

                    {layerIndex === 0
                      ? "Input"

                      : layerIndex ===
                        layers.length - 1

                      ? "Output"

                      : `Hidden ${layerIndex}`}

                  </text>

                  {/* NEURON COUNT */}

                  <text

                    x={x - 18}

                    y={58}

                    fontSize="14"

                    fill="#6B7280"
                  >

                    {neurons}
                    {" "}
                    neurons

                  </text>

                  {/* SIMPLE + */}

                  <text

                    x={x - 18}

                    y={95}

                    fontSize="34"

                    fill="#9CA3AF"

                    style={{
                      cursor: "pointer",
                      userSelect: "none",
                    }}

                    onClick={() =>
                      addNeuron(
                        layerIndex
                      )
                    }
                  >
                    +
                  </text>

                  {/* SIMPLE - */}

                  <text

                    x={x + 18}

                    y={95}

                    fontSize="34"

                    fill="#9CA3AF"

                    style={{
                      cursor: "pointer",
                      userSelect: "none",
                    }}

                    onClick={() =>
                      removeNeuron(
                        layerIndex
                      )
                    }
                  >
                    −
                  </text>

                  {/* NEURONS */}

                  {Array.from({
                    length: neurons,
                  }).map(
                    (
                      _,
                      neuronIndex
                    ) => {

                      const spacing =
                        height /
                        (neurons + 1);

                      const y =
                        spacing *
                        (
                          neuronIndex + 1
                        );

                      // CONNECTIONS

                      if (
                        layerIndex > 0
                      ) {

                        const prevNeurons =
                          layers[
                            layerIndex - 1
                          ];

                        return (

                          <g
                            key={neuronIndex}
                          >

                            {Array.from({
                              length:
                                prevNeurons,
                            }).map(
                              (
                                _,
                                prevIndex
                              ) => {

                                const prevSpacing =
                                  height /
                                  (
                                    prevNeurons + 1
                                  );

                                const prevY =
                                  prevSpacing *
                                  (
                                    prevIndex + 1
                                  );

                                // CURVED PATH

                                const path = `
                                  M ${x - 220} ${prevY}
                                  C ${x - 120} ${prevY},
                                    ${x - 80} ${y},
                                    ${x} ${y}
                                `;

                                // WEIGHT

                                const layerWeights =
                                  weights[
                                    layerIndex - 1
                                  ];

                                const weight =
                                  layerWeights?.[
                                    prevIndex
                                  ]?.[
                                    neuronIndex
                                  ] || 0;

                                // GRADIENT

                                const gradient =
                                  gradients?.[
                                    layerIndex - 1
                                  ]?.[
                                    prevIndex
                                  ]?.[
                                    neuronIndex
                                  ] || 0;

                                // COLOR

                                const color =
                                  weight > 0
                                    ? "#3B82F6"
                                    : "#F59E0B";

                                // THICKNESS

                                const thickness =
                                  Math.max(
                                    Math.abs(
                                      weight
                                    ) * 10,
                                    1
                                  );

                                // GLOW

                                const glow =
                                  Math.min(
                                    gradient *
                                      120,
                                    40
                                  );

                                return (

                                  <g
                                    key={
                                      prevIndex
                                    }
                                  >

                                    {/* CONNECTION */}

                                    <motion.path

                                      d={path}

                                      stroke={
                                        color
                                      }

                                      strokeWidth={
                                        thickness
                                      }

                                      strokeDasharray="8 8"

                                      opacity={
                                        Math.min(
                                          Math.abs(
                                            weight
                                          ),
                                          1
                                        )
                                      }

                                      fill="none"

                                      animate={{

                                        opacity: [
                                          0.3,
                                          1,
                                          0.3,
                                        ],

                                        filter: [

                                          `drop-shadow(
                                            0 0 ${glow}px ${color}
                                          )`,

                                          `drop-shadow(
                                            0 0 ${glow + 10}px ${color}
                                          )`,

                                          `drop-shadow(
                                            0 0 ${glow}px ${color}
                                          )`,
                                        ],
                                      }}

                                      transition={{
                                        repeat:
                                          Infinity,

                                        duration:
                                          2,
                                      }}
                                    />

                                    {/* FLOW PARTICLE */}

                                    <motion.circle

                                      r="5"

                                      fill={
                                        color
                                      }

                                      animate={{
                                        offsetDistance: [
                                          "0%",
                                          "100%",
                                        ],
                                      }}

                                      transition={{

                                        repeat:
                                          Infinity,

                                        duration:
                                          Math.max(
                                            0.5,
                                            3 -
                                              Math.abs(
                                                weight
                                              )
                                          ),

                                        ease:
                                          "linear",
                                      }}

                                      style={{
                                        offsetPath:
                                          `path("${path}")`,
                                      }}
                                    />

                                  </g>
                                );
                              }
                            )}

                            {/* ACTIVATED NODE */}

                            {(() => {

                              const activation =
                                activations?.[
                                  neuronIndex
                                ] || 0;

                              const glow =
                                activation * 40;

                              return (

                                <>

                                  <motion.rect

                                    x={x - 25}

                                    y={y - 25}

                                    width="50"

                                    height="50"

                                    rx="10"

                                    fill="#DBEAFE"

                                    stroke="#1F2937"

                                    strokeWidth="2"

                                    animate={{

                                      scale: [
                                        1,
                                        1 +
                                          activation *
                                            0.15,
                                        1,
                                      ],

                                      filter: [

                                        `drop-shadow(
                                          0 0 ${glow}px #3B82F6
                                        )`,

                                        `drop-shadow(
                                          0 0 ${glow + 10}px #3B82F6
                                        )`,

                                        `drop-shadow(
                                          0 0 ${glow}px #3B82F6
                                        )`,
                                      ],
                                    }}

                                    transition={{
                                      repeat:
                                        Infinity,

                                      duration:
                                        1.5,
                                    }}
                                  />

                                  {/* VALUE */}

                                  <text

                                    x={x - 12}

                                    y={y + 5}

                                    fontSize="10"

                                    fill="#111827"
                                  >

                                    {activation.toFixed(
                                      1
                                    )}

                                  </text>

                                </>
                              );
                            })()}

                          </g>
                        );
                      }

                      // INPUT NODES

                      return (

                        <motion.rect

                          key={neuronIndex}

                          x={x - 25}

                          y={y - 25}

                          width="50"

                          height="50"

                          rx="10"

                          fill="#FDE68A"

                          stroke="#1F2937"

                          strokeWidth="2"

                          animate={{
                            scale: [
                              1,
                              1.05,
                              1,
                            ],
                          }}

                          transition={{
                            repeat:
                              Infinity,

                            duration:
                              2,
                          }}
                        />
                      );
                    }
                  )}

                </g>
              );
            }
          )}

        </svg>

      </div>

    </div>
  );
}

export default memo(NetworkCanvas);