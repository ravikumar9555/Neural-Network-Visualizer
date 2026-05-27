export default function NeuralNetwork() {

  const inputNodes = [1, 2];
  const hiddenNodes = [1, 2, 3, 4];
  const outputNodes = [1];

  return (
    <div className="bg-slate-800 p-6 rounded-2xl h-[600px]">

      <h2 className="text-2xl font-bold mb-6">
        Neural Network
      </h2>

      <div className="flex justify-around items-center h-full">

        {/* Input Layer */}
        <div className="space-y-6">
          {inputNodes.map((n) => (
            <div
              key={n}
              className="w-16 h-16 rounded-full bg-blue-400"
            />
          ))}
        </div>

        {/* Hidden Layer */}
        <div className="space-y-6">
          {hiddenNodes.map((n) => (
            <div
              key={n}
              className="w-16 h-16 rounded-full bg-green-400"
            />
          ))}
        </div>

        {/* Output Layer */}
        <div className="space-y-6">
          {outputNodes.map((n) => (
            <div
              key={n}
              className="w-16 h-16 rounded-full bg-red-400"
            />
          ))}
        </div>

      </div>
    </div>
  );
}