import { NextResponse } from 'next/server';

export async function GET() {
  const umamiToken = process.env.UMAMI_API_TOKEN;
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  const umamiUrl = process.env.UMAMI_URL || 'https://api.umami.is/v1';

  if (!umamiToken || !websiteId) {
    return NextResponse.json({ error: "UMAMI_API_TOKEN or UMAMI_WEBSITE_ID not found in environment variables" }, { status: 400 });
  }

  try {
    const endAt = Date.now();
    const startAt = endAt - 30 * 24 * 60 * 60 * 1000; // Last 30 days

    // Fetch Umami stats
    const response = await fetch(`${umamiUrl}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`, {
      headers: {
        Authorization: `Bearer ${umamiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Umami API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
