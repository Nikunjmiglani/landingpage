"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Job = {
  id: string;
  company: string;
  role: string;
  openings: number;
  deadline: string | null;
  isActive: boolean;
  _count: {
    applications: number;
  };
};

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await fetch("/api/admin/jobs");

      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  async function deleteJob(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/jobs/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to delete job");
        return;
      }

      setJobs((prev) => prev.filter((job) => job.id !== id));

      alert("Job deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  async function toggleJob(id: string) {
    try {
      const res = await fetch(
        `/api/admin/jobs/${id}/toggle`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed");
        return;
      }

      fetchJobs();

      alert(
        `Job ${
          data.isActive
            ? "activated"
            : "deactivated"
        } successfully`
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const value = search.toLowerCase();

      return (
        job.company
          .toLowerCase()
          .includes(value) ||
        job.role
          .toLowerCase()
          .includes(value)
      );
    });
  }, [jobs, search]);

  const activeJobs = jobs.filter(
    (job) => job.isActive
  ).length;

  const totalApplications = jobs.reduce(
    (acc, job) =>
      acc + job._count.applications,
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg font-semibold">
          Loading Jobs...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Jobs
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all job postings.
          </p>

        </div>

        <Link
          href="/admin/jobs/create"
          className="bg-[#FF9900] hover:bg-[#e58b00] text-white px-5 py-3 rounded-lg font-semibold"
        >
          + Create Job
        </Link>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-xl p-6">

          <p className="text-gray-500">
            Total Jobs
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {jobs.length}
          </h2>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <p className="text-gray-500">
            Active Jobs
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {activeJobs}
          </h2>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <p className="text-gray-500">
            Applications
          </p>

          <h2 className="text-3xl font-bold mt-2 text-blue-600">
            {totalApplications}
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white border rounded-xl p-5">

        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Openings
              </th>

              <th className="p-4 text-left">
                Applications
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredJobs.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-16 text-gray-500"
                >
                  No jobs found.
                </td>

              </tr>

            ) : (

              filteredJobs.map((job) => (

                <tr
                  key={job.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {job.company}
                  </td>

                  <td className="p-4">
                    {job.role}
                  </td>

                  <td className="p-4">
                    {job.openings}
                  </td>

                  <td className="p-4">
                    {job._count.applications}
                  </td>

                  <td className="p-4">

                    {job.isActive ? (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>

                    ) : (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        Closed
                      </span>

                    )}

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-6">

                      <Link
                        href={`/admin/jobs/${job.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          toggleJob(job.id)
                        }
                        className="text-orange-600 hover:underline"
                      >
                        {job.isActive
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                      <button
                        onClick={() =>
                          deleteJob(job.id)
                        }
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}