import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const candidate = await prisma.candidate.findUnique({
    where: { userId: session.user.id },
    include: {
      applications: {
        include: { job: true },
        orderBy: { appliedAt: "desc" },
      },
      documents: { orderBy: { uploadedAt: "desc" } },
    },
  });

  if (!candidate) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }

  return NextResponse.json(candidate);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Recalculate profile score
  const candidate = await prisma.candidate.findUnique({
    where: { userId: session.user.id },
  });
  if (!candidate) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const merged = { ...candidate, ...body };
  const fields = [merged.firstName, merged.lastName, merged.city, merged.degree, merged.branch, merged.college, merged.gradYear, merged.cgpa, merged.jobType, merged.salary];
  const filled = fields.filter(Boolean).length;
  const profileScore = Math.round((filled / fields.length) * 100);

  const updated = await prisma.candidate.update({
    where: { userId: session.user.id },
    data: { ...body, profileScore },
  });

  return NextResponse.json(updated);
}
