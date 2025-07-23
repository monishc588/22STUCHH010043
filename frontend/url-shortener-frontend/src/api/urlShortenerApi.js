// api/urlShortenerApi.js
export async function shortenUrls(urls) {
  // Replace with your backend endpoint
  const response = await fetch('/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urls }),
  });
  return response.json();
}