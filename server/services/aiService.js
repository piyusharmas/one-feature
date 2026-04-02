import { groq } from "../config/groq.js";

export const generateRoadmap = async ({
  skills,
  careerGoal,
  missingSkills,
}) => {
  try {
    const prompt = `
You are an AI career advisor.

User Skills: ${skills.join(", ")}
Target Career: ${careerGoal}
Missing Skills: ${missingSkills.join(", ")}

Task:
1. Create a 3-phase roadmap (Phase 1, Phase 2, Phase 3)
2. Each phase should have 3-5 actionable steps
3. Give a short personalized insight

Return ONLY in JSON format:

{
  "roadmap": {
    "phase1": [],
    "phase2": [],
    "phase3": []
  },
  "insights": ""
}
`;

    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192", // fast + powerful
      messages: [
        {
            role: "system",
            content: "You are a strict AI career advisor who outputs only JSON.",
        },
        {
            role: "user",
            content: prompt,
        },
     ],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;

    // Convert string → JSON
    const cleanText = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanText);

    return parsed;
  } catch (error) {
    console.error("AI Error:", error);

    return {
      roadmap: {
        phase1: ["Learn fundamentals"],
        phase2: ["Build projects"],
        phase3: ["Apply for jobs"],
      },
      insights: "AI could not generate detailed roadmap.",
    };
  }
};