// API for creating a new build
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { IBuild, IBuildGuide, IBuildGuideStep } from "@/data/Builds";
import { GuideAge } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body: IBuild = await req.json();
    const { name, author, description, gods, tags, rating, guide } = body;

    // Ensure the gods exist in the database and get their IDs
    const godIds = await Promise.all(
      gods.map(async (god) => {
        const godRecord = await prisma.god.findUnique({
          where: { name: god.name },
        });

        if (!godRecord) {
          throw new Error(`God ${god.name} not found in the database.`);
        }

        return { id: godRecord.id };
      })
    );

    // First, create the build
    const build = await prisma.build.create({
      data: {
        name,
        authorId: author, // Ensure the author ID is correct
        description,
        tags: { set: tags || [] },
        rating,
        gods: {
          connect: godIds, // Connect the build to the gods
        },
      },
    });

    // Insert guide for each age (i, ii, iii, etc.)
    for (const age in guide) {
      if (guide.hasOwnProperty(age)) {
        const steps = guide[age as keyof IBuildGuide];

        // Check if steps exist before proceeding
        if (steps && steps.length > 0) {
          // Create the guide for this age
          const buildGuide = await prisma.buildGuide.create({
            data: {
              buildId: build.id,
              age: age as keyof typeof GuideAge, // Set the age using the enum
            },
          });

          // Create each step in the guide
          await Promise.all(
            steps.map(async (step: IBuildGuideStep) => {
              await prisma.buildGuideStep.create({
                data: {
                  guideId: buildGuide.id,
                  description: step.description,
                  isNote: step.isNote,
                  time: step.time,
                  workingBuilding: step.workingBuilding,
                  workingFood: step.workingFood,
                  workingWood: step.workingWood,
                  workingGold: step.workingGold,
                  workingFavor: step.workingFavor,
                },
              });
            })
          );
        }
      }
    }

    return NextResponse.json(build, { status: 201 });
  } catch (error) {
    console.error("Error creating build:", error);
    return NextResponse.json(
      { error: "Failed to create build." },
      { status: 500 }
    );
  }
}
