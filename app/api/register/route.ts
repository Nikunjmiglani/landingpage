import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, mobile, city,
      password,
      degree, branch, college, gradYear, cgpa, experience,
      jobType, locations, salary, skills,
    } = body;

    // Validate required
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    // Check duplicate
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Calculate profile score
    const fields = [firstName, lastName, email, mobile, city, degree, branch, college, gradYear, cgpa, jobType, salary];
    const filled = fields.filter(Boolean).length;
    const profileScore = Math.round((filled / fields.length) * 100);

    // Create user + candidate in one transaction
    const user = await prisma.user.create({
      data: {
        email,
        mobile: mobile || null,
        password: hashedPassword,
        role: "CANDIDATE",
        candidate: {
          create: {
            firstName,
            lastName,
            city: city || null,
            degree: degree || null,
            branch: branch || null,
            college: college || null,
            gradYear: gradYear || null,
            cgpa: cgpa || null,
            experience: experience || "fresher",
            jobType: jobType || null,
            locations: locations || [],
            salary: salary || null,
            skills: skills ? skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
            profileScore,
            status: "ONBOARDING",
          },
        },
      },
      include: { candidate: true },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      candidateId: user.candidate?.id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
