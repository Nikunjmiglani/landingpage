"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Star, Shield, Users, Briefcase, TrendingUp, Award,
  BookOpen, ArrowRight, ChevronLeft, ChevronRight,
  CheckCircle, Clock, Play, Zap, Lock
} from "lucide-react";

const stats = [
  { label: "Freshers Placed", rawValue: 12400, suffix: "+", decimals: 0, icon: Users },
  { label: "Partner Companies", rawValue: 380, suffix: "+", decimals: 0, icon: Briefcase },
  { label: "Success Rate", rawValue: 94, suffix: "%", decimals: 0, icon: TrendingUp },
  { label: "Average Salary Hike", rawValue: 2.8, suffix: "x", decimals: 1, icon: Award },
];

const testimonials = [
  { name: "Rahul Sharma", college: "SRM University", stars: 5, text: "The resume review and interview preparation sessions helped me gain confidence. I received an offer within a month.", role: "Software Engineer @ TCS" },
  { name: "Priya Verma", college: "Delhi University", stars: 5, text: "The team guided me throughout the placement process and helped improve my communication skills.", role: "Analyst @ Wipro" },
  { name: "Aman Gupta", college: "AKTU", stars: 5, text: "Very professional counselling and quick support whenever I had questions.", role: "Associate Engineer @ Infosys" },
  { name: "Sneha Kapoor", college: "IP University", stars: 5, text: "The mock interviews were extremely useful and helped me identify my weak areas.", role: "Graduate Trainee @ Cognizant" },
  { name: "Rohit Yadav", college: "Amity University", stars: 5, text: "Excellent guidance from profile creation to final interview rounds.", role: "Support Engineer @ HCL" },
  { name: "Neha Singh", college: "Galgotias University", stars: 5, text: "Things improved significantly after joining. I started getting interview calls within weeks.", role: "Associate Consultant @ Capgemini" },
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

const LEVEL_LABELS: Record<string, string> = { BEGINNER: "Beginner", INTERMEDIATE: "Intermediate", ADVANCED: "Advanced" };
const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "bg-green-100 text-green-700",
  INTERMEDIATE: "bg-yellow-100 text-yellow-700",
  ADVANCED: "bg-red-100 text-red-700",
};

function useCountUp(target: number, duration = 1800, decimals = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals]);
  return [value, ref] as const;
}

function StatCard({ icon: Icon, rawValue, suffix, decimals, label }: {
  icon: React.ElementType; rawValue: number; suffix: string; decimals: number; label: string;
}) {
  const [value, ref] = useCountUp(rawValue, 1800, decimals);
  return (
    <div ref={ref} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
        <Icon size={22} className="text-[#FF9900]" />
      </div>
      <p className="text-3xl font-bold text-gray-900">
        {decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
    </div>
  );
}

interface Course {
  id: string; title: string; slug: string; shortDescription: string;
  thumbnailUrl?: string | null; instructor?: string | null; level: string;
  price: number; discount: number; language: string; duration?: string | null;
  category?: { name: string } | null;
  _count: { enrollments: number; modules: number };
}

function CourseCard({ course }: { course: Course }) {
  const effectivePrice = course.price - (course.price * course.discount) / 100;
  return (
    <Link href={`/courses/${course.slug}`} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange-200 transition-all group flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-44 bg-gradient-to-br from-[#232F3E] to-[#37475A] overflow-hidden">
        {course.thumbnailUrl ? (
          <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-14 w-14 text-white/20" />
          </div>
        )}
        {course.discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#FF9900] text-gray-900 text-xs font-bold px-2.5 py-1 rounded-lg">
            {course.discount}% OFF
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm">
          {LEVEL_LABELS[course.level] ?? course.level}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {course.category && (
          <p className="text-xs font-semibold text-[#FF9900] uppercase tracking-wide mb-1">{course.category.name}</p>
        )}
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#FF9900] transition-colors">{course.title}</h3>
        {course.instructor && (
          <p className="text-xs text-gray-500 mb-3">{course.instructor}</p>
        )}
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">{course.shortDescription}</p>

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
          {course._count.modules > 0 && (
            <span className="flex items-center gap-1"><BookOpen size={11} /> {course._count.modules} modules</span>
          )}
          {course.duration && (
            <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
          )}
          <span className="flex items-center gap-1"><Users size={11} /> {course._count.enrollments} enrolled</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {effectivePrice === 0 ? "Free" : `₹${effectivePrice.toFixed(0)}`}
            </span>
            {course.discount > 0 && (
              <span className="text-xs text-gray-400 line-through ml-2">₹{course.price}</span>
            )}
          </div>
          <span className="text-xs font-semibold text-[#FF9900] group-hover:underline">View Course →</span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerPage(1);
      else if (window.innerWidth < 1024) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    fetch("/api/courses?featured=true")
      .then(r => r.json())
      .then(data => setCourses(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => {});
  }, []);

  const visible = testimonials.slice(testimonialIndex, testimonialIndex + perPage);
  const next = () => testimonialIndex + perPage < testimonials.length ? setTestimonialIndex(i => i + perPage) : setTestimonialIndex(0);
  const prev = () => testimonialIndex - perPage >= 0 ? setTestimonialIndex(i => i - perPage) : setTestimonialIndex(Math.max(0, testimonials.length - perPage));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#1a2332] via-[#232F3E] to-[#2d3f52] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#FF9900]/15 border border-[#FF9900]/30 text-[#FF9900] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900] animate-pulse" />
              #1 Fresher Placement Platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-5">
              Your Career<br />Starts Here.<br />
              <span className="text-[#FF9900]">We Get You Placed.</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              India&apos;s most trusted career consultancy for freshers. From resume to offer letter — we handle everything.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/onboarding" className="inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#e88d00] text-gray-900 font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/25 hover:scale-[1.02]">
                Get Started Free <ArrowRight size={16} />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all">
                Sign In to Portal
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start text-xs text-gray-400">
              {["Free registration", "No hidden charges", "Placement guarantee*"].map(t => (
                <span key={t} className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#FF9900]" /> {t}</span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64">
              <div className="absolute inset-0 bg-[#FF9900]/20 blur-3xl rounded-full" />
              <div className="relative w-full h-full rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden ring-4 ring-white/10">
                <img src="/logo.png" alt="HireVexa" className="w-3/4 h-3/4 object-contain" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-black/20 py-3 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-gray-300">
            <span>🚀 <strong className="text-white">12,000+</strong> placed this year</span>
            <span className="hidden sm:inline">📞 <strong className="text-white">Free counselling</strong> every Monday</span>
            <span>💼 <strong className="text-white">380+ hiring partners</strong></span>
            <Link href="/onboarding" className="text-[#FF9900] hover:underline font-semibold">Register Today →</Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── Featured Courses ── */}
      {courses.length > 0 && (
        <section className="bg-gray-50 border-y border-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#FF9900] mb-2">Skill Up</p>
                <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
                <p className="text-gray-500 text-sm mt-2">Learn in-demand skills and boost your placement chances.</p>
              </div>
              <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF9900] hover:underline flex-shrink-0">
                View all courses <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Hiring Partners ── */}
      <section className={`${courses.length > 0 ? "bg-white" : "bg-gray-50 border-y border-gray-100"} py-12 overflow-hidden`}>
        <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Trusted by Top Companies</p>
          <h2 className="text-2xl font-bold text-gray-900">Our Hiring Partners</h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-marquee w-max">
            {[...companies, ...companies].map((c, i) => (
              <div key={i} className="flex-shrink-0 bg-white border border-gray-200 rounded-xl px-8 py-5 min-w-[160px] flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
                <img src={c.logo} alt={c.name} className="h-10 object-contain" />
                <p className="text-xs font-semibold text-gray-600">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FF9900] mb-2">Simple Process</p>
          <h2 className="text-3xl font-bold text-gray-900">How HireVexa Works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
          {[
            { title: "Register & Onboard", desc: "Fill your profile, upload resume, share your career goals", icon: BookOpen },
            { title: "Counselling Session", desc: "Expert counsellor maps your profile to the right opportunities", icon: Users },
            { title: "Prep & Apply", desc: "Interview coaching, resume polish, apply to matched roles", icon: Shield },
            { title: "Get Placed!", desc: "Offer letter → salary negotiation → joining support", icon: Award },
          ].map((s, i) => (
            <div key={s.title} className="flex flex-col items-center text-center group">
              <div className="relative mb-5">
                <div className="w-20 h-20 rounded-2xl bg-[#232F3E] text-white flex items-center justify-center shadow-lg group-hover:bg-[#FF9900] transition-colors duration-300">
                  <s.icon size={28} />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#FF9900] text-gray-900 text-xs font-bold flex items-center justify-center border-2 border-white">{i + 1}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Director message ── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-72 bg-gradient-to-br from-[#232F3E] to-[#37475A] p-10 flex flex-col items-center justify-center text-center text-white flex-shrink-0">
                <div className="w-28 h-28 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-6xl mb-4">👨‍💼</div>
                <h4 className="font-bold text-lg">Mr. Siddharth Vats</h4>
                <p className="text-[#FF9900] text-sm font-semibold mt-1">Director & Founder</p>
                <p className="text-gray-400 text-xs mt-1">HireVexa Consultancy</p>
              </div>
              <div className="flex-1 p-8 sm:p-10">
                <div className="inline-block bg-orange-50 text-[#FF9900] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider border border-orange-100">Message From Director</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">Empowering India&apos;s Next Generation of Professionals</h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                  <p>At HireVexa, our vision has always been simple — bridge the gap between education and employment. Every year thousands of talented graduates struggle not because they lack potential, but because they lack guidance, opportunities, and industry exposure.</p>
                  <p>Our mission is to ensure that every student receives the right career direction, professional training, and placement opportunities required to succeed in today&apos;s competitive job market.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF9900] mb-2">Success Stories</p>
            <h2 className="text-3xl font-bold text-gray-900">Candidate Reviews</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition shadow-sm"><ChevronLeft size={18} /></button>
            <span className="text-xs text-gray-400 w-10 text-center">{Math.floor(testimonialIndex / perPage) + 1}/{Math.ceil(testimonials.length / perPage)}</span>
            <button onClick={next} className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition shadow-sm"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map(t => (
            <div key={t.name} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-[#232F3E] text-white flex items-center justify-center font-bold text-base flex-shrink-0">{t.name[0]}</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.college}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={13} className={i < t.stars ? "fill-[#FF9900] text-[#FF9900]" : "text-gray-200 fill-gray-200"} />)}</div>
              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="pt-3 border-t border-gray-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <CheckCircle size={11} /> {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-gradient-to-br from-[#232F3E] to-[#1a2332] text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3">Ready to Start Your Career Journey?</h2>
            <p className="text-gray-300 mb-8 text-sm sm:text-base max-w-xl mx-auto">Join 12,400+ freshers who trusted HireVexa and landed their dream jobs.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/onboarding" className="inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#e88d00] text-gray-900 font-bold px-10 py-4 rounded-xl text-sm transition-all shadow-lg hover:scale-[1.02]">
                Create Free Account <ArrowRight size={16} />
              </Link>
              <Link href="/courses" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-sm transition-all">
                <BookOpen size={15} /> Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}