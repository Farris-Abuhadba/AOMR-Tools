// API to get all builds by god name

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const god = searchParams.get("god");

  if (!god) {
    return NextResponse.json(
      { error: "God name is required" },
      { status: 400 }
    );
  }

  try {
    const builds = await prisma.build.findMany({
      where: {
        god: god,
      },
    });

    if (builds.length === 0) {
      return NextResponse.json(
        { error: `No builds found for ${god}` },
        { status: 404 }
      );
    }

    return NextResponse.json(builds);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch builds" },
      { status: 500 }
    );
  }
}
