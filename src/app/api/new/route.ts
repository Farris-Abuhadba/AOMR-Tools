// API for creating a new build

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const newBuild = await req.json();
    console.log(newBuild);

    const createBuild = await prisma.build.create({
      data: {
        name: newBuild.name,
        author: newBuild.author,
        god: newBuild.god,
        guide: newBuild.guide,
      },
    });

    return NextResponse.json({
      message: "Build created successfully",
      createBuild,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create build" },
      { status: 500 }
    );
  }
}
