import {
  memo,
  useMemo,
} from "react";

import { motion } from "framer-motion";

function NetworkCanvas({

  layers,
  setLayers,

  weights,

  activations,

  gradients,

}) {

  // NETWORK SIZE

  const totalNeurons =

    layers.reduce(
      (a, b) => a + b,
      0
    );

  // DISABLE PARTICLES
  // ON HUGE NETWORKS

  const enableParticles =
    totalNeurons < 30;

  // DISABLE GLOW
  // ON HUGE NETWORKS

  const enableGlow =
    totalNeurons < 45;

  // DYNAMIC WIDTH

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

  // MEMOIZED CONNECTIONS
  // HUGE PERFORMANCE BOOST

  const connections =
    useMemo(() => {

      const result = [];

      layers.forEach(
        (
          neurons,
          layerIndex
        ) => {

          if (
            layerIndex === 0
          )
            return;

          const prevNeurons =
            layers[
              layerIndex - 1
            ];

          const x =
            140 +
            layerIndex * 220;

          Array.from({
            length: neurons,
          }).forEach(
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

              Array.from({
                length:
                  prevNeurons,
              }).forEach(
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

                  const path = `
                    M ${x - 220} ${prevY}
                    C ${x - 120} ${prevY},
                      ${x - 80} ${y},
                      ${x} ${y}
                  `;

                  result.push({

                    path,

                    layerIndex,

                    neuronIndex,

                    prevIndex,

                    x,

                    y,

                    prevY,
                  });
                }
              );
            }
          );
        }
      );

      return result;

    }, [layers]);

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      p-6
      overflow-x-auto
      overflow-y-hidden
    ">

      {/* TOP */}

      <div className="
        flex
        items-center
        justify-center
        gap-12
        mb-10
      ">

        {/* ADD */}

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

        {/* REMOVE */}

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

          {/* CONNECTIONS */}

          {connections.map(
            (
              connection,
              index
            ) => {

              const {

                path,

                layerIndex,

                neuronIndex,

                prevIndex,

              } = connection;

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
                enableGlow

                  ? Math.min(
                      gradient * 120,
                      40
                    )

                  : 0;

              return (

                <g key={index}>

                  {/* PATH */}

                  <motion.path

                    d={path}

                    stroke={color}

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

                      filter:

                        enableGlow

                          ? [

                              `drop-shadow(
                                0 0 ${glow}px ${color}
                              )`,

                              `drop-shadow(
                                0 0 ${glow + 10}px ${color}
                              )`,

                              `drop-shadow(
                                0 0 ${glow}px ${color}
                              )`,
                            ]

                          : [],
                    }}

                    transition={{
                      repeat:
                        Infinity,

                      duration:
                        2,
                    }}
                  />

                  {/* PARTICLE */}

                  {enableParticles && (

                    <motion.circle

                      r="5"

                      fill={color}

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
                  )}

                </g>
              );
            }
          )}

          {/* LAYERS */}

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

                  {/* COUNT */}

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

                  {/* + */}

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

                  {/* - */}

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

                  {/* NODES */}

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

                      const activation =
                        activations?.[
                          neuronIndex
                        ] || 0;

                      const glow =
                        enableGlow

                          ? activation * 40

                          : 0;

                      return (

                        <g
                          key={neuronIndex}
                        >

                          <motion.rect

                            x={x - 25}

                            y={y - 25}

                            width="50"

                            height="50"

                            rx="10"

                            fill={
                              layerIndex === 0

                                ? "#FDE68A"

                                : "#DBEAFE"
                            }

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

                              filter:

                                enableGlow

                                  ? [

                                      `drop-shadow(
                                        0 0 ${glow}px #3B82F6
                                      )`,

                                      `drop-shadow(
                                        0 0 ${glow + 10}px #3B82F6
                                      )`,

                                      `drop-shadow(
                                        0 0 ${glow}px #3B82F6
                                      )`,
                                    ]

                                  : [],
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

                        </g>
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