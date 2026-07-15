import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "WAKATIME_API_KEY not found in environment variables" }, { status: 400 });
  }

  try {
    // Fetch WakaTime stats for the last 7 days
    const response = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`WakaTime API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
