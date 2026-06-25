"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CandidateHeader from "@/components/admin/application/CandidateHeader";
import EducationCard from "@/components/admin/application/EducationCard";
import SkillsCard from "@/components/admin/application/SkillsCard";
import ResumeCard from "@/components/admin/application/ResumeCard";

type Candidate = {
  id: string;

  firstName: string;
  lastName: string;

  city: string | null;

  degree: string | null;
  branch: string | null;
  college: string | null;
  cgpa: string | null;

  experience: string;

  skills: string[];

  resumeUrl: string | null;

  status: string;

  user: {
    email: string;
  };

  applications: {
    id: string;

    status: string;

    appliedAt: string;

    job: {
      company: string;
      role: string;
      isActive: boolean;
    };
  }[];

  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
};

export default function CandidateDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [candidate, setCandidate] =
    useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidate();
  }, []);

  async function fetchCandidate() {
    try {
      const res = await fetch(
        `/api/admin/candidates/${id}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setCandidate(data);
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading Candidate...
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex justify-center py-20">
        Candidate not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <CandidateHeader
        firstName={candidate.firstName}
        lastName={candidate.lastName}
        email={candidate.user.email}
        city={candidate.city}
        experience={candidate.experience}
        status={candidate.status}
      />

      <EducationCard
        college={candidate.college}
        degree={candidate.degree}
        branch={candidate.branch}
        cgpa={candidate.cgpa}
      />

      <SkillsCard
        skills={candidate.skills}
      />

      <ResumeCard
        resumeUrl={candidate.resumeUrl}
      />

      {/* Applications */}

      <div className="bg-white rounded-xl border p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Applications
        </h2>

        {candidate.applications.length === 0 ? (

          <p className="text-gray-500">
            No applications yet.
          </p>

        ) : (

          <div className="space-y-4">

            {candidate.applications.map(
              (application) => (

                <div
                  key={application.id}
                  className="border rounded-lg p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-semibold">
                      {application.job.role}
                    </h3>

                    <p className="text-gray-500">
                      {application.job.company}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Applied on{" "}
                      {new Date(
                        application.appliedAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {application.status.replaceAll(
                      "_",
                      " "
                    )}
                  </span>

                </div>

              )
            )}

          </div>

        )}

      </div>

      {/* Documents */}

      <div className="bg-white rounded-xl border p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Documents
        </h2>

        {candidate.documents.length === 0 ? (

          <p className="text-gray-500">
            No documents uploaded.
          </p>

        ) : (

          <div className="space-y-3">

            {candidate.documents.map(
              (document) => (

                <a
                  key={document.id}
                  href={document.url}
                  target="_blank"
                  className="flex justify-between border rounded-lg p-4 hover:bg-gray-50"
                >

                  <div>

                    <p className="font-medium">
                      {document.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {document.type}
                    </p>

                  </div>

                  <span className="text-blue-600 font-medium">
                    View
                  </span>

                </a>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}