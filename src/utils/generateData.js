export function generateData(

  dataset = "circle",

  problemType =
    "classification",

  noise = 0

) {

  const total = 400;

  const xs = [];
  const ys = [];

  // NOISE FUNCTION

  const addNoise = (v) => {

    return (
      v +

      (Math.random() - 0.5) *

      noise
    );
  };

  // =========================
  // CLASSIFICATION
  // =========================

  if (
    problemType ===
    "classification"
  ) {

    // XOR
    // -------------------------

    if (dataset === "xor") {

      for (
        let i = 0;
        i < total;
        i++
      ) {

        let x =
          Math.random() * 2 - 1;

        let y =
          Math.random() * 2 - 1;

        x = addNoise(x);

        y = addNoise(y);

        xs.push([x, y]);

        ys.push(
          x * y > 0
            ? 0
            : 1
        );
      }
    }

    // CIRCLE
    // -------------------------

    else if (
      dataset === "circle"
    ) {

      for (
        let i = 0;
        i < total;
        i++
      ) {

        let x =
          Math.random() * 2 - 1;

        let y =
          Math.random() * 2 - 1;

        x = addNoise(x);

        y = addNoise(y);

        xs.push([x, y]);

        const radius =
          Math.sqrt(
            x * x + y * y
          );

        ys.push(
          radius > 0.5
            ? 1
            : 0
        );
      }
    }

    // SPIRAL
    // -------------------------

    else if (
      dataset === "spiral"
    ) {

      for (
        let i = 0;
        i < total / 2;
        i++
      ) {

        const r =
          i / (total / 2);

        const t =
          1.75 * i / 16;

        let x1 =
          r * Math.sin(t);

        let y1 =
          r * Math.cos(t);

        x1 = addNoise(x1);

        y1 = addNoise(y1);

        xs.push([x1, y1]);

        ys.push(0);

        let x2 =
          -r * Math.sin(t);

        let y2 =
          -r * Math.cos(t);

        x2 = addNoise(x2);

        y2 = addNoise(y2);

        xs.push([x2, y2]);

        ys.push(1);
      }
    }

    // GAUSSIAN
    // -------------------------

    else if (
      dataset === "gaussian"
    ) {

      for (
        let i = 0;
        i < total;
        i++
      ) {

        const label =
          i < total / 2
            ? 0
            : 1;

        const center =
          label === 0
            ? -0.6
            : 0.6;

        let x =
          center +
          Math.random() *
            0.6;

        let y =
          center +
          Math.random() *
            0.6;

        x = addNoise(x);

        y = addNoise(y);

        xs.push([x, y]);

        ys.push(label);
      }
    }
  }

  // =========================
  // REGRESSION
  // =========================

  else {

    // PLANE
    // -------------------------

    if (dataset === "plane") {

      for (
        let i = 0;
        i < total;
        i++
      ) {

        let x =
          Math.random() * 2 - 1;

        let y =
          Math.random() * 2 - 1;

        x = addNoise(x);

        y = addNoise(y);

        xs.push([x, y]);

        ys.push(
          x + y
        );
      }
    }

    // WAVE
    // -------------------------

    else if (
      dataset === "wave"
    ) {

      for (
        let i = 0;
        i < total;
        i++
      ) {

        let x =
          Math.random() * 2 - 1;

        let y =
          Math.random() * 2 - 1;

        x = addNoise(x);

        y = addNoise(y);

        xs.push([x, y]);

        ys.push(

          Math.sin(
            x * 4
          ) +

          Math.cos(
            y * 4
          )
        );
      }
    }

    // PARABOLOID
    // -------------------------

    else if (
      dataset ===
      "paraboloid"
    ) {

      for (
        let i = 0;
        i < total;
        i++
      ) {

        let x =
          Math.random() * 2 - 1;

        let y =
          Math.random() * 2 - 1;

        x = addNoise(x);

        y = addNoise(y);

        xs.push([x, y]);

        ys.push(
          x * x + y * y
        );
      }
    }
  }

  return {
    xs,
    ys,
  };
}