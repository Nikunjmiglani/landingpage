import Link from "next/link";
import {
  FileText,
  Search,
  CheckCircle,
  XCircle,
  Award,
  ArrowRight,
  ScanSearch,
  Briefcase,
} from "lucide-react";

export default function ResumeBuildingPage() {
  const mistakes = [
    "Poor formatting and layout",
    "ATS-incompatible resumes",
    "Weak project descriptions",
    "Missing industry keywords",
    "Generic career objectives",
    "Lack of measurable achievements",
    "Unprofessional presentation",
    "Overly lengthy resumes",
  ];

  const features = [
    {
      title: "ATS Optimization",
      description:
        "Ensure your resume passes Applicant Tracking Systems used by recruiters.",
    },
    {
      title: "Keyword Enhancement",
      description:
        "Industry-relevant keywords strategically added to improve visibility.",
    },
    {
      title: "Project Showcasing",
      description:
        "Present academic and personal projects in a recruiter-friendly format.",
    },
    {
      title: "Professional Formatting",
      description:
        "Modern, clean, and visually appealing layouts designed for hiring managers.",
    },
  ];

  return (
    <main className="bg-[#eef0f1] min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#16253A] via-[#24344d] to-[#42526a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <span className="bg-[#ff9f00] text-black px-5 py-2 rounded-md font-bold text-sm">
            PROFESSIONAL RESUME BUILDING
          </span>

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">

            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                A Resume Doesn't Get You A Job.
              </h1>

              <h2 className="text-[#ff9f00] text-4xl md:text-5xl font-bold mt-4">
                It Gets You The Interview.
              </h2>

              <p className="text-gray-300 text-lg mt-8 leading-relaxed">
                Most recruiters spend less than 10 seconds reviewing a resume.
                We help you make those seconds count with professionally crafted,
                ATS-friendly resumes designed to increase interview calls.
              </p>

              <div className="flex gap-4 mt-10">
                <Link
                  href="/contact"
                  className="bg-[#ff9f00] text-black px-8 py-4 rounded-lg font-semibold"
                >
                  Build My Resume
                </Link>

                <Link
                  href="/contact"
                  className="border border-white px-8 py-4 rounded-lg"
                >
                  Free Consultation
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                <FileText size={120} className="text-[#16253A]" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY RESUMES FAIL */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center max-w-4xl mx-auto">
          <span className="bg-[#ff9f00] px-4 py-2 rounded-md font-semibold">
            THE REALITY
          </span>

          <h2 className="text-5xl font-bold mt-6 text-[#16253A]">
            Why Most Resumes Never Reach Recruiters
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Many candidates assume a resume is simply a list of qualifications.
            In reality, modern hiring processes use Applicant Tracking Systems
            (ATS) to filter resumes before a human ever sees them.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-16">

          <div className="bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-3">
              <XCircle className="text-red-500" />
              <h3 className="text-2xl font-bold">
                Typical Resume
              </h3>
            </div>

            <ul className="mt-8 space-y-4 text-gray-600">
              <li>❌ Generic objective statement</li>
              <li>❌ No ATS optimization</li>
              <li>❌ Weak project descriptions</li>
              <li>❌ Poor formatting</li>
              <li>❌ Missing keywords</li>
              <li>❌ No measurable achievements</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              <h3 className="text-2xl font-bold">
                Hirevexa Resume
              </h3>
            </div>

            <ul className="mt-8 space-y-4 text-gray-600">
              <li>✅ ATS optimized</li>
              <li>✅ Recruiter friendly layout</li>
              <li>✅ Strong project presentation</li>
              <li>✅ Industry keywords included</li>
              <li>✅ Professional formatting</li>
              <li>✅ Achievement-focused content</li>
            </ul>
          </div>

        </div>

      </section>

      {/* ATS SECTION */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <ScanSearch
                size={80}
                className="text-[#ff9f00]"
              />

              <h2 className="text-5xl font-bold mt-6 text-[#16253A]">
                ATS Optimized Resumes
              </h2>

              <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                Applicant Tracking Systems scan resumes before recruiters
                review them. If your resume lacks the right keywords,
                structure, and formatting, it may never reach a hiring manager.
              </p>

              <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                Our resume experts ensure your document is optimized
                for both ATS systems and human recruiters.
              </p>
            </div>

            <div className="bg-[#16253A] rounded-2xl p-10 text-white">
              <h3 className="text-3xl font-bold">
                ATS Checklist
              </h3>

              <div className="space-y-4 mt-8">
                {[
                  "Keyword Optimization",
                  "Role Specific Skills",
                  "Clean Structure",
                  "Professional Formatting",
                  "Recruiter Friendly Layout",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="text-[#ff9f00]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">
          <span className="bg-[#ff9f00] px-4 py-2 rounded-md font-semibold">
            WHAT'S INCLUDED
          </span>

          <h2 className="text-5xl font-bold mt-6 text-[#16253A]">
            Resume Transformation Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border rounded-xl p-8"
            >
              <Award className="text-[#ff9f00]" />

              <h3 className="text-2xl font-bold mt-5">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* MISTAKES */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-center">
            <span className="bg-[#ff9f00] px-4 py-2 rounded-md font-semibold">
              COMMON PROBLEMS
            </span>

            <h2 className="text-5xl font-bold mt-6 text-[#16253A]">
              Resume Mistakes We Fix
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {mistakes.map((item) => (
              <div
                key={item}
                className="bg-[#f8f9fa] rounded-xl p-6 border"
              >
                <Search className="text-[#ff9f00]" />

                <p className="mt-4 font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#16253A] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h2 className="text-5xl font-bold">
            Turn Your Resume Into An Interview Magnet
          </h2>

          <p className="text-gray-300 text-xl mt-6 max-w-3xl mx-auto">
            Stop getting ignored by recruiters. Let our experts create a
            professional resume that highlights your strengths and increases
            your interview opportunities.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#ff9f00] text-black px-8 py-4 rounded-lg font-bold mt-10"
          >
            Get My Resume Built
            <ArrowRight size={20} />
          </Link>

        </div>
      </section>

    </main>
  );
}