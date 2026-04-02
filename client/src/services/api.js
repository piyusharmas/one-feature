export const analyzeCareer = async (data) => {
  const res = await fetch("http://localhost:5000/api/career/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};