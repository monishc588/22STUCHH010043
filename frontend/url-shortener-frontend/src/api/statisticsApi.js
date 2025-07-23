// api/statisticsApi.js
export async function getStatistics() {
  const response = await fetch('/api/statistics');
  return response.json();
}