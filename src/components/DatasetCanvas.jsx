export default function DatasetCanvas({
  data,
  predictions,
}) {

  return (
    <div className="bg-slate-800 p-4 rounded-2xl mb-4">

      <h2 className="text-xl font-bold mb-4">
        Dataset
      </h2>

      <div className="grid grid-cols-20 gap-1">

        {data.xs.map((point, index) => {

          const pred = predictions[index];

          return (
            <div
              key={index}
              className="w-4 h-4 rounded-full"
              style={{
                background:
                  pred > 0.5
                    ? "#3b82f6"
                    : "#f97316",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}