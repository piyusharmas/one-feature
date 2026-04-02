import { matchSkills } from "../services/skillMatcher.js";
import { generateRoadmap } from "../services/aiService.js";
import { loadJSON } from "../utils/loadData.js";
const careers = loadJSON("../data/careers.json");

export const analyzeCareer = async (req, res) => {
  try {
    const { skills, careerGoal } = req.body;

    const careerData = careers[careerGoal];

    if (!careerData) {
      return res.status(404).json({ message: "Career not found" });
    }

    // Step 1: Match Skills
    const { matchScore, missingSkills } = matchSkills(
      skills,
      careerData.skills
    );

    // Step 2: Generate AI Roadmap
    const roadmapData = await generateRoadmap({
      skills,
      careerGoal,
      missingSkills,
    });

    res.json({
      matchScore,
      missingSkills,
      demand: careerData.demand,
      growth: careerData.growth,
      roadmap: roadmapData.roadmap,
      insights: roadmapData.insights,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};