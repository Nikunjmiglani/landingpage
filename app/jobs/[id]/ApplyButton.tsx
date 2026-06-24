"use client";

import { useState } from "react";

export default function ApplyButton({
  jobId,
}: {
  jobId: string;
}) {
  const [loading, setLoading] = useState(false);

  const apply = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed");
        return;
      }

      alert("Application submitted successfully");
    } catch {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={apply}
      disabled={loading}
      className="mt-8 bg-[#FF9900] px-6 py-3 rounded font-bold"
    >
      {loading ? "Applying..." : "Apply Now"}
    </button>
  );
}