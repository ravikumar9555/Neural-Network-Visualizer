export default function ControlPanel({ onTrain }) {

  return (
    <div className="bg-slate-800 p-4 rounded-2xl">

      <h2 className="text-2xl mb-4 font-bold">
        Controls
      </h2>

      <button
        onClick={onTrain}
        className="bg-blue-500 px-4 py-2 rounded-xl w-full"
      >
        Train Model
      </button>

    </div>
  );
}