"use client";

import { useState } from "react";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    company: "",
    role: "",
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
        openings: 1,
        description: "",
        deadline: "",
      });
    } catch {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#EAEDED] p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg border p-6">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <h2 className="text-xl font-semibold mb-4">
          Create New Job
        </h2>

        <form
          onSubmit={createJob}
          className="space-y-4"
        >
          <input
            className="w-full border rounded p-3"
            placeholder="Company Name"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded p-3"
            placeholder="Job Role"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="w-full border rounded p-3"
            placeholder="Openings"
            value={form.openings}
            onChange={(e) =>
              setForm({
                ...form,
                openings: Number(e.target.value),
              })
            }
          />

          <textarea
            className="w-full border rounded p-3"
            rows={5}
            placeholder="Job Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="w-full border rounded p-3"
            value={form.deadline}
            onChange={(e) =>
              setForm({
                ...form,
                deadline: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className="bg-[#FF9900] px-6 py-3 rounded font-bold"
          > 
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
}