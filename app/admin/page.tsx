import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#EAEDED] p-8">
      <h1 className="text-4xl font-bold mb-8">
        HireVexa Admin
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          href="/admin/jobs"
          className="bg-white rounded-xl border p-6 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            Manage Jobs
          </h2>

          <p className="text-gray-500 mt-2">
            View, edit, activate or delete jobs.
          </p>
        </Link>

        <Link
          href="/admin/jobs/create"
          className="bg-white rounded-xl border p-6 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            Create Job
          </h2>

          <p className="text-gray-500 mt-2">
            Publish a new opening.
          </p>
        </Link>

        <Link
          href="/admin/candidates"
          className="bg-white rounded-xl border p-6 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            Candidates
          </h2>

          <p className="text-gray-500 mt-2">
            View applications.
          </p>
        </Link>

      </div>
    </div>
  );
}