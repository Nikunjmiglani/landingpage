import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import ApplyButton from "./ApplyButton";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    notFound();
  }

  let hasApplied = false;

  if (session?.user?.id) {
    const candidate = await prisma.candidate.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (candidate) {
      const application =
        await prisma.application.findUnique({
          where: {
            candidateId_jobId: {
              candidateId: candidate.id,
              jobId: job.id,
            },
          },
        });

      hasApplied = !!application;
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="bg-white rounded-2xl border shadow-sm p-8">

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

            <div>

              <h1 className="text-4xl font-bold text-[#131921]">
                {job.role}
              </h1>

              <p className="text-xl text-gray-500 mt-2">
                {job.company}
              </p>

            </div>

            <div>

              {job.isActive ? (
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  Hiring
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                  Closed
                </span>
              )}

            </div>

          </div>

        </div>

        {/* Overview */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-xl border p-6">

            <p className="text-sm text-gray-500">
              Openings
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {job.openings}
            </h2>

          </div>

          <div className="bg-white rounded-xl border p-6">

            <p className="text-sm text-gray-500">
              Location
            </p>

            <h2 className="text-xl font-semibold mt-2">
              {job.location || "-"}
            </h2>

          </div>

          <div className="bg-white rounded-xl border p-6">

            <p className="text-sm text-gray-500">
              Job Type
            </p>

            <h2 className="text-xl font-semibold mt-2">
              {job.jobType || "-"}
            </h2>

          </div>

          <div className="bg-white rounded-xl border p-6">

            <p className="text-sm text-gray-500">
              Salary
            </p>

            <h2 className="text-xl font-semibold mt-2">
              {job.salary || "-"}
            </h2>

          </div>

        </div>

        {/* Description */}

        <div className="bg-white rounded-xl border shadow-sm p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Job Description
          </h2>

          <p className="leading-8 whitespace-pre-wrap text-gray-700">
            {job.description || "No description provided."}
          </p>

        </div>

        {/* Skills */}

        <div className="bg-white rounded-xl border shadow-sm p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Required Skills
          </h2>

          {job.skills.length > 0 ? (

            <div className="flex flex-wrap gap-3">

              {job.skills.map((skill) => (

                <span
                  key={skill}
                  className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium"
                >
                  {skill}
                </span>

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No skills specified.
            </p>

          )}

        </div>

        {/* Additional Information */}

        <div className="bg-white rounded-xl border shadow-sm p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Additional Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <p className="text-sm text-gray-500">
                Experience
              </p>

              <p className="font-semibold mt-1">
                {job.experience || "-"}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Application Deadline
              </p>

              <p className="font-semibold mt-1">
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString()
                  : "-"}
              </p>

            </div>

          </div>

        </div>

        {/* Apply */}

        <div className="bg-white rounded-xl border shadow-sm p-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <div>

            <h2 className="text-2xl font-bold">
              Interested?
            </h2>

            <p className="text-gray-500 mt-2">
              Submit your application now.
            </p>

          </div>

          {job.isActive ? (
            <ApplyButton
              jobId={job.id}
              hasApplied={hasApplied}
            />
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-600 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Applications Closed
            </button>
          )}

        </div>

      </div>

    </div>
  );
}