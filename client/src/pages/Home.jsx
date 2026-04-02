import { useState } from "react";
import { analyzeCareer } from "../services/api";
import Dashboard from "./DashBoard";  

export default function Home() {
  const [skills, setSkills] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      skills: skills.split(",").map((s) => s.trim()),
      careerGoal,
    };

    const res = await analyzeCareer(data);

    setResult(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center p-6">
      
      <h1 className="text-4xl font-bold mb-2">
        🚀 AI Career Guide
      </h1>
      <p className="text-gray-400 mb-8">
        Turn your skills into a career roadmap
      </p>

      <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-xl">
        
        <input
          type="text"
          placeholder="Enter skills (e.g. JavaScript, DSA)"
          className="w-full p-3 border rounded-lg mb-4"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          type="text"
          placeholder="Career goal (e.g. software_engineer)"
          className="w-full p-3 border rounded-lg mb-4"
          value={careerGoal}
          onChange={(e) => setCareerGoal(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white p-3 rounded-lg hover:opacity-80 transition"
        >
          Analyze My Career
        </button>
      </div>

      {loading && (
        <div className="mt-6 text-lg animate-pulse">
          🤖 Analyzing your future...
        </div>
      )}

      {result && <Dashboard data={result} />}
    </div>
  );
}