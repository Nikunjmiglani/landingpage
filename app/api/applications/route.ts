import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { jobId } = await req.json();

    const candidate = await prisma.candidate.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate profile not found" },
        { status: 404 }
      );
    }

    const existing = await prisma.application.findFirst({
      where: {
        candidateId: candidate.id,
        jobId,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Already applied" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        candidateId: candidate.id,
        jobId,
      },
    });

    return NextResponse.json(application);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to apply" },
      { status: 500 }
    );
  }
}