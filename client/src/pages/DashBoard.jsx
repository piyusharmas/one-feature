export default function Dashboard({ data }) {
  return (
    <div className="mt-10 w-full max-w-4xl">

      {/* Match Score Card */}
      <div className="bg-white text-black p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-bold mb-2">🎯 Match Score</h2>
        <p className="text-3xl font-bold">{data.matchScore}%</p>

        <div className="w-full bg-gray-200 h-3 rounded mt-3">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${data.matchScore}%` }}
          />
        </div>
      </div>

      {/* Skills + Market */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white text-black p-6 rounded-2xl shadow">
          <h3 className="font-bold mb-2">⚠️ Missing Skills</h3>
          <ul className="list-disc ml-5">
            {data.missingSkills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white text-black p-6 rounded-2xl shadow">
          <h3 className="font-bold mb-2">📈 Market Insights</h3>
          <p>Demand: {data.demand}</p>
          <p>Growth: {data.growth}</p>
        </div>
      </div>

      {/* Roadmap */}
      <div className="bg-white text-black p-6 rounded-2xl shadow mt-6">
        <h3 className="text-xl font-bold mb-4">🧭 Career Roadmap</h3>

        {Object.entries(data.roadmap).map(([phase, steps]) => (
          <div key={phase} className="mb-4">
            <h4 className="font-semibold capitalize">{phase}</h4>
            <ul className="list-disc ml-5">
              {steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="bg-white text-black p-6 rounded-2xl shadow mt-6">
        <h3 className="text-xl font-bold mb-2">🧠 AI Insights</h3>
        <p>{data.insights}</p>
      </div>

    </div>
  );
}