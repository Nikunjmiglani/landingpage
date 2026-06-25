"use client";

import { useState } from "react";

export default function CreateJobPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    jobType: "FULL_TIME",
    experience: "FRESHER",
    salary: "",
    skills: "",
    openings: 1,
    description: "",
    deadline: "",
  });

  const createJob = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed");
        return;
      }

      alert("Job Created Successfully");

      setForm({
        company: "",
        role: "",
        location: "",
        jobType: "FULL_TIME",
        experience: "FRESHER",
        salary: "",
        skills: "",
        openings: 1,
        description: "",
        deadline: "",
      });
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEDED] p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl border shadow-sm p-8">

        <h1 className="text-3xl font-bold mb-2">
          Create New Job
        </h1>

        <p className="text-gray-500 mb-8">
          Fill in the details below to publish a new job opening.
        </p>

        <form onSubmit={createJob} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-5">

            <input
              className="border rounded-lg p-3"
              placeholder="Company Name"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Job Role"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Salary (e.g. ₹6-8 LPA)"
              value={form.salary}
              onChange={(e) =>
                setForm({ ...form, salary: e.target.value })
              }
            />

            <select
              className="border rounded-lg p-3"
              value={form.jobType}
              onChange={(e) =>
                setForm({ ...form, jobType: e.target.value })
              }
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="FREELANCE">Freelance</option>
            </select>

            <select
              className="border rounded-lg p-3"
              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
            >
              <option value="FRESHER">Fresher</option>
              <option value="ONE_TO_THREE">1–3 Years</option>
              <option value="THREE_TO_FIVE">3–5 Years</option>
              <option value="FIVE_PLUS">5+ Years</option>
            </select>

            <input
              type="number"
              className="border rounded-lg p-3"
              placeholder="Openings"
              value={form.openings}
              onChange={(e) =>
                setForm({
                  ...form,
                  openings: Number(e.target.value),
                })
              }
            />

            <input
              type="date"
              className="border rounded-lg p-3"
              value={form.deadline}
              onChange={(e) =>
                setForm({
                  ...form,
                  deadline: e.target.value,
                })
              }
            />

          </div>

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={(e) =>
              setForm({
                ...form,
                skills: e.target.value,
              })
            }
          />

          <textarea
            rows={7}
            className="w-full border rounded-lg p-3"
            placeholder="Job Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className="bg-[#FF9900] hover:bg-[#e88c00] transition px-6 py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>

        </form>

      </div>
    </div>
  );
}