"use client"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Star, Shield, Users, Briefcase, TrendingUp, Award, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const stats = [
  { label: "Freshers Placed", rawValue: 12400, suffix: "+", decimals: 0, icon: Users },
  { label: "Partner Companies", rawValue: 380, suffix: "+", decimals: 0, icon: Briefcase },
  { label: "Success Rate", rawValue: 94, suffix: "%", decimals: 0, icon: TrendingUp },
  { label: "Average Salary Hike", rawValue: 2.8, suffix: "x", decimals: 1, icon: Award },
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
  { name: "Deloitte", logo: "/logos/delloite.png" },
  { name: "HCL", logo: "/logos/hcl.png" },
  { name: "IBM", logo: "/logos/ibm.png" },
  { name: "Capgemini", logo: "/logos/capgemini.png" },
  { name: "Cognizant", logo: "/logos/cognizant1.png" },
  { name: "Tech Mahindra", logo: "/logos/techmahindra.png" },
];

function useCountUp(target: number, duration = 1800, decimals = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(parseFloat((target * easeOut(progress)).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(step);
          else setValue(target);
        };

        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  return [value, ref] as const;
}

function StatCard({
  icon: Icon,
  rawValue,
  suffix,
  decimals,
  label,
}: {
  icon: React.ElementType;
  rawValue: number;
  suffix: string;
  decimals: number;
  label: string;
}) {
  const [value, ref] = useCountUp(rawValue, 1800, decimals);

  return (
    <div
      ref={ref}
      className="bg-white border border-[#DDD] rounded p-3 sm:p-4 flex flex-col items-center text-center shadow-sm"
    >
      <Icon size={22} className="text-[#FF9900] mb-1.5" />
      <p className="text-lg sm:text-2xl font-bold text-[#131921]">
        {decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()}
        {suffix}
      </p>
      <p className="text-[10px] sm:text-xs text-[#565959] mt-1">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialsPerPage, setTestimonialsPerPage] = useState(4);

  // Adjust visible testimonials count based on screen size
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setTestimonialsPerPage(1);
      else if (window.innerWidth < 1024) setTestimonialsPerPage(2);
      else setTestimonialsPerPage(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visibleTestimonials = testimonials.slice(
    testimonialIndex,
    testimonialIndex + testimonialsPerPage
  );

  const nextTestimonials = () => {
    if (testimonialIndex + testimonialsPerPage < testimonials.length) {
      setTestimonialIndex(testimonialIndex + testimonialsPerPage);
    } else {
      setTestimonialIndex(0);
    }
  };

  const prevTestimonials = () => {
    if (testimonialIndex - testimonialsPerPage >= 0) {
      setTestimonialIndex(testimonialIndex - testimonialsPerPage);
    } else {
      setTestimonialIndex(Math.max(0, testimonials.length - testimonialsPerPage));
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#232F3E] to-[#37475A] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          
          {/* Logo — shown on mobile above text, hidden on md+ (shown on right) */}
          <div className="flex md:hidden justify-center w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF9900]/20 blur-2xl rounded-full scale-125"></div>
              <div className="relative w-28 h-28 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="HireVexa Logo" className="w-[75%] h-[75%] object-contain" />
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-[#FF9900] text-[#131921] text-[10px] sm:text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wide">
              #1 Fresher Placement Platform.
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4">
              Your Career Starts Here.<br />
              <span className="text-[#FF9900]">We Get You Placed.</span>
            </h1>
            <p className="text-[#CCCCCC] text-sm sm:text-lg mb-5 sm:mb-8 max-w-lg mx-auto md:mx-0">
              India&#39;s most trusted career consultancy for freshers. From resume to offer letter — we handle everything.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/onboarding"
                className="bg-[#FF9900] hover:bg-[#FA8900] text-[#131921] font-bold px-6 sm:px-8 py-3 rounded text-center text-sm transition-colors w-full sm:w-auto"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="border border-white hover:bg-white hover:text-[#131921] text-white font-bold px-6 sm:px-8 py-3 rounded text-center text-sm transition-colors w-full sm:w-auto"
              >
                Sign In to Portal
              </Link>
            </div>
            <p className="mt-4 text-[#AAAAAA] text-[10px] sm:text-xs">
              ✓ Free registration &nbsp;✓ No hidden charges &nbsp;✓ Placement guarantee*
            </p>
          </div>

          {/* Logo — hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF9900]/20 blur-3xl rounded-full scale-125"></div>
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="HireVexa Logo" className="w-[75%] h-[75%] object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-[#232F3E] text-white py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-[10px] sm:text-xs text-[#CCCCCC] text-center">
          <span>🚀 <strong className="text-white">12,400+</strong> placed this year</span>
          <span className="hidden sm:inline">📞 <strong className="text-white">Free counselling</strong> every Monday</span>
          <span>💼 <strong className="text-white">380+ hiring partners</strong></span>
          <Link href="/onboarding" className="text-[#FF9900] hover:underline font-semibold">
            Register Today →
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {stats.map((s) => (
            <StatCard
              key={s.label}
              icon={s.icon}
              rawValue={s.rawValue}
              suffix={s.suffix}
              decimals={s.decimals}
              label={s.label}
            />
          ))}
        </div>

        {/* Hiring Partners */}
        <div className="bg-white border border-[#DDD] rounded p-3 sm:p-6 overflow-hidden">
          <h2 className="text-base sm:text-xl font-bold text-[#0F1111] mb-4 text-center sm:text-left">
            Our Hiring Partners
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee gap-3 sm:gap-8 w-max">
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white border border-[#DDD] rounded-lg px-3 sm:px-6 py-3 sm:py-4 min-w-[100px] sm:min-w-[180px] flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-6 sm:h-12 object-contain mb-1.5 sm:mb-3"
                  />
                  <p className="font-semibold text-[#232F3E] text-[10px] sm:text-sm text-center">
                    {company.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white border border-[#DDD] rounded p-3 sm:p-6">
          <h2 className="text-base sm:text-xl font-bold text-[#0F1111] mb-5 text-center">
            How Hirevexa Works
          </h2>
          {/* Mobile: horizontal scroll steps */}
          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-2 md:pb-0 md:overflow-visible snap-x snap-mandatory md:snap-none">
            {[
              { step: "01", title: "Register & Onboard", desc: "Fill your profile, upload resume, tell us your goals", icon: BookOpen },
              { step: "02", title: "Counselling Session", desc: "Expert counsellor maps your profile to right opportunities", icon: Users },
              { step: "03", title: "Prep & Apply", desc: "Interview coaching, resume polish, apply to matched roles", icon: Shield },
              { step: "04", title: "Get Placed!", desc: "Offer letter → salary negotiation → joining support", icon: Award },
            ].map((step) => (
              <div
                key={step.step}
                className="flex flex-col items-center text-center flex-shrink-0 w-[220px] sm:w-[240px] md:w-auto snap-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#232F3E] text-white flex items-center justify-center mb-2 sm:mb-3 font-bold text-base sm:text-lg flex-shrink-0">
                  {step.step}
                </div>
                <step.icon size={18} className="text-[#FF9900] mb-1.5" />
                <h3 className="font-bold text-xs sm:text-sm text-[#0F1111] mb-1">{step.title}</h3>
                <p className="text-[10px] sm:text-xs text-[#565959] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          {/* Scroll hint on mobile */}
          <p className="text-[10px] text-[#565959] text-center mt-3 md:hidden">← Swipe to see all steps →</p>
        </div>

        {/* Director Message */}
        <div className="bg-white border border-[#DDD] rounded p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
            
            {/* Photo — top on mobile */}
            <div className="flex justify-center w-full lg:w-auto order-first lg:order-last flex-shrink-0">
              <div className="relative">
                <div className="w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#FF9900] shadow-xl bg-[#EAEDED] flex items-center justify-center">
                  <span className="text-5xl sm:text-7xl md:text-8xl">👨‍💼</span>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#232F3E] text-white px-3 py-1.5 rounded-full text-[9px] sm:text-xs font-semibold shadow-lg whitespace-nowrap">
                  Director & Founder
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block bg-[#FF9900] text-[#131921] text-[10px] sm:text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wide">
                Message From Director
              </div>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#0F1111] mb-3">
                Empowering India&#39;s Next Generation of Professionals
              </h2>
              <p className="text-[#565959] leading-relaxed mb-3 text-xs sm:text-base">
                At Hirevexa, our vision has always been simple — bridge the gap between education and employment. Every year thousands of talented graduates struggle not because they lack potential, but because they lack guidance, opportunities, and industry exposure.
              </p>
              <p className="text-[#565959] leading-relaxed mb-3 text-xs sm:text-base">
                Our mission is to ensure that every student receives the right career direction, professional training, and placement opportunities required to succeed in today&#39;s competitive job market.
              </p>
              <p className="text-[#565959] leading-relaxed text-xs sm:text-base">
                I sincerely thank our students, recruiters, mentors, and industry partners for placing their trust in us. Together, we continue building brighter futures and stronger careers.
              </p>
              <div className="mt-4 sm:mt-6">
                <h4 className="font-bold text-[#232F3E] text-base sm:text-xl">Mr. Siddharth Vats</h4>
                <p className="text-[#FF9900] font-semibold text-xs sm:text-sm">Director & Founder, Hirevexa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-xl font-bold text-[#0F1111]">
              Candidate Success Stories
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#565959] hidden sm:inline">
                {Math.floor(testimonialIndex / testimonialsPerPage) + 1} / {Math.ceil(testimonials.length / testimonialsPerPage)}
              </span>
              <button
                onClick={prevTestimonials}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#DDD] bg-white hover:bg-[#F7F7F7] flex items-center justify-center transition"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextTestimonials}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#DDD] bg-white hover:bg-[#F7F7F7] flex items-center justify-center transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {visibleTestimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-[#DDD] rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#232F3E] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-[#0F1111]">{t.name}</p>
                    <p className="text-[10px] sm:text-xs text-[#565959]">{t.college}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className={i < t.stars ? "fill-[#FF9900] text-[#FF9900]" : "text-[#DDD]"}
                    />
                  ))}
                </div>
                <div className="inline-block bg-[#232F3E] text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded mb-2 font-semibold">
                  ✓ Verified Candidate
                </div>
                <p className="text-[10px] sm:text-xs text-[#0F1111] mb-3 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-[10px] sm:text-xs text-[#067D62] font-semibold">{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#232F3E] text-white rounded p-4 sm:p-8 text-center">
          <h2 className="text-lg sm:text-2xl font-bold mb-2">Ready to Start Your Career Journey?</h2>
          <p className="text-[#CCCCCC] mb-5 sm:mb-6 text-xs sm:text-sm">
            Join 12,400+ freshers who trusted Hirevexa and landed their dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/onboarding"
              className="bg-[#FF9900] hover:bg-[#FA8900] text-[#131921] font-bold px-6 sm:px-10 py-3 rounded text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Create Free Account <ArrowRight size={16} />
            </Link>
            <Link
              href="#"
              className="border border-white text-white hover:bg-white hover:text-[#131921] font-semibold px-6 sm:px-10 py-3 rounded text-sm transition-colors w-full sm:w-auto"
            >
              Talk to a Counsellor
            </Link>
          </div>
          <p className="mt-4 text-[#AAAAAA] text-[10px] sm:text-xs">
            *Placement guarantee terms apply. Free registration. No credit card required.
          </p>
        </div>

      </div>

      <div className="mt-6 sm:mt-8">
        <Footer />
      </div>
    </div>
  );
}