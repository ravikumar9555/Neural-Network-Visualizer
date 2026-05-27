import {
  useEffect,
  useRef,
} from "react";

export default function DatasetCanvas({

  data,

  predictions,

  problemType,

}) {

  const canvasRef =
    useRef(null);

  useEffect(() => {

    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    // RETINA DISPLAY

    const size = 340;

    const dpr =
      window.devicePixelRatio || 1;

    canvas.width =
      size * dpr;

    canvas.height =
      size * dpr;

    canvas.style.width =
      `${size}px`;

    canvas.style.height =
      `${size}px`;

    ctx.scale(dpr, dpr);

    const width = size;
    const height = size;

    // ADAPTIVE RESOLUTION

    const resolution =

      data.xs.length > 500

        ? 12

        : 7;

    // RENDER

    const render = () => {

      // CLEAR

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      // BACKGROUND

      const bg =
        ctx.createLinearGradient(
          0,
          0,
          width,
          height
        );

      bg.addColorStop(
        0,
        "#F8FAFC"
      );

      bg.addColorStop(
        1,
        "#E2E8F0"
      );

      ctx.fillStyle = bg;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      // HEATMAP

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

          const nx =
            (x / width) * 2 - 1;

          const ny =
            (y / height) * 2 - 1;

          // NEAREST PREDICTION

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
                dx * dx +
                dy * dy;

              if (
                dist < minDist
              ) {

                minDist = dist;

                nearest =
                  predictions[i] || 0;
              }
            }
          );

          // CLASSIFICATION

          if (
            problemType ===
            "classification"
          ) {

            const blue =
              Math.floor(
                nearest * 255
              );

            const orange =
              Math.floor(
                (
                  1 - nearest
                ) * 255
              );

            ctx.fillStyle =
              `rgba(
                ${orange},
                170,
                ${blue},
                0.28
              )`;
          }

          // REGRESSION

          else {

            const normalized =

              Math.max(
                0,
                Math.min(
                  1,
                  (
                    nearest + 2
                  ) / 4
                )
              );

            const red =
              Math.floor(
                normalized * 255
              );

            const blue =
              Math.floor(
                (
                  1 -
                  normalized
                ) * 255
              );

            ctx.fillStyle =
              `rgba(
                ${red},
                120,
                ${blue},
                0.30
              )`;
          }

          ctx.fillRect(

            x,
            y,

            resolution,
            resolution
          );
        }
      }

      // GRID

      ctx.strokeStyle =
        "rgba(148,163,184,0.15)";

      ctx.lineWidth = 1;

      for (
        let i = 0;
        i <= width;
        i += 34
      ) {

        ctx.beginPath();

        ctx.moveTo(i, 0);

        ctx.lineTo(i, height);

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(0, i);

        ctx.lineTo(width, i);

        ctx.stroke();
      }

      // DRAW DATA POINTS

      data.xs.forEach(
        (point, i) => {

          const px =
            (
              (point[0] + 1) / 2
            ) * width;

          const py =
            (
              (point[1] + 1) / 2
            ) * height;

          const label =
            data.ys[i];

          // OUTER GLOW

          ctx.beginPath();

          ctx.arc(
            px,
            py,
            10,
            0,
            Math.PI * 2
          );

          if (
            problemType ===
            "classification"
          ) {

            ctx.fillStyle =

              label === 1

                ? "rgba(37,99,235,0.15)"

                : "rgba(245,158,11,0.15)";
          }

          else {

            ctx.fillStyle =
              "rgba(99,102,241,0.15)";
          }

          ctx.fill();

          // MAIN POINT

          ctx.beginPath();

          ctx.arc(
            px,
            py,
            5,
            0,
            Math.PI * 2
          );

          // CLASSIFICATION

          if (
            problemType ===
            "classification"
          ) {

            ctx.fillStyle =

              label === 1

                ? "#2563EB"

                : "#F59E0B";
          }

          // REGRESSION

          else {

            const normalized =

              Math.max(
                0,
                Math.min(
                  1,
                  (
                    label + 2
                  ) / 4
                )
              );

            const red =
              Math.floor(
                normalized * 255
              );

            const blue =
              Math.floor(
                (
                  1 -
                  normalized
                ) * 255
              );

            ctx.fillStyle =
              `rgb(
                ${red},
                120,
                ${blue}
              )`;
          }

          ctx.shadowBlur = 15;

          ctx.shadowColor =
            ctx.fillStyle;

          ctx.fill();

          ctx.shadowBlur = 0;

          // BORDER

          ctx.strokeStyle =
            "#0F172A";

          ctx.lineWidth = 1.2;

          ctx.stroke();
        }
      );

      // BORDER

      ctx.strokeStyle =
        "#CBD5E1";

      ctx.lineWidth = 1;

      ctx.strokeRect(
        0,
        0,
        width,
        height
      );
    };

    // RAF

    const frame =
      requestAnimationFrame(
        render
      );

    return () => {

      cancelAnimationFrame(
        frame
      );
    };

  }, [

    data,

    predictions,

    problemType,
  ]);

  return (

    <div className="
      flex
      justify-center
      items-center
    ">

      <canvas

        ref={canvasRef}

        className="
          rounded-2xl
          shadow-sm
          bg-white
        "
      />

    </div>
  );
}