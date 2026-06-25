"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

type Job = {
  id: string;
  company: string;
  role: string;
  openings: number;
  description?: string;
  deadline?: string | null;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();

        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const value = search.toLowerCase();

    return jobs.filter(
      (job) =>
        job.company.toLowerCase().includes(value) ||
        job.role.toLowerCase().includes(value)
    );
  }, [jobs, search]);

  return (
    <div className="min-h-screen bg-[#F5F6F8]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Hero */}

        <div className="bg-white rounded-2xl border shadow-sm p-8">

          <h1 className="text-4xl font-bold text-[#131921]">
            Find Your Next Opportunity
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Browse the latest openings from our hiring partners.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-orange-50 rounded-xl p-6">

              <p className="text-gray-500">
                Total Jobs
              </p>

              <h2 className="text-3xl font-bold mt-2 text-[#FF9900]">
                {jobs.length}
              </h2>

            </div>

            <div className="bg-green-50 rounded-xl p-6">

              <p className="text-gray-500">
                Open Positions
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">
                {jobs.reduce(
                  (sum, job) => sum + job.openings,
                  0
                )}
              </h2>

            </div>

            <div className="bg-blue-50 rounded-xl p-6">

              <p className="text-gray-500">
                Hiring Companies
              </p>

              <h2 className="text-3xl font-bold mt-2 text-blue-600">
                {
                  new Set(
                    jobs.map((job) => job.company)
                  ).size
                }
              </h2>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-xl border p-5">

          <input
            type="text"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-[#FF9900]"
          />

        </div>

        {/* Jobs */}

        {loading ? (

          <div className="text-center py-20 text-lg font-medium">
            Loading jobs...
          </div>

        ) : filteredJobs.length === 0 ? (

          <div className="bg-white rounded-xl border p-10 text-center">

            <h2 className="text-xl font-semibold">
              No jobs found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredJobs.map((job) => (

              <div
                key={job.id}
                className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-lg transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-xl font-bold text-[#131921]">
                      {job.role}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {job.company}
                    </p>

                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {job.openings} Open
                  </span>

                </div>

                {job.description && (

                  <p className="mt-5 text-gray-600 line-clamp-3">
                    {job.description}
                  </p>

                )}

                <div className="flex justify-between items-center mt-6">

                  <div>

                    <p className="text-sm text-gray-500">
                      Deadline
                    </p>

                    <p className="font-medium">
                      {job.deadline
                        ? new Date(
                            job.deadline
                          ).toLocaleDateString()
                        : "-"}
                    </p>

                  </div>

                  <Link
                    href={`/jobs/${job.id}`}
                    className="bg-[#FF9900] hover:bg-[#e88d00] text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    View
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}