export function generateData(
  type = "xor",
  samples = 300
) {

  const xs = [];
  const ys = [];

  for (let i = 0; i < samples; i++) {

    const x =
      Math.random() * 2 - 1;

    const y =
      Math.random() * 2 - 1;

    let label = 0;

    // XOR

    if (type === "xor") {

      label =
        x * y > 0 ? 0 : 1;
    }

    // CIRCLE

    if (type === "circle") {

      label =
        x * x + y * y > 0.5
          ? 1
          : 0;
    }

    xs.push([x, y]);

    ys.push(label);
  }

  return { xs, ys };
}