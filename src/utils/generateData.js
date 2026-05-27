export function generateData(samples = 200) {

  const points = [];
  const labels = [];

  for (let i = 0; i < samples; i++) {

    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;

    // XOR Pattern
    const label = x * y > 0 ? 0 : 1;

    points.push([x, y]);
    labels.push(label);
  }

  return {
    xs: points,
    ys: labels,
  };
}