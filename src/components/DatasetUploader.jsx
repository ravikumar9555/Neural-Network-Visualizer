import Papa from "papaparse";

export default function DatasetUploader({

  setData,

}) {

  // HANDLE FILE

  const handleFile =
    (event) => {

      const file =
        event.target.files[0];

      if (!file) return;

      Papa.parse(file, {

        header: true,

        dynamicTyping: true,

        complete: (results) => {

          const rows =
            results.data;

          // CONVERT CSV

          const xs = [];
          const ys = [];

          rows.forEach((row) => {

            const values =
              Object.values(row);

            // LAST COLUMN = LABEL

            const features =
              values.slice(
                0,
                values.length - 1
              );

            const label =
              values[
                values.length - 1
              ];

            // VALIDATION

            if (

              features.every(
                (v) =>
                  typeof v ===
                  "number"
              ) &&

              typeof label ===
                "number"
            ) {

              xs.push(features);

              ys.push(label);
            }
          });

          // SET DATA

          setData({

            xs,
            ys,
          });
        },
      });
    };

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      p-4
    ">

      <h2 className="
        text-xl
        font-bold
        mb-4
        text-gray-700
      ">
        Upload Dataset
      </h2>

      <label
        className="
          flex
          flex-col
          items-center
          justify-center
          border-2
          border-dashed
          border-gray-300
          rounded-xl
          h-40
          cursor-pointer
          hover:border-blue-400
          transition-all
        "
      >

        <span className="
          text-gray-500
        ">
          Upload CSV File
        </span>

        <input

          type="file"

          accept=".csv"

          className="hidden"

          onChange={handleFile}
        />

      </label>

      {/* CSV FORMAT */}

      <div className="
        mt-4
        text-sm
        text-gray-500
      ">

        <p className="
          font-semibold
          mb-1
        ">
          CSV Format:
        </p>

        <pre className="
          bg-gray-100
          p-2
          rounded-lg
          overflow-x-auto
        ">
{`x1,x2,label
0.2,0.3,1
0.5,0.8,0`}
        </pre>

      </div>

    </div>
  );
}