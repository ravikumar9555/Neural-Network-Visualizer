import * as tf from "@tensorflow/tfjs";

export async function trainModel(

  data,

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
) {

  // REGULARIZER

  let kernelRegularizer =
    null;

  if (
    regularization === "l1"
  ) {

    kernelRegularizer =
      tf.regularizers.l1({
        l1:
          regularizationRate,
      });
  }

  else if (
    regularization === "l2"
  ) {

    kernelRegularizer =
      tf.regularizers.l2({
        l2:
          regularizationRate,
      });
  }

  // MODEL

  const model =
    tf.sequential();

  // BUILD NETWORK

  for (
    let i = 1;
    i < layers.length;
    i++
  ) {

    const isOutput =
      i ===
      layers.length - 1;

    model.add(

      tf.layers.dense({

        units: layers[i],

        inputShape:
          i === 1
            ? [layers[0]]
            : undefined,

        activation:

          isOutput

            ? problemType ===
              "classification"

              ? "sigmoid"

              : "linear"

            : activation,

        kernelRegularizer,
      })
    );
  }

  // LOSS

  const lossFunction =

    problemType ===
    "classification"

      ? "binaryCrossentropy"

      : "meanSquaredError";

  // COMPILE

  model.compile({

    optimizer:
      tf.train.adam(
        learningRate
      ),

    loss: lossFunction,

    metrics:

      problemType ===
      "classification"

        ? ["accuracy"]

        : [],
  });

  // DATA

  const xs =
    tf.tensor2d(data.xs);

  const ys =
    tf.tensor2d(
      data.ys,
      [data.ys.length, 1]
    );

  // REUSE MODEL

  const hiddenLayerModel =

    tf.model({

      inputs:
        model.inputs,

      outputs:
        model.layers[0]
          .output,
    });

  const losses = [];

  let previousWeights =
    null;

  // SPEED CONTROL

  const renderEvery =

    Math.max(
      1,
      11 - trainingSpeed
    );

  // TRAIN

  await model.fit(xs, ys, {

    epochs: 500,

    batchSize,

    shuffle: true,

    callbacks: {

      onEpochEnd:
        async (
          epoch,
          logs
        ) => {

          // STOP

          if (
            stopTrainingRef.current
          ) {

            model.stopTraining =
              true;

            return;
          }

          // THROTTLE UI

          if (
            epoch %
              renderEvery !==
            0
          ) {
            return;
          }

          // EPOCH

          setEpoch(epoch);

          // LOSS

          losses.push({

            epoch,

            loss:
              logs.loss,
          });

          setLossData([
            ...losses,
          ]);

          // ACCURACY

          if (
            problemType ===
            "classification"
          ) {

            setAccuracy(

              (
                logs.acc ||

                logs.accuracy ||

                0
              ) * 100
            );
          }

          // MEMORY SAFE

          await tf.tidy(
            async () => {

              // PREDS

              const preds =
                model.predict(
                  xs
                );

              const predValues =
                await preds.data();

              // WEIGHTS

              const allWeights =
                [];

              for (
                let i = 0;
                i <
                model.layers
                  .length;
                i++
              ) {

                const layerWeights =

                  model.layers[
                    i
                  ].getWeights()[0];

                const values =
                  await layerWeights.array();

                allWeights.push(
                  values
                );
              }

              // ACTIVATIONS

              const hiddenActivations =

                hiddenLayerModel.predict(
                  xs
                );

              const activationValues =

                await hiddenActivations.array();

              const averaged =

                activationValues

                  .reduce(
                    (
                      a,
                      b
                    ) => {

                      return a.map(
                        (
                          v,
                          i
                        ) =>
                          v + b[i]
                      );
                    }
                  )

                  .map(
                    (
                      v
                    ) =>

                      v /
                      activationValues.length
                  );

              // GRADIENTS

              let gradients =
                [];

              if (
                previousWeights
              ) {

                gradients =

                  allWeights.map(

                    (
                      layer,
                      layerIndex
                    ) =>

                      layer.map(

                        (
                          row,
                          rowIndex
                        ) =>

                          row.map(

                            (
                              w,
                              colIndex
                            ) =>

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
              }

              previousWeights =
                JSON.parse(
                  JSON.stringify(
                    allWeights
                  )
                );

              // BATCH UPDATE

              requestAnimationFrame(
                () => {

                  setPredictions([
                    ...predValues,
                  ]);

                  setWeights(
                    allWeights
                  );

                  setActivations(
                    averaged
                  );

                  setGradients(
                    gradients
                  );
                }
              );
            }
          );

          // SMOOTH UI

          await tf.nextFrame();
        },
    },
  });

  // CLEANUP

  hiddenLayerModel.dispose();

  xs.dispose();

  ys.dispose();

  return {
    model,
  };
}