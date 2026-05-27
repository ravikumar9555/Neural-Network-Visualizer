import {
  Canvas,
} from "@react-three/fiber";

import {
  OrbitControls,
  Line,
  Text,
} from "@react-three/drei";

import {
  useMemo,
} from "react";

function Neuron({

  position,

  activation = 0,

}) {

  return (

    <mesh position={position}>

      <sphereGeometry args={[0.25, 32, 32]} />

      <meshStandardMaterial

        color={

          activation > 0.5

            ? "#2563EB"

            : "#F59E0B"
        }

        emissive={

          activation > 0.5

            ? "#2563EB"

            : "#F59E0B"
        }

        emissiveIntensity={
          activation * 2
        }
      />

    </mesh>
  );
}

function Connection({

  start,
  end,

  weight = 0,

}) {

  return (

    <Line

      points={[
        start,
        end,
      ]}

      color={
        weight > 0
          ? "#2563EB"
          : "#F59E0B"
      }

      lineWidth={
        Math.max(
          1,
          Math.abs(weight) * 3
        )
      }

      transparent

      opacity={0.8}
    />
  );
}

function NetworkScene({

  layers,

  weights,

  activations,

}) {

  // CREATE NODES

  const nodes =
    useMemo(() => {

      const result = [];

      layers.forEach(
        (
          neuronCount,
          layerIndex
        ) => {

          const x =
            layerIndex * 3;

          for (
            let i = 0;
            i < neuronCount;
            i++
          ) {

            const y =
              i * 1.2 -

              (
                neuronCount - 1
              ) *
                0.6;

            result.push({

              position: [
                x,
                y,
                0,
              ],

              layerIndex,

              neuronIndex: i,
            });
          }
        }
      );

      return result;

    }, [layers]);

  return (

    <>

      {/* LIGHTS */}

      <ambientLight intensity={0.8} />

      <pointLight

        position={[10, 10, 10]}

        intensity={2}
      />

      {/* CONNECTIONS */}

      {nodes.map(
        (node) => {

          if (
            node.layerIndex === 0
          )
            return null;

          const prevNodes =
            nodes.filter(
              (n) =>

                n.layerIndex ===
                node.layerIndex - 1
            );

          return prevNodes.map(
            (prevNode, idx) => {

              const layerWeights =
                weights[
                  node.layerIndex - 1
                ];

              const weight =
                layerWeights?.[
                  prevNode.neuronIndex
                ]?.[
                  node.neuronIndex
                ] || 0;

              return (

                <Connection

                  key={`${prevNode.layerIndex}-${idx}-${node.layerIndex}`}

                  start={
                    prevNode.position
                  }

                  end={
                    node.position
                  }

                  weight={weight}
                />
              );
            }
          );
        }
      )}

      {/* NEURONS */}

      {nodes.map(
        (node, idx) => (

          <Neuron

            key={idx}

            position={
              node.position
            }

            activation={
              activations[
                node.neuronIndex
              ] || 0
            }
          />
        )
      )}

      {/* LABELS */}

      {layers.map(
        (_, index) => (

          <Text

            key={index}

            position={[
              index * 3,
              4,
              0,
            ]}

            fontSize={0.4}

            color="black"
          >

            {index === 0

              ? "Input"

              : index ===
                layers.length - 1

              ? "Output"

              : `Hidden ${index}`}
          </Text>
        )
      )}

      {/* CAMERA */}

      <OrbitControls />

    </>
  );
}

export default function Network3D({

  layers,

  weights,

  activations,

}) {

  return (

    <div className="
      w-full
      h-[700px]
      bg-white
      rounded-2xl
      shadow-sm
    ">

      <Canvas camera={{
        position: [5, 0, 10],
        fov: 60,
      }}>

        <NetworkScene

          layers={layers}

          weights={weights}

          activations={activations}
        />

      </Canvas>

    </div>
  );
}