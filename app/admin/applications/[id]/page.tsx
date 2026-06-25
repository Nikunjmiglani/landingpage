"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CandidateHeader from "@/components/admin/application/CandidateHeader";
import EducationCard from "@/components/admin/application/EducationCard";
import SkillsCard from "@/components/admin/application/SkillsCard";
import JobCard from "@/components/admin/application/JobCard";
import ResumeCard from "@/components/admin/application/ResumeCard";
import RecruiterActions from "@/components/admin/application/RecruiterActions";

type Application = {
  id: string;
  status: string;
  notes: string | null;
  interviewDate: string | null;
  offerSalary: string | null;
  rejectionReason: string | null;

  candidate: {
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

    user: {
      email: string;
    };
  };

  job: {
    company: string;
    role: string;
    location: string | null;
    salary: string | null;
    jobType: string | null;
  };
};

export default function ApplicationDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [application, setApplication] =
    useState<Application | null>(null);

  const [form, setForm] = useState({
    status: "APPLIED",
    notes: "",
    interviewDate: "",
    offerSalary: "",
    rejectionReason: "",
  });

  useEffect(() => {
    fetchApplication();
  }, []);

  async function fetchApplication() {
    try {
      const res = await fetch(
        `/api/admin/applications/${id}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setApplication(data);

      setForm({
        status: data.status,
        notes: data.notes || "",
        interviewDate: data.interviewDate
          ? data.interviewDate.substring(0, 10)
          : "",
        offerSalary: data.offerSalary || "",
        rejectionReason:
          data.rejectionReason || "",
      });
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function saveApplication() {
    try {
      setSaving(true);

      const res = await fetch(
        `/api/admin/applications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Application Updated");

      fetchApplication();
    } catch {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex justify-center py-20">
        Application not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <CandidateHeader
        firstName={
          application.candidate.firstName
        }
        lastName={
          application.candidate.lastName
        }
        email={
          application.candidate.user.email
        }
        city={application.candidate.city}
        experience={
          application.candidate.experience
        }
        status={application.status}
      />

      <EducationCard
        college={
          application.candidate.college
        }
        degree={
          application.candidate.degree
        }
        branch={
          application.candidate.branch
        }
        cgpa={application.candidate.cgpa}
      />

      <SkillsCard
        skills={application.candidate.skills}
      />

      <JobCard
        company={application.job.company}
        role={application.job.role}
        location={application.job.location}
        salary={application.job.salary}
        jobType={application.job.jobType}
      />

      <ResumeCard
        resumeUrl={
          application.candidate.resumeUrl
        }
      />

      <RecruiterActions
        form={form}
        setForm={setForm}
        saveApplication={saveApplication}
        saving={saving}
      />

    </div>
  );
}