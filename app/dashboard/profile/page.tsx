"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Profile = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  branch: string;
  college: string;
  gradYear: string;
  cgpa: string;
  experience: string;
  jobType: string;
  salary: string;
  locations: string[];
  skills: string[];
  resumeUrl: string | null;
};

const locationOptions = [
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Any Location",
];

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] =
    useState<Profile>({
      firstName: "",
      lastName: "",
      city: "",
      degree: "",
      branch: "",
      college: "",
      gradYear: "",
      cgpa: "",
      experience: "fresher",
      jobType: "",
      salary: "",
      locations: [],
      skills: [],
      resumeUrl: null,
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch(
        "/api/candidate/profile"
      );

      const data = await res.json();

      setProfile({
        ...data,
        locations:
          data.locations || [],
        skills: data.skills || [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch(
        "/api/candidate/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(profile),
        }
      );

      if (!res.ok) {
        alert(
          "Failed to update profile."
        );
        return;
      }

      alert(
        "Profile updated successfully."
      );
    } catch {
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  const profileScore = useMemo(() => {
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.city,
      profile.degree,
      profile.branch,
      profile.college,
      profile.gradYear,
      profile.cgpa,
      profile.jobType,
      profile.salary,
      profile.experience,
      profile.resumeUrl,
    ];

    let score = 0;

    fields.forEach((item) => {
      if (item) score++;
    });

    if (profile.skills.length)
      score++;

    if (profile.locations.length)
      score++;

    return Math.round(
      (score / 14) * 100
    );
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8]">

      <div className="max-w-6xl mx-auto py-10 px-5">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Edit Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Keep your information up
              to date for better job
              matches.
            </p>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">
              Profile Completion
            </p>

            <h2 className="text-3xl font-bold text-[#FF9900]">
              {profileScore}%
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl border shadow-sm p-8">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h2 className="text-2xl font-bold">
                Personal Information
              </h2>

              <p className="text-gray-500 mt-1">
                Update your personal
                details.
              </p>

            </div>

            <Link
              href="/dashboard/resume"
              className="bg-[#FF9900] px-5 py-3 rounded-lg font-semibold"
            >
              Manage Resume
            </Link>

          </div>

          <form
            onSubmit={saveProfile}
            className="space-y-8"
          >

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block font-medium mb-2">
                  First Name
                </label>

                <input
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      firstName:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block font-medium mb-2">
                  Last Name
                </label>

                <input
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      lastName:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block font-medium mb-2">
                  Current City
                </label>

                <input
                  value={profile.city}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      city:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block font-medium mb-2">
                  Experience
                </label>

                <select
                  value={
                    profile.experience
                  }
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      experience:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                >
                  <option>
                    fresher
                  </option>

                  <option>
                    0-1 years
                  </option>

                  <option>
                    1-2 years
                  </option>

                  <option>
                    2-5 years
                  </option>

                </select>

              </div>

            </div>

            <hr />
                        {/* Education */}

            <div>

              <h2 className="text-2xl font-bold mb-6">
                Education
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block font-medium mb-2">
                    Degree
                  </label>

                  <select
                    value={profile.degree}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        degree: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="">
                      Select Degree
                    </option>

                    <option>
                      B.Tech / B.E.
                    </option>

                    <option>
                      BCA
                    </option>

                    <option>
                      B.Sc
                    </option>

                    <option>
                      B.Com
                    </option>

                    <option>
                      BBA
                    </option>

                    <option>
                      MCA
                    </option>

                    <option>
                      MBA
                    </option>

                    <option>
                      M.Tech
                    </option>

                  </select>

                </div>

                <div>

                  <label className="block font-medium mb-2">
                    Branch
                  </label>

                  <input
                    value={profile.branch}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        branch:
                          e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  />

                </div>

                <div>

                  <label className="block font-medium mb-2">
                    College
                  </label>

                  <input
                    value={profile.college}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        college:
                          e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  />

                </div>

                <div>

                  <label className="block font-medium mb-2">
                    Graduation Year
                  </label>

                  <select
                    value={
                      profile.gradYear
                    }
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gradYear:
                          e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="">
                      Select
                    </option>

                    {Array.from(
                      {
                        length: 10,
                      },
                      (_, i) =>
                        2024 +
                        i
                    ).map((year) => (
                      <option
                        key={year}
                      >
                        {year}
                      </option>
                    ))}

                  </select>

                </div>

                <div>

                  <label className="block font-medium mb-2">
                    CGPA
                  </label>

                  <input
                    value={profile.cgpa}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        cgpa:
                          e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  />

                </div>

              </div>

            </div>

            <hr />

            {/* Job Preferences */}

            <div>

              <h2 className="text-2xl font-bold mb-6">
                Job Preferences
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block font-medium mb-2">
                    Preferred Job Type
                  </label>

                  <select
                    value={
                      profile.jobType
                    }
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        jobType:
                          e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="">
                      Select
                    </option>

                    <option>
                      Full-time Employment
                    </option>

                    <option>
                      Internship + PPO
                    </option>

                    <option>
                      Remote / WFH
                    </option>

                    <option>
                      Startup
                    </option>

                    <option>
                      Government / PSU
                    </option>

                  </select>

                </div>

                <div>

                  <label className="block font-medium mb-2">
                    Expected Salary
                  </label>

                  <select
                    value={
                      profile.salary
                    }
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        salary:
                          e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="">
                      Select
                    </option>

                    <option>
                      2–4 LPA
                    </option>

                    <option>
                      4–6 LPA
                    </option>

                    <option>
                      6–10 LPA
                    </option>

                    <option>
                      10+ LPA
                    </option>

                  </select>

                </div>

              </div>

              <div className="mt-8">

                <label className="block font-medium mb-3">
                  Preferred Locations
                </label>

                <div className="flex flex-wrap gap-3">

                  {locationOptions.map(
                    (location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => {

                          if (
                            profile.locations.includes(
                              location
                            )
                          ) {

                            setProfile({
                              ...profile,
                              locations:
                                profile.locations.filter(
                                  (l) =>
                                    l !==
                                    location
                                ),
                            });

                          } else {

                            setProfile({
                              ...profile,
                              locations: [
                                ...profile.locations,
                                location,
                              ],
                            });

                          }

                        }}
                        className={`px-4 py-2 rounded-full border transition ${
                          profile.locations.includes(
                            location
                          )
                            ? "bg-[#FF9900] text-white border-[#FF9900]"
                            : "bg-white"
                        }`}
                      >
                        {location}
                      </button>
                    )
                  )}

                </div>

              </div>

              <div className="mt-8">

                <label className="block font-medium mb-2">
                  Skills
                </label>

                <textarea
                  rows={5}
                  value={profile.skills.join(
                    ", "
                  )}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      skills:
                        e.target.value
                          .split(",")
                          .map((s) =>
                            s.trim()
                          )
                          .filter(Boolean),
                    })
                  }
                  className="w-full border rounded-lg p-3"
                  placeholder="React, Next.js, Java..."
                />

              </div>

            </div>

            <hr />
                        {/* Resume */}

            <div>

              <h2 className="text-2xl font-bold mb-6">
                Resume
              </h2>

              <div className="border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <h3 className="font-semibold text-lg">
                    Resume Status
                  </h3>

                  <p className="text-gray-500 mt-2">

                    {profile.resumeUrl
                      ? "Your resume has been uploaded successfully."
                      : "No resume uploaded yet."}

                  </p>

                </div>

                <Link
                  href="/dashboard/resume"
                  className="bg-[#FF9900] px-6 py-3 rounded-lg font-semibold text-center"
                >
                  {profile.resumeUrl
                    ? "Update Resume"
                    : "Upload Resume"}
                </Link>

              </div>

            </div>

            <hr />

            {/* Profile Completion */}

            <div>

              <h2 className="text-2xl font-bold mb-5">
                Profile Strength
              </h2>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="bg-[#FF9900] h-full transition-all"
                  style={{
                    width: `${profileScore}%`,
                  }}
                />

              </div>

              <div className="mt-3 flex justify-between">

                <p className="text-gray-500">

                  Your profile is

                  <span className="font-semibold text-black">
                    {" "}
                    {profileScore}% complete
                  </span>

                </p>

                {profileScore === 100 ? (
                  <span className="text-green-600 font-semibold">
                    Complete
                  </span>
                ) : (
                  <span className="text-orange-600 font-semibold">
                    Improve Profile
                  </span>
                )}

              </div>

              <div className="mt-8 bg-[#FFF8E7] rounded-xl border border-[#FFE0A3] p-5">

                <h3 className="font-bold mb-3">
                  Tips to reach 100%
                </h3>

                <ul className="list-disc ml-5 space-y-2 text-gray-700">

                  {!profile.resumeUrl && (
                    <li>
                      Upload your latest
                      resume.
                    </li>
                  )}

                  {!profile.skills.length && (
                    <li>
                      Add your technical
                      skills.
                    </li>
                  )}

                  {!profile.locations.length && (
                    <li>
                      Select preferred job
                      locations.
                    </li>
                  )}

                  {!profile.salary && (
                    <li>
                      Select expected salary.
                    </li>
                  )}

                  {!profile.jobType && (
                    <li>
                      Choose preferred job
                      type.
                    </li>
                  )}

                  {!profile.cgpa && (
                    <li>
                      Add your CGPA.
                    </li>
                  )}

                  {!profile.branch && (
                    <li>
                      Add your branch.
                    </li>
                  )}

                </ul>

              </div>

            </div>

            <div className="flex justify-end gap-4 pt-6">

              <Link
                href="/dashboard"
                className="border px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="bg-[#FF9900] px-8 py-3 rounded-lg font-semibold disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}