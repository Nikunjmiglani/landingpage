import Link from "next/link";
import {
  Users,
  Briefcase,
  Target,
  Eye,
  Award,
  GraduationCap,
  TrendingUp,
  Building2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    {
      number: "12,400+",
      label: "Freshers Placed",
      icon: Users,
    },
    {
      number: "380+",
      label: "Hiring Partners",
      icon: Building2,
    },
    {
      number: "94%",
      label: "Success Rate",
      icon: TrendingUp,
    },
    {
      number: "2.8x",
      label: "Average Salary Growth",
      icon: Award,
    },
  ];

  const values = [
    {
      title: "Student First",
      description:
        "Every decision we make revolves around helping students achieve meaningful career growth.",
    },
    {
      title: "Transparency",
      description:
        "We believe in honest guidance, realistic expectations, and complete transparency.",
    },
    {
      title: "Industry Alignment",
      description:
        "Our programs are designed according to real industry requirements and hiring trends.",
    },
    {
      title: "Long-Term Success",
      description:
        "We focus on building careers, not just securing the first job offer.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Registration & Profile Analysis",
      description:
        "Students register, upload resumes, and complete career assessments.",
    },
    {
      step: "02",
      title: "Career Counselling",
      description:
        "Dedicated experts identify strengths, goals, and suitable opportunities.",
    },
    {
      step: "03",
      title: "Resume & Interview Preparation",
      description:
        "Professional resume building, mock interviews, and communication training.",
    },
    {
      step: "04",
      title: "Job Matching & Applications",
      description:
        "Candidates are connected with relevant openings and hiring partners.",
    },
    {
      step: "05",
      title: "Offer & Joining Support",
      description:
        "We assist candidates until successful onboarding and career transition.",
    },
  ];

  const industries = [
    "Information Technology",
    "Software Development",
    "Banking & Finance",
    "Digital Marketing",
    "Data Analytics",
    "Cybersecurity",
    "Healthcare",
    "E-Commerce",
    "Consulting",
    "Manufacturing",
    "Telecommunications",
    "EdTech",
  ];

  return (
    <main className="bg-[#eef0f1] min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#16253A] via-[#24344d] to-[#42526a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <span className="inline-block bg-[#ff9f00] text-black px-5 py-2 rounded-md font-bold text-sm">
              ABOUT HIREVEXA CONSULTANCY
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-8 leading-tight">
              Empowering Careers.
              <br />
              Creating Futures.
            </h1>

            <p className="text-xl text-gray-300 mt-8 leading-relaxed max-w-3xl">
              Hirevexa Consultancy is dedicated to bridging the gap between
              education and employment. We help freshers and young professionals
              gain the skills, confidence, and opportunities required to thrive
              in today's competitive job market.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/register"
                className="bg-[#ff9f00] text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Get Started
              </Link>

              <Link
                href="/contact"
                className="border border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border p-8 text-center"
              >
                <Icon className="w-10 h-10 mx-auto text-[#ff9f00]" />

                <h3 className="text-4xl font-bold mt-4 text-[#16253A]">
                  {item.number}
                </h3>

                <p className="text-gray-600 mt-2">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="bg-[#ff9f00] text-black px-4 py-2 rounded-md font-semibold text-sm">
              OUR STORY
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-6 text-[#16253A]">
              Helping Talent Meet Opportunity
            </h2>

            <div className="space-y-6 mt-8 text-lg text-gray-700 leading-relaxed">
              <p>
                Every year, millions of graduates enter the workforce with
                ambition, talent, and determination. Yet many struggle to find
                the right opportunities because of limited industry exposure,
                inadequate preparation, and lack of professional guidance.
              </p>

              <p>
                Hirevexa was established to solve this challenge. We recognized
                that students needed more than just job listings—they needed a
                trusted partner who could guide them throughout their career
                journey.
              </p>

              <p>
                Today, Hirevexa works with students, fresh graduates, and
                employers across India to create meaningful career outcomes.
                Through personalized counselling, resume enhancement,
                interview preparation, skill development, and placement
                assistance, we help candidates confidently enter the
                professional world.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-10 border">
            <GraduationCap className="w-20 h-20 text-[#ff9f00]" />

            <h3 className="text-3xl font-bold mt-6 text-[#16253A]">
              Our Commitment
            </h3>

            <p className="text-gray-700 mt-4 leading-relaxed">
              We are committed to helping every student discover their potential
              and achieve professional success through expert mentorship,
              industry-relevant preparation, and strategic placement support.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION VISION */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-2xl bg-[#16253A] text-white">
              <Target className="w-12 h-12 text-[#ff9f00]" />

              <h3 className="text-3xl font-bold mt-6">Our Mission</h3>

              <p className="mt-5 text-gray-300 leading-relaxed">
                To empower students and fresh graduates with the guidance,
                skills, and opportunities necessary to build successful careers
                while helping organizations connect with talented professionals.
              </p>
            </div>

            <div className="p-10 rounded-2xl bg-[#ff9f00] text-black">
              <Eye className="w-12 h-12" />

              <h3 className="text-3xl font-bold mt-6">Our Vision</h3>

              <p className="mt-5 leading-relaxed">
                To become India's most trusted career consultancy platform,
                enabling every student to transition seamlessly from education
                to employment and achieve long-term professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="bg-[#ff9f00] text-black px-4 py-2 rounded-md font-semibold text-sm">
            OUR VALUES
          </span>

          <h2 className="text-5xl font-bold mt-6 text-[#16253A]">
            What Drives Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border shadow-sm"
            >
              <CheckCircle className="w-10 h-10 text-[#ff9f00]" />

              <h3 className="text-xl font-bold mt-5 text-[#16253A]">
                {value.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="bg-[#ff9f00] text-black px-4 py-2 rounded-md font-semibold text-sm">
              OUR PROCESS
            </span>

            <h2 className="text-5xl font-bold mt-6 text-[#16253A]">
              How Hirevexa Works
            </h2>
          </div>

          <div className="space-y-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="bg-[#f8f9fa] border rounded-xl p-8 flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-[#16253A] text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#16253A]">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mt-3">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <span className="bg-[#ff9f00] text-black px-4 py-2 rounded-md font-semibold text-sm">
            INDUSTRIES WE SERVE
          </span>

          <h2 className="text-5xl font-bold mt-6 text-[#16253A]">
            Opportunities Across Sectors
          </h2>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 mt-16">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-5 text-center font-medium hover:border-[#ff9f00] transition"
            >
              {industry}
            </div>
          ))}
        </div>
      </section>

      {/* DIRECTOR MESSAGE */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-2xl border shadow-sm p-10 lg:p-16">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <span className="bg-[#ff9f00] text-black px-4 py-2 rounded-md font-semibold text-sm">
                MESSAGE FROM DIRECTOR
              </span>

              <h2 className="text-5xl font-bold mt-6 text-[#16253A]">
                Empowering India's Next Generation
              </h2>

              <div className="space-y-5 text-lg text-gray-700 mt-8 leading-relaxed">
                <p>
                  At Hirevexa, our mission extends beyond placements. We are
                  committed to helping students gain confidence, industry
                  exposure, and practical skills that enable long-term success.
                </p>

                <p>
                  We believe every student deserves access to the right
                  opportunities, professional guidance, and career support.
                  Through our dedicated team and trusted employer network,
                  we continue to help thousands of candidates achieve their
                  professional aspirations.
                </p>

                <p>
                  Together, we are building brighter careers and a stronger
                  future workforce for India.
                </p>
              </div>

              <div className="mt-8">
                <h4 className="text-2xl font-bold text-[#16253A]">
                  Mr. Sidharth Vats
                </h4>

                <p className="text-[#ff9f00] font-semibold">
                  Director & Founder, Hirevexa Consultancy
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-72 h-72 rounded-full border-[8px] border-[#ff9f00] bg-gray-100 flex items-center justify-center text-8xl">
                👨‍💼
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#16253A] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-5xl font-bold">
            Ready To Start Your Career Journey?
          </h2>

          <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
            Join thousands of successful candidates who trusted Hirevexa to
            guide them toward meaningful employment opportunities.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-3 mt-10 bg-[#ff9f00] text-black px-8 py-4 rounded-lg font-bold hover:opacity-90 transition"
          >
            Register Today
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}