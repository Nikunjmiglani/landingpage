"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Application = {
  id: string;
  status: string;
  appliedAt: string;

  candidate: {
    id: string;
    firstName: string;
    lastName: string;
    resumeUrl: string | null;

    user: {
      email: string;
    };
  };

  job: {
    id: string;
    company: string;
    role: string;
  };
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const res = await fetch("/api/admin/applications");

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed");
        return;
      }

      setApplications(data);
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAEDED] p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold">
            Applications
          </h1>

          <p className="text-gray-500">
            Total: {applications.length}
          </p>

        </div>

        <div className="overflow-x-auto bg-white rounded-xl border shadow">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Candidate
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Company
                </th>

                <th className="text-left p-4">
                  Role
                </th>

                <th className="text-left p-4">
                  Applied
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Resume
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {applications.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="text-center py-10 text-gray-500"
                  >
                    No applications found.
                  </td>

                </tr>

              ) : (

                applications.map((application) => (

                  <tr
                    key={application.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {application.candidate.firstName}{" "}
                      {application.candidate.lastName}
                    </td>

                    <td className="p-4">
                      {application.candidate.user.email}
                    </td>

                    <td className="p-4">
                      {application.job.company}
                    </td>

                    <td className="p-4">
                      {application.job.role}
                    </td>

                    <td className="p-4">
                      {new Date(
                        application.appliedAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                        {application.status}
                      </span>

                    </td>

                    <td className="p-4">

                      {application.candidate.resumeUrl ? (

                        <a
                          href={application.candidate.resumeUrl}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>

                      ) : (

                        <span className="text-gray-400">
                          Not Uploaded
                        </span>

                      )}

                    </td>

                    <td className="p-4">

                      <Link
                        href={`/admin/applications/${application.id}`}
                        className="text-orange-600 hover:underline font-medium"
                      >
                        Open
                      </Link>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}