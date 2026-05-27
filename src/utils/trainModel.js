import * as tf from "@tensorflow/tfjs";

export async function trainModel(
  data,
  setLossData,
  setPredictions,
  setWeights
) {

  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      units: 4,
      activation: "relu",
      inputShape: [2],
    })
  );

  model.add(
    tf.layers.dense({
      units: 1,
      activation: "sigmoid",
    })
  );

  model.compile({
    optimizer: tf.train.adam(0.03),
    loss: "binaryCrossentropy",
  });

  const xs = tf.tensor2d(data.xs);

  const ys = tf.tensor2d(
    data.ys,
    [data.ys.length, 1]
  );

  const losses = [];

  await model.fit(xs, ys, {

    epochs: 50,

    callbacks: {

      onEpochEnd: async (epoch, logs) => {

        losses.push({
          epoch,
          loss: logs.loss,
        });

        setLossData([...losses]);

        // predictions
        const preds = model.predict(xs);

        const predValues = await preds.data();

        setPredictions([...predValues]);

        // GET WEIGHTS
        const layer1Weights =
          model.layers[0].getWeights()[0];

        const weights =
          await layer1Weights.array();

        setWeights(weights);

        await tf.nextFrame();
      },
    },
  });
}