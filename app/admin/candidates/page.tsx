"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Candidate = {
  id: string;
  firstName: string;
  lastName: string;
  city: string | null;
  degree: string | null;
  college: string | null;
  resumeUrl: string | null;

  user: {
    email: string;
  };

  _count: {
    applications: number;
  };
};

export default function CandidatesPage() {
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCandidates();
  }, []);

  async function fetchCandidates() {
    try {
      const res = await fetch("/api/admin/candidates");

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to fetch candidates");
        return;
      }

      setCandidates(data.candidates);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const value = search.toLowerCase();

    return candidates.filter((candidate) => {
      return (
        candidate.firstName.toLowerCase().includes(value) ||
        candidate.lastName.toLowerCase().includes(value) ||
        candidate.user.email.toLowerCase().includes(value)
      );
    });
  }, [search, candidates]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading Candidates...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Candidates
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all onboarded candidates.
          </p>

        </div>

        <div className="bg-white rounded-xl border px-6 py-4">

          <p className="text-gray-500">
            Total Candidates
          </p>

          <h2 className="text-3xl font-bold">
            {total}
          </h2>

        </div>

      </div>

      <input
        placeholder="Search candidates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 bg-white"
      />

      <div className="bg-white rounded-xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Candidate
              </th>

              <th className="text-left p-4">
                City
              </th>

              <th className="text-left p-4">
                Degree
              </th>

              <th className="text-left p-4">
                Resume
              </th>

              <th className="text-left p-4">
                Applications
              </th>

              <th className="text-center p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-12 text-gray-500"
                >
                  No candidates found.
                </td>

              </tr>

            ) : (

              filtered.map((candidate) => (

                <tr
                  key={candidate.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">

                    <div>

                      <p className="font-semibold">
                        {candidate.firstName}{" "}
                        {candidate.lastName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {candidate.user.email}
                      </p>

                    </div>

                  </td>

                  <td className="p-4">
                    {candidate.city || "-"}
                  </td>

                  <td className="p-4">
                    {candidate.degree || "-"}
                  </td>

                  <td className="p-4">

                    {candidate.resumeUrl ? (

                      <span className="text-green-600 font-medium">
                        Uploaded
                      </span>

                    ) : (

                      <span className="text-red-600 font-medium">
                        Missing
                      </span>

                    )}

                  </td>

                  <td className="p-4">
                    {candidate._count.applications}
                  </td>

                  <td className="p-4 text-center">

                    <Link
                      href={`/admin/candidates/${candidate.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>

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