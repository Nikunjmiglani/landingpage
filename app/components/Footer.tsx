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

          {/* Logo — mobile only */}
          <div className="flex flex-col items-center mb-6 sm:hidden">
            <div className="flex items-center gap-2 mb-1">
              <img src="/logo.png" alt="HireVexa Logo" className="h-8 w-8 object-contain rounded-full bg-white p-0.5" />
              <span className="text-white font-bold text-lg">HireVexa</span>
              <span className="text-[#FF9900] text-[10px] font-semibold tracking-widest uppercase">Consultancy</span>
            </div>
            <p className="text-[#AAAAAA] text-[10px] text-center">India's Fresher Career Partner</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

            {/* Company */}
            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 text-white">Company</h4>
              <ul className="space-y-2 text-[#DDDDDD] text-xs sm:text-sm">
                <li><Link href="/about" className="hover:text-white hover:underline">About HireVexa</Link></li>
                <li><Link href="/jobs" className="hover:text-white hover:underline">Browse Jobs</Link></li>
                <li><Link href="/courses" className="hover:text-white hover:underline">Skill Courses</Link></li>
                <li><Link href="/onboarding" className="hover:text-white hover:underline">Get Placed</Link></li>
              </ul>
            </div>

            {/* Candidates */}
            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 text-white">For Candidates</h4>
              <ul className="space-y-2 text-[#DDDDDD] text-xs sm:text-sm">
                <li><Link href="/onboarding" className="hover:text-white hover:underline">Register Free</Link></li>
                <li><Link href="/dashboard/resume" className="hover:text-white hover:underline">Upload Resume</Link></li>
                <li><Link href="/dashboard/profile" className="hover:text-white hover:underline">Edit Profile</Link></li>
                <li><Link href="/dashboard" className="hover:text-white hover:underline">My Dashboard</Link></li>
                <li><Link href="/dashboard/courses" className="hover:text-white hover:underline">My Courses</Link></li>
              </ul>
            </div>

            {/* Learn */}
            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 text-white">Learn & Grow</h4>
              <ul className="space-y-2 text-[#DDDDDD] text-xs sm:text-sm">
                <li><Link href="/courses" className="hover:text-white hover:underline">All Courses</Link></li>
                <li><Link href="/jobs" className="hover:text-white hover:underline">Latest Jobs</Link></li>
                <li><Link href="/resume-building" className="hover:text-white hover:underline">Resume Building</Link></li>
                <li><Link href="/job-placement" className="hover:text-white hover:underline">Job Placement</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-3 text-white">Support</h4>
              <ul className="space-y-2 text-[#DDDDDD] text-xs sm:text-sm">
                <li><Link href="/login" className="hover:text-white hover:underline">Sign In</Link></li>
                <li><Link href="/onboarding" className="hover:text-white hover:underline">Create Account</Link></li>
                <li>
                  <a href="mailto:hirevexaconsultancy01@gmail.com" className="hover:text-white hover:underline">
                    Email Support
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                    WhatsApp Us
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-[#37475A] mt-8 pt-6">
            {/* Contact strip */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-[#AAAAAA] text-[10px] sm:text-xs mb-4 text-center">
              <a href="mailto:hirevexaconsultancy01@gmail.com" className="hover:text-white transition">
                📧 hirevexaconsultancy01@gmail.com
              </a>
              <span>🕐 Mon–Sat, 9am–6pm IST</span>
              <span>📍 Pan India</span>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-3 mb-2">
              {[
                { label: "LinkedIn", href: "https://linkedin.com/company/hirevexa", icon: "in" },
                { label: "Instagram", href: "https://instagram.com/hirevexa", icon: "ig" },
                { label: "YouTube", href: "https://youtube.com/@hirevexa", icon: "yt" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-[#37475A] hover:bg-[#FF9900] hover:text-[#131921] text-white flex items-center justify-center text-[10px] font-bold transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#131921] py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">

          <div className="hidden sm:flex items-center gap-2">
            <img src="/logo.png" alt="HireVexa Logo" className="h-7 w-7 object-contain rounded-full bg-white p-0.5" />
            <span className="text-white font-bold text-base">HireVexa</span>
            <span className="text-[#FF9900] text-[10px] font-semibold tracking-widest uppercase">Consultancy</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-[#DDDDDD] text-[10px] sm:text-xs">
            <Link href="/about" className="hover:text-white hover:underline">About</Link>
            <Link href="/jobs" className="hover:text-white hover:underline">Jobs</Link>
            <Link href="/courses" className="hover:text-white hover:underline">Courses</Link>
            <Link href="/login" className="hover:text-white hover:underline">Login</Link>
          </div>

          <p className="text-[#AAAAAA] text-[10px] sm:text-xs text-center">
            © 2025 HireVexa Consultancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}