import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { eventName, variant, userId } = await req.json();

    if (!eventName || !variant || !userId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        eventName,
        variant,
        userId: String(userId),
      },
    });

    return NextResponse.json({ success: true, id: event.id });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// @AGENT_MODIFIED: 2026-04-20T22:45:00Z | Agent 4 | Reason: Added telemetry endpoint for Agent 5 | Tag: #telemetry #analytics
