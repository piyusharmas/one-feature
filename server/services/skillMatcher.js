export const matchSkills = (userSkills, requiredSkills) => {
  const normalizedUserSkills = userSkills.map((s) => s.toLowerCase());

  const matched = requiredSkills.filter((skill) =>
    normalizedUserSkills.includes(skill.toLowerCase())
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !normalizedUserSkills.includes(skill.toLowerCase())
  );

  const matchScore = Math.round(
    (matched.length / requiredSkills.length) * 100
  );

  return { matchScore, missingSkills };
};