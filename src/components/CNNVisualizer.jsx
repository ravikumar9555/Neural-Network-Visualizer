import { useState, useRef } from "react";

export default function CNNVisualizer() {

  const [image, setImage] =
    useState(null);

  const canvasRef =
    useRef();

  const filterCanvasRef =
    useRef();

  const handleUpload = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setImage(imageUrl);

    const img = new Image();

    img.src = imageUrl;

    img.onload = () => {

      const canvas =
        canvasRef.current;

      const ctx =
        canvas.getContext("2d");

      canvas.width = 256;
      canvas.height = 256;

      ctx.drawImage(
        img,
        0,
        0,
        256,
        256
      );

      applyConvolution();
    };
  };

  // SIMPLE EDGE FILTER

  const applyConvolution = () => {

    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    const imageData =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

    const pixels =
      imageData.data;

    const outputCanvas =
      filterCanvasRef.current;

    const outputCtx =
      outputCanvas.getContext("2d");

    outputCanvas.width = 256;
    outputCanvas.height = 256;

    const outputImage =
      outputCtx.createImageData(
        canvas.width,
        canvas.height
      );

    const outputPixels =
      outputImage.data;

    // EDGE DETECTION KERNEL

    const kernel = [

      -1, -1, -1,
      -1,  8, -1,
      -1, -1, -1,
    ];

    for (
      let y = 1;
      y < canvas.height - 1;
      y++
    ) {

      for (
        let x = 1;
        x < canvas.width - 1;
        x++
      ) {

        let sum = 0;

        for (
          let ky = -1;
          ky <= 1;
          ky++
        ) {

          for (
            let kx = -1;
            kx <= 1;
            kx++
          ) {

            const px =
              ((y + ky)
                * canvas.width
                + (x + kx))
              * 4;

            const weight =
              kernel[
                (ky + 1) * 3 + (kx + 1)
              ];

            sum +=
              pixels[px] * weight;
          }
        }

        const outputIndex =
          (y * canvas.width + x) * 4;

        outputPixels[
          outputIndex
        ] = sum;

        outputPixels[
          outputIndex + 1
        ] = sum;

        outputPixels[
          outputIndex + 2
        ] = sum;

        outputPixels[
          outputIndex + 3
        ] = 255;
      }
    }

    outputCtx.putImageData(
      outputImage,
      0,
      0
    );
  };

  return (

    <div className="bg-slate-800 p-4 rounded-2xl mt-4">

      <h2 className="text-2xl font-bold mb-4">
        CNN Visualizer
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      <div className="grid grid-cols-2 gap-4">

        <div>

          <h3 className="mb-2">
            Original
          </h3>

          <canvas
            ref={canvasRef}
            className="rounded-xl bg-black"
          />

        </div>

        <div>

          <h3 className="mb-2">
            Edge Detection Filter
          </h3>

          <canvas
            ref={filterCanvasRef}
            className="rounded-xl bg-black"
          />

        </div>

      </div>

    </div>
  );
}