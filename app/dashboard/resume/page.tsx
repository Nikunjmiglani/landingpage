"use client";

import { useEffect, useRef, useState } from "react";

export default function ResumePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const [resumeUrl, setResumeUrl] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  async function fetchResume() {
    try {
      const res = await fetch("/api/candidate/resume");

      const data = await res.json();

      if (res.ok) {
        setResumeUrl(data.resumeUrl || "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadResume(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      setUploading(true);

      const res = await fetch(
        "/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setResumeUrl(data.url);

      alert("Resume uploaded successfully.");
    } catch {
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function deleteResume() {
    if (
      !confirm(
        "Delete current resume?"
      )
    )
      return;

    const res = await fetch(
      "/api/candidate/resume",
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setResumeUrl("");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Resume
        </h1>

        <p className="text-gray-500 mt-2">
          Upload your latest resume.
        </p>

      </div>

      <div className="bg-white rounded-xl border p-8">

        {resumeUrl ? (

          <div className="space-y-6">

            <p className="text-green-600 font-semibold">
              Resume Uploaded
            </p>

            <div className="flex gap-4">

              <a
                href={resumeUrl}
                target="_blank"
                className="px-5 py-3 rounded-lg bg-blue-600 text-white"
              >
                View Resume
              </a>

              <button
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="px-5 py-3 rounded-lg bg-orange-500 text-white"
              >
                Replace
              </button>

              <button
                onClick={deleteResume}
                className="px-5 py-3 rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>

            </div>

          </div>

        ) : (

          <div className="space-y-5">

            <p className="text-gray-500">
              No resume uploaded yet.
            </p>

            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="bg-[#FF9900] text-white px-6 py-3 rounded-lg font-semibold"
            >
              Upload Resume
            </button>

          </div>

        )}

        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={uploadResume}
        />

        {uploading && (
          <p className="mt-5 text-orange-600">
            Uploading...
          </p>
        )}

      </div>

    </div>
  );
}