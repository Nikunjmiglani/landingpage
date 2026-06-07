"use client"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { useState } from "react";
import { Star, Shield, Users, Briefcase, TrendingUp, Award, CheckCircle, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const stats = [
  { label: "Freshers Placed", value: "12,400+", icon: Users },
  { label: "Partner Companies", value: "380+", icon: Briefcase },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
  { label: "Average Salary Hike", value: "2.8x", icon: Award },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    college: "SRM University",
    stars: 5,
    text: "The resume review and interview preparation sessions helped me gain confidence. I received an offer within a month.",
    role: "Software Engineer @ TCS",
  },
  {
    name: "Priya Verma",
    college: "Delhi University",
    stars: 5,
    text: "The team guided me throughout the placement process and helped improve my communication skills.",
    role: "Analyst @ Wipro",
  },
  {
    name: "Aman Gupta",
    college: "AKTU",
    stars: 5,
    text: "Very professional counselling and quick support whenever I had questions.",
    role: "Associate Engineer @ Infosys",
  },
  {
    name: "Sneha Kapoor",
    college: "IP University",
    stars: 5,
    text: "The mock interviews were extremely useful and helped me identify my weak areas.",
    role: "Graduate Trainee @ Cognizant",
  },
  {
    name: "Rohit Yadav",
    college: "Amity University",
    stars: 5,
    text: "Excellent guidance from profile creation to final interview rounds.",
    role: "Support Engineer @ HCL",
  },
  {
    name: "Neha Singh",
    college: "Galgotias University",
    stars: 5,
    text: "I was struggling to get interview calls before joining. Things improved significantly afterwards.",
    role: "Associate Consultant @ Capgemini",
  },
  {
    name: "Aditya Jain",
    college: "Bennett University",
    stars: 5,
    text: "Helpful mentors and practical advice throughout the placement journey.",
    role: "Developer @ Accenture",
  },
  {
    name: "Pooja Mishra",
    college: "Chandigarh University",
    stars: 5,
    text: "The process was smooth and transparent. I especially liked the resume feedback.",
    role: "Business Analyst @ Deloitte",
  },
  {
    name: "Karan Mehta",
    college: "LPU",
    stars: 5,
    text: "Good support and regular updates regarding opportunities.",
    role: "Associate @ Tech Mahindra",
  },
  {
    name: "Nitin Arora",
    college: "UPES",
    stars: 5,
    text: "The interview preparation sessions made a noticeable difference.",
    role: "Software Engineer @ LTIMindtree",
  },
  {
    name: "Mehak Arora",
    college: "SRM University",
    stars: 5,
    text: "I appreciated the detailed career guidance and personalised support.",
    role: "Engineer @ IBM",
  },
  {
    name: "Yash Gupta",
    college: "KIIT",
    stars: 5,
    text: "The consultants were responsive and genuinely interested in helping candidates.",
    role: "Developer @ Persistent",
  },
  {
    name: "Anjali Sharma",
    college: "DTU",
    stars: 5,
    text: "Great experience from start to finish. Highly recommended for freshers.",
    role: "Associate Engineer @ Wipro",
  },
  {
    name: "Harsh Vardhan",
    college: "NSUT",
    stars: 5,
    text: "The mock interview feedback was detailed and actionable.",
    role: "Graduate Engineer @ Infosys",
  },
  {
    name: "Muskan Jain",
    college: "VIT",
    stars: 5,
    text: "I learned how to present my projects effectively during interviews.",
    role: "Software Developer @ TCS",
  },
  {
    name: "Deepak Kumar",
    college: "Manipal University",
    stars: 5,
    text: "Professional guidance and realistic expectations throughout the process.",
    role: "Associate Consultant @ EY",
  },
  {
    name: "Ritika Gupta",
    college: "JSS Noida",
    stars: 5,
    text: "Their resume optimization suggestions increased my interview calls.",
    role: "Analyst @ Genpact",
  },
  {
    name: "Vikas Sharma",
    college: "Graphic Era University",
    stars: 5,
    text: "Very supportive team and excellent placement assistance.",
    role: "Engineer @ HCL",
  },
  {
    name: "Shreya Agarwal",
    college: "MIT Pune",
    stars: 5,
    text: "The entire process felt structured and easy to follow.",
    role: "Developer @ Accenture",
  },
  {
    name: "Abhishek Verma",
    college: "SRM University",
    stars: 5,
    text: "Helpful guidance on aptitude preparation and interview strategy.",
    role: "Software Engineer @ Cognizant",
  },
];
const companies = [
  { name: "TCS", logo: "/logos/tcs.png" },
  { name: "Infosys", logo: "/logos/infosys.png" },
  { name: "Wipro", logo: "/logos/wipro.png" },
  { name: "Accenture", logo: "/logos/accenture.png" },
  { name: "Deloitte", logo: "/logos/deloitte.png" },
  { name: "HCL", logo: "/logos/hcl.png" },
  { name: "IBM", logo: "/logos/ibm.png" },
  { name: "Capgemini", logo: "/logos/capgemini.png" },
  { name: "Cognizant", logo: "/logos/cognizant.png" },
  { name: "Tech Mahindra", logo: "/logos/techmahindra.png" },
];

export default function HomePage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

const visibleTestimonials = testimonials.slice(
  testimonialIndex,
  testimonialIndex + 4
);

const nextTestimonials = () => {
  if (testimonialIndex + 4 < testimonials.length) {
    setTestimonialIndex(testimonialIndex + 4);
  } else {
    setTestimonialIndex(0);
  }
};

const prevTestimonials = () => {
  if (testimonialIndex - 4 >= 0) {
    setTestimonialIndex(testimonialIndex - 4);
  } else {
    setTestimonialIndex(Math.max(0, testimonials.length - 4));
  }
};

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-[#FF9900] text-[#131921] text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-wide">
              #1 Fresher Placement Platform
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Your Career Starts Here.<br />
              <span className="text-[#FF9900]">We Get You Placed.</span>
            </h1>
            <p className="text-[#CCCCCC] text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
              India&#39;s most trusted career consultancy for freshers. From resume to offer letter — we handle everything.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/onboarding" className="bg-[#FF9900] hover:bg-[#FA8900] text-[#131921] font-bold px-6 sm:px-8 py-3 rounded text-center text-sm transition-colors w-full sm:w-auto">
                Get Started Free
              </Link>
              <Link href="/login" className="border border-white hover:bg-white hover:text-[#131921] text-white font-bold px-6 sm:px-8 py-3 rounded text-center text-sm transition-colors w-full sm:w-auto">
                Sign In to Portal
              </Link>
            </div>
            <p className="mt-4 text-[#AAAAAA] text-xs">✓ Free registration &nbsp;✓ No hidden charges &nbsp;✓ Placement guarantee*</p>
          </div>

         <div className="flex-1 flex justify-center items-center">
  <div className="relative">
    {/* Soft glow */}
    <div className="absolute inset-0 bg-[#FF9900]/20 blur-3xl rounded-full scale-125"></div>

    {/* Round Logo */}
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden">
      <img
        src="/logo.png"
        alt="Company Logo"
        className="w-[75%] h-[75%] object-contain"
      />
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-[#232F3E] text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-[11px] sm:text-xs text-[#CCCCCC] text-center">
          <span>🚀 <strong className="text-white">12,400+</strong> placed this year</span>
          <span>📞 <strong className="text-white">Free counselling</strong> every Monday</span>
          <span>💼 <strong className="text-white">380+ hiring partners</strong></span>
          <Link href="/onboarding" className="text-[#FF9900] hover:underline font-semibold">Register Today →</Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-white border border-[#DDD] rounded p-4 flex flex-col items-center text-center shadow-sm">
              <s.icon size={24} className="text-[#FF9900] mb-2" />
              <p className="text-xl sm:text-2xl font-bold text-[#131921]">{s.value}</p>
              <p className="text-xs text-[#565959] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#DDD] rounded p-4 sm:p-6 overflow-hidden">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
      <h2 className="text-lg sm:text-xl font-bold text-[#0F1111] text-center sm:text-left">
        Our Hiring Partners
      </h2>

      <div className="bg-[#232F3E] px-4 py-2 rounded text-sm font-semibold text-white">
        380+ Companies
      </div>
    </div>

    <div className="relative overflow-hidden">
      <div className="flex animate-marquee gap-4 sm:gap-8 w-max">
        {[...companies, ...companies].map((company, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white border border-[#DDD] rounded-lg px-4 sm:px-6 py-4 min-w-[130px] sm:min-w-[180px] flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="h-8 sm:h-12 object-contain mb-2 sm:mb-3"
            />

            <p className="font-semibold text-[#232F3E] text-xs sm:text-sm text-center">
              {company.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>

        {/* How It Works */}
        <div className="bg-white border border-[#DDD] rounded p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#0F1111] mb-6 text-center">How Hirevexa Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { step: "01", title: "Register & Onboard", desc: "Fill your profile, upload resume, tell us your goals", icon: BookOpen },
              { step: "02", title: "Counselling Session", desc: "Expert counsellor maps your profile to right opportunities", icon: Users },
              { step: "03", title: "Prep & Apply", desc: "Interview coaching, resume polish, apply to matched roles", icon: Shield },
              { step: "04", title: "Get Placed!", desc: "Offer letter → salary negotiation → joining support", icon: Award },
            ].map(step => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#232F3E] text-white flex items-center justify-center mb-3 font-bold text-lg">
                  {step.step}
                </div>
                <step.icon size={20} className="text-[#FF9900] mb-2" />
                <h3 className="font-bold text-sm text-[#0F1111] mb-1">{step.title}</h3>
                <p className="text-xs text-[#565959]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chairman Message */}
        <div className="bg-white border border-[#DDD] rounded p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block bg-[#FF9900] text-[#131921] text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-wide">
                Message From Director
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F1111] mb-4">
                Empowering India&#39;s Next Generation of Professionals
              </h2>
              <p className="text-[#565959] leading-relaxed mb-4 text-sm sm:text-base">
                At Hirevexa, our vision has always been simple — bridge the gap between education and employment. Every year thousands of talented graduates struggle not because they lack potential, but because they lack guidance, opportunities, and industry exposure.
              </p>
              <p className="text-[#565959] leading-relaxed mb-4 text-sm sm:text-base">
                Our mission is to ensure that every student receives the right career direction, professional training, and placement opportunities required to succeed in today&#39;s competitive job market.
              </p>
              <p className="text-[#565959] leading-relaxed text-sm sm:text-base">
                I sincerely thank our students, recruiters, mentors, and industry partners for placing their trust in us. Together, we continue building brighter futures and stronger careers.
              </p>
              <div className="mt-6">
                <h4 className="font-bold text-[#232F3E] text-lg sm:text-xl">Mr. Siddharth vats</h4>
                <p className="text-[#FF9900] font-semibold text-sm">Director & Founder, Hirevexa</p>
              </div>
            </div>
            <div className="flex justify-center w-full lg:w-auto">
              <div className="relative">
                <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#FF9900] shadow-xl bg-[#EAEDED] flex items-center justify-center">
  <span className="text-8xl">👨‍💼</span>
</div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#232F3E] text-white px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-lg whitespace-nowrap">
                  Director & Founder
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
<div>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg sm:text-xl font-bold text-[#0F1111]">
      Candidate Success Stories
    </h2>

    <div className="flex gap-2">
      <button
        onClick={prevTestimonials}
        className="w-10 h-10 rounded-full border border-[#DDD] bg-white hover:bg-[#F7F7F7] flex items-center justify-center transition"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={nextTestimonials}
        className="w-10 h-10 rounded-full border border-[#DDD] bg-white hover:bg-[#F7F7F7] flex items-center justify-center transition"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {visibleTestimonials.map((t) => (
      <div
        key={t.name}
        className="bg-white border border-[#DDD] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#232F3E] text-white flex items-center justify-center font-bold text-sm">
            {t.name[0]}
          </div>

          <div>
            <p className="font-bold text-sm text-[#0F1111]">
              {t.name}
            </p>

            <p className="text-xs text-[#565959]">
              {t.college}
            </p>
          </div>
        </div>

        <div className="flex gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < t.stars
                  ? "fill-[#FF9900] text-[#FF9900]"
                  : "text-[#DDD]"
              }
            />
          ))}
        </div>

        <div className="inline-block bg-[#232F3E] text-white text-[10px] px-2 py-0.5 rounded mb-2 font-semibold">
          ✓ Verified Candidate
        </div>

        <p className="text-xs text-[#0F1111] mb-3 leading-relaxed">
          "{t.text}"
        </p>

        <p className="text-xs text-[#067D62] font-semibold">
          {t.role}
        </p>
      </div>
    ))}
  </div>
</div>

        {/* CTA */}
        <div className="bg-[#232F3E] text-white rounded p-5 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Ready to Start Your Career Journey?</h2>
          <p className="text-[#CCCCCC] mb-6 text-sm">Join 12,400+ freshers who trusted Hirevexa and landed their dream jobs.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/onboarding" className="bg-[#FF9900] hover:bg-[#FA8900] text-[#131921] font-bold px-6 sm:px-10 py-3 rounded text-sm flex items-center justify-center gap-2 w-full sm:w-auto">
              Create Free Account <ArrowRight size={16} />
            </Link>
            <Link href="#" className="border border-white text-white hover:bg-white hover:text-[#131921] font-semibold px-6 sm:px-10 py-3 rounded text-sm transition-colors w-full sm:w-auto">
              Talk to a Counsellor
            </Link>
          </div>
          <p className="mt-4 text-[#AAAAAA] text-xs">*Placement guarantee terms apply. Free registration. No credit card required.</p>
        </div>

      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
