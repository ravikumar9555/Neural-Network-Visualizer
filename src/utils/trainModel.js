import * as tf from "@tensorflow/tfjs";

export async function trainModel(

  data,

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
) {

  const model = tf.sequential();

  // DYNAMIC MODEL

  for (
    let i = 1;
    i < layers.length;
    i++
  ) {

    const isOutput =
      i === layers.length - 1;

    model.add(

      tf.layers.dense({

        units: layers[i],

        activation: isOutput
          ? "sigmoid"
          : activation,

        inputShape:
          i === 1
            ? [layers[0]]
            : undefined,
      })
    );
  }

  model.compile({

    optimizer:
      tf.train.adam(learningRate),

    loss: "binaryCrossentropy",

    metrics: ["accuracy"],
  });

  const xs =
    tf.tensor2d(data.xs);

  const ys =
    tf.tensor2d(
      data.ys,
      [data.ys.length, 1]
    );

  const losses = [];

  let previousWeights = null;

  await model.fit(xs, ys, {

    epochs: 200,

    callbacks: {

      onEpochEnd: async (
        epoch,
        logs
      ) => {

        // STOP TRAINING

        if (
          stopTrainingRef.current
        ) {

          model.stopTraining =
            true;

          return;
        }

        setEpoch(epoch);

        losses.push({

          epoch,
          loss: logs.loss,
        });

        setLossData([...losses]);

        // PREDICTIONS

        const preds =
          model.predict(xs);

        const predValues =
          await preds.data();

        if (epoch % 3 === 0) {

          setPredictions([
            ...predValues
          ]);
        }

        // WEIGHTS

        const allWeights = [];

        for (
          let i = 0;
          i < model.layers.length;
          i++
        ) {

          const layerWeights =

            model.layers[i]
              .getWeights()[0];

          const values =
            await layerWeights.array();

          allWeights.push(values);
        }

        if (epoch % 3 === 0) {

          setWeights(allWeights);
        }

        // ACTIVATIONS

        const hiddenLayerModel =

          tf.model({

            inputs: model.inputs,

            outputs:
              model.layers[0].output,
          });

        const hiddenActivations =

          hiddenLayerModel.predict(xs);

        const activationValues =

          await hiddenActivations.array();

        const averaged =

          activationValues
            .reduce((a, b) => {

              return a.map(
                (v, i) =>
                  v + b[i]
              );

            })

            .map(
              (v) =>
                v /
                activationValues.length
            );

        if (epoch % 3 === 0) {

          setActivations(
            averaged
          );
        }

        // GRADIENTS

        if (previousWeights) {

          const gradients =

            allWeights.map(
              (layer, layerIndex) =>

                layer.map(
                  (row, rowIndex) =>

                    row.map(
                      (w, colIndex) =>

                        Math.abs(

                          w -

                          previousWeights[
                            layerIndex
                          ]?.[
                            rowIndex
                          ]?.[
                            colIndex
                          ] || 0
                        )
                    )
                )
            );

          if (epoch % 3 === 0) {

            setGradients(
              gradients
            );
          }
        }

        previousWeights =
          JSON.parse(
            JSON.stringify(
              allWeights
            )
          );

        preds.dispose();

        hiddenActivations.dispose();

        await tf.nextFrame();
      },
    },
  });

  xs.dispose();
  ys.dispose();

  return {
    model,
  };
}