export default async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response('Token parameter is required', { status: 400 });
  }

  const response = await fetch(`https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/grant`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${btoa(`${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Pages CMS'
    },
    body: JSON.stringify({
      access_token: token
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error revoking access token: ${response.statusText}. GitHub says: ${errorText}`);
  }

  return new Response('Token revoked', { status: 200 });
}