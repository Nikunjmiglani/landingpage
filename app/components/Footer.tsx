"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-[#37475A] text-white py-3 text-xs sm:text-sm hover:bg-[#485769] transition-colors text-center block"
      >
        ↑ Back to top
      </button>

      {/* Main footer */}
      <div className="bg-[#232F3E] text-white py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Logo + tagline — mobile only, above links */}
          <div className="flex flex-col items-center mb-6 sm:hidden">
            <div className="flex items-center gap-2 mb-1">
              <img
                src="/logo.png"
                alt="HireVexa Logo"
                className="h-8 w-8 object-contain rounded-full bg-white p-0.5"
              />
              <span className="text-white font-bold text-lg">HireVexa</span>
              <span className="text-[#FF9900] text-[10px] font-semibold tracking-widest uppercase">Consultancy</span>
            </div>
            <p className="text-[#AAAAAA] text-[10px] text-center">India's #1 Fresher Placement Platform</p>
          </div>

          {/* Links grid — 2 col on mobile, 4 col on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 text-white">Get to Know Us</h4>
              <ul className="space-y-2 text-[#DDDDDD] text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-white hover:underline">About HireVexa</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Our Team</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Success Stories</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Press Releases</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 text-white">Our Services</h4>
              <ul className="space-y-2 text-[#DDDDDD] text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-white hover:underline">Job Placement</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Resume Writing</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Interview Coaching</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Skill Development</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">MNC Referrals</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 text-white">For Employers</h4>
              <ul className="space-y-2 text-[#DDDDDD] text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-white hover:underline">Post a Job</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Campus Hiring</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Bulk Recruitment</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Employer Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 text-white">Let Us Help You</h4>
              <ul className="space-y-2 text-[#DDDDDD] text-xs sm:text-sm">
                <li><Link href="/onboarding" className="hover:text-white hover:underline">Register / Onboard</Link></li>
                <li><Link href="/login" className="hover:text-white hover:underline">Your Account</Link></li>
                <li><Link href="/dashboard" className="hover:text-white hover:underline">Track Applications</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Contact Support</Link></li>
                <li><Link href="#" className="hover:text-white hover:underline">Help Center</Link></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#37475A] mt-8 pt-6">
            {/* Contact strip — mobile friendly */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-[#AAAAAA] text-[10px] sm:text-xs mb-4 text-center">
              <span>📧 support@hirevexa.com</span>
              <span>📞 +91 98765 43210</span>
              <span>🕐 Mon–Sat, 9am–6pm IST</span>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-3 mb-6">
              {[
                { label: "LinkedIn", href: "#", icon: "in" },
                { label: "Instagram", href: "#", icon: "ig" },
                { label: "Twitter", href: "#", icon: "tw" },
                { label: "YouTube", href: "#", icon: "yt" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-[#37475A] hover:bg-[#FF9900] hover:text-[#131921] text-white flex items-center justify-center text-[10px] font-bold transition-colors"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#131921] py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">

          {/* Logo — hidden on mobile (shown above), visible on sm+ */}
          <div className="hidden sm:flex items-center gap-2">
            <img
              src="/logo.png"
              alt="HireVexa Logo"
              className="h-7 w-7 object-contain rounded-full bg-white p-0.5"
            />
            <span className="text-white font-bold text-base">HireVexa</span>
            <span className="text-[#FF9900] text-[10px] font-semibold tracking-widest uppercase">Consultancy</span>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-3 text-[#DDDDDD] text-[10px] sm:text-xs">
            <Link href="#" className="hover:text-white hover:underline">Conditions of Use</Link>
            <Link href="#" className="hover:text-white hover:underline">Privacy Notice</Link>
            <Link href="#" className="hover:text-white hover:underline">Cookie Notice</Link>
            <Link href="#" className="hover:text-white hover:underline">Interest-Based Ads</Link>
          </div>

          {/* Copyright */}
          <p className="text-[#AAAAAA] text-[10px] sm:text-xs text-center">
            © 2024 HireVexa Consultancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}