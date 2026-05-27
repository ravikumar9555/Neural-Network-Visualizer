export default function ControlPanel() {
  return (
    <div className="bg-slate-800 p-4 rounded-2xl">

      <h2 className="text-2xl mb-4 font-bold">
        Controls
      </h2>

      <div className="space-y-4">

        <button className="bg-blue-500 px-4 py-2 rounded-xl w-full">
          Train Model
        </button>

        <div>
          <label>Learning Rate</label>

          <input
            type="range"
            min="0.001"
            max="1"
            step="0.001"
            className="w-full"
          />
        </div>

        <div>
          <label>Activation</label>

          <select className="w-full text-black p-2 rounded">
            <option>relu</option>
            <option>sigmoid</option>
            <option>tanh</option>
          </select>
        </div>

      </div>
    </div>
  );
}