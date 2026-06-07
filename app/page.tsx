import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { Star, Shield, Users, Briefcase, TrendingUp, Award, CheckCircle, BookOpen, ArrowRight } from "lucide-react";

const stats = [
  { label: "Freshers Placed", value: "12,400+", icon: Users },
  { label: "Partner Companies", value: "380+", icon: Briefcase },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
  { label: "Average Salary Hike", value: "2.8x", icon: Award },
];

const testimonials = [
  { name: "Rohan Mehta", role: "Software Engineer @ Infosys", text: "Hirevexa placed me within 3 weeks of completing my B.Tech. The resume service and mock interviews were game-changers.", stars: 5, college: "GGSIPU, Delhi" },
  { name: "Priya Sharma", role: "Business Analyst @ Deloitte", text: "I had zero idea how to crack corporate interviews. Their GD sessions and mock HR rounds prepared me completely. Got 4 offers!", stars: 5, college: "NMIMS, Mumbai" },
  { name: "Akash Verma", role: "Data Analyst @ Wipro", text: "The job matching was spot on. They understood my profile and matched me with roles that actually suited my skills.", stars: 4, college: "Anna University" },
];

const companies = [
  { name: "TCS" }, { name: "Infosys" }, { name: "Wipro" },
  { name: "Accenture" }, { name: "Deloitte" }, { name: "HCL" },
  { name: "IBM" }, { name: "Capgemini" }, { name: "Cognizant" }, { name: "Tech Mahindra" },
];

export default function HomePage() {
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

          <div className="flex-1 w-full">
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 md:p-6 w-full">
              <p className="text-[#FF9900] font-bold text-sm mb-4">📊 Live Placement Activity</p>
              {[
                { name: "Sneha R.", role: "Placed @ TCS", time: "2 mins ago", salary: "₹3.8L" },
                { name: "Amit K.", role: "Placed @ Wipro", time: "15 mins ago", salary: "₹4.2L" },
                { name: "Pooja M.", role: "Placed @ Infosys", time: "1 hr ago", salary: "₹3.5L" },
              ].map(item => (
                <div key={item.name} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center text-[#131921] font-bold text-xs">
                    {item.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{item.name} · {item.role}</p>
                    <p className="text-[#AAAAAA] text-[11px]">{item.time}</p>
                  </div>
                  <span className="text-[#67D26A] text-xs font-bold whitespace-nowrap">{item.salary}</span>
                </div>
              ))}
              <p className="text-center text-[#AAAAAA] text-[11px] mt-3">Showing real-time placements</p>
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

        {/* Partner Companies - marquee */}
        <div className="bg-white border border-[#DDD] rounded p-4 sm:p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F1111]">Our Hiring Partners</h2>
            <div className="bg-[#232F3E] px-4 py-2 rounded text-sm font-semibold text-white">380+ Companies</div>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-4 sm:gap-6 w-max animate-[marquee_25s_linear_infinite]">
              {[...companies, ...companies].map((company, i) => (
                <div key={i} className="flex-shrink-0 bg-[#F0F2F2] border border-[#DDD] rounded-lg px-5 py-3 min-w-[120px] flex items-center justify-center hover:shadow-md transition-all">
                  <p className="font-bold text-[#232F3E] text-sm text-center">{company.name}</p>
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
                Message From Chairman
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
                <h4 className="font-bold text-[#232F3E] text-lg sm:text-xl">Dr. Rajesh Sharma</h4>
                <p className="text-[#FF9900] font-semibold text-sm">Chairman & Founder, Hirevexa</p>
              </div>
            </div>
            <div className="flex justify-center w-full lg:w-auto">
              <div className="relative">
                <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#FF9900] shadow-xl bg-[#EAEDED] flex items-center justify-center">
  <span className="text-8xl">👨‍💼</span>
</div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#232F3E] text-white px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-lg whitespace-nowrap">
                  Chairman & Founder
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F1111]">Customer Reviews</h2>
            <span className="text-[#007185] text-sm hover:underline cursor-pointer">See all 12,400+ reviews</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white border border-[#DDD] rounded p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#232F3E] text-white flex items-center justify-center font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0F1111]">{t.name}</p>
                    <p className="text-xs text-[#565959]">{t.college}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < t.stars ? "fill-[#FF9900] text-[#FF9900]" : "text-[#DDD]"} />
                  ))}
                </div>
                <div className="inline-block bg-[#232F3E] text-white text-[10px] px-2 py-0.5 rounded mb-2 font-semibold">
                  ✓ Verified
                </div>
                <p className="text-xs text-[#0F1111] mb-3">&quot;{t.text}&quot;</p>
                <p className="text-xs text-[#067D62] font-semibold">{t.role}</p>
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
