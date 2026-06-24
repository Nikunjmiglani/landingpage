"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

type Job = {
  id: string;
  company: string;
  role: string;
  openings: number;
  description?: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
  console.log(data);

  setJobs(Array.isArray(data) ? data : []);
  setLoading(false);
})
.catch((err) => {
  console.error(err);
  setJobs([]);
  setLoading(false);
});
  }, []);

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-[#131921]">
          Available Jobs
        </h1>

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-6 rounded border">
            No jobs available currently.
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border rounded p-5 shadow-sm"
              >
                <h2 className="text-xl font-bold text-[#131921]">
                  {job.role}
                </h2>

                <p className="text-[#565959] mt-1">
                  {job.company}
                </p>

                <p className="text-sm mt-2">
                  Openings: {job.openings}
                </p>

                {job.description && (
                  <p className="mt-3 text-sm text-[#565959]">
                    {job.description}
                  </p>
                )}

                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-block mt-4 bg-[#FF9900] px-4 py-2 rounded font-semibold"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}