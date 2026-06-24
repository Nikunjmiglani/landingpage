import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ApplyButton from "./ApplyButton";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="bg-white border rounded-lg p-8">

          <h1 className="text-4xl font-bold text-[#131921]">
            {job.role}
          </h1>

          <p className="text-xl text-[#565959] mt-2">
            {job.company}
          </p>

          <div className="mt-6 space-y-3">
            <p>
              <strong>Openings:</strong> {job.openings}
            </p>

            {job.deadline && (
              <p>
                <strong>Apply Before:</strong>{" "}
                {new Date(job.deadline).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">
              Job Description
            </h2>

            <p className="text-[#565959] whitespace-pre-wrap">
              {job.description || "No description available"}
            </p>
          </div>
<ApplyButton jobId={job.id} />

        </div>
      </div>
    </div>
  );
}