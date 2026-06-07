import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    totalCandidates,
    placedThisMonth,
    activeApplications,
    onboarding,
    interviewStage,
    offerReceived,
  ] = await Promise.all([
    prisma.candidate.count(),
    prisma.candidate.count({
      where: {
        status: "PLACED",
        updatedAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
    prisma.application.count({
      where: { status: { not: "PLACED" } },
    }),
    prisma.candidate.count({ where: { status: "ONBOARDING" } }),
    prisma.candidate.count({ where: { status: "INTERVIEW_STAGE" } }),
    prisma.candidate.count({ where: { status: "OFFER_RECEIVED" } }),
  ]);

  const placementRate = totalCandidates > 0
    ? Math.round((placedThisMonth / totalCandidates) * 100)
    : 0;

  return NextResponse.json({
    totalCandidates,
    placedThisMonth,
    activeApplications,
    placementRate,
    breakdown: { onboarding, interviewStage, offerReceived },
  });
}
