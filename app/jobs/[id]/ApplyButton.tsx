"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ApplyButtonProps = {
  jobId: string;
  hasApplied: boolean;
};

export default function ApplyButton({
  jobId,
  hasApplied,
}: ApplyButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(hasApplied);

  async function apply() {
    if (loading || applied) return;

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

      if (res.status === 401) {
        alert("Please login to continue.");
        router.push("/login");
        return;
      }

      if (res.status === 400) {
        if (
          data.error?.toLowerCase().includes("already")
        ) {
          setApplied(true);
          alert("You have already applied for this job.");
          return;
        }

        alert(data.error || "Unable to apply.");
        return;
      }

      if (!res.ok) {
        alert(data.error || "Failed to submit application.");
        return;
      }

      setApplied(true);

      alert("Application submitted successfully!");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (applied) {
    return (
      <button
        disabled
        className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold cursor-default"
      >
        ✓ Already Applied
      </button>
    );
  }

  return (
    <button
      onClick={apply}
      disabled={loading}
      className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
        loading
          ? "bg-orange-400 cursor-not-allowed"
          : "bg-[#FF9900] hover:bg-[#e68a00]"
      }`}
    >
      {loading ? "Applying..." : "Apply Now"}
    </button>
  );
}