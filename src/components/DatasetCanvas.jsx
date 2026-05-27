import {
  useEffect,
  useRef,
} from "react";

export default function DatasetCanvas({

  data,
  predictions,

}) {

  const canvasRef =
    useRef(null);

  useEffect(() => {

    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    const width = 320;
    const height = 320;

    canvas.width = width;
    canvas.height = height;

    // CLEAR

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    // BACKGROUND HEATMAP

    const resolution = 8;

    for (
      let x = 0;
      x < width;
      x += resolution
    ) {

      for (
        let y = 0;
        y < height;
        y += resolution
      ) {

        // NORMALIZED SPACE

        const nx =
          (x / width) * 2 - 1;

        const ny =
          (y / height) * 2 - 1;

        // SIMPLE PROBABILITY
        // USING NEAREST POINT

        let nearest = 0;

        let minDist =
          Infinity;

        data.xs.forEach(
          (point, i) => {

            const dx =
              point[0] - nx;

            const dy =
              point[1] - ny;

            const dist =
              dx * dx + dy * dy;

            if (
              dist < minDist
            ) {

              minDist = dist;

              nearest =
                predictions[i] || 0;
            }
          }
        );

        // COLOR BLEND

        const blue =
          Math.floor(
            nearest * 255
          );

        const orange =
          Math.floor(
            (1 - nearest) * 255
          );

        ctx.fillStyle =
          `rgba(
            ${orange},
            150,
            ${blue},
            0.35
          )`;

        ctx.fillRect(
          x,
          y,
          resolution,
          resolution
        );
      }
    }

    // DRAW POINTS

    data.xs.forEach(
      (point, i) => {

        const px =
          ((point[0] + 1) / 2)
          * width;

        const py =
          ((point[1] + 1) / 2)
          * height;

        const label =
          data.ys[i];

        ctx.beginPath();

        ctx.arc(
          px,
          py,
          6,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =

          label === 1
            ? "#2563EB"
            : "#F59E0B";

        ctx.fill();

        ctx.strokeStyle =
          "#111827";

        ctx.lineWidth = 1;

        ctx.stroke();
      }
    );

  }, [data, predictions]);

  return (

    <div className="
      flex
      justify-center
    ">

      <canvas

        ref={canvasRef}

        className="
          rounded-xl
          border
          border-gray-200
          shadow-sm
        "
      />

    </div>
  );
}