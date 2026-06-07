"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-[#37475A] text-white py-3 text-sm hover:bg-[#485769] transition-colors text-center block"
      >
        Back to top
      </button>

      {/* Main footer */}
      <div className="bg-[#232F3E] text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-sm mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-[#DDDDDD] text-sm">
              <li><Link href="#" className="hover:text-white hover:underline">About HireVexa</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Our Team</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Press Releases</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3">Our Services</h4>
            <ul className="space-y-2 text-[#DDDDDD] text-sm">
              <li><Link href="#" className="hover:text-white hover:underline">Job Placement</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Resume Writing</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Interview Coaching</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Skill Development</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">MNC Referrals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3">For Employers</h4>
            <ul className="space-y-2 text-[#DDDDDD] text-sm">
              <li><Link href="#" className="hover:text-white hover:underline">Post a Job</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Campus Hiring</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Bulk Recruitment</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Employer Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-[#DDDDDD] text-sm">
              <li><Link href="/onboarding" className="hover:text-white hover:underline">Register / Onboard</Link></li>
              <li><Link href="/login" className="hover:text-white hover:underline">Your Account</Link></li>
              <li><Link href="/dashboard" className="hover:text-white hover:underline">Track Applications</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Contact Support</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">Help Center</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#131921] py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">HireVexa</span>
            <span className="text-[#FF9900] text-xs font-semibold tracking-widest uppercase">Consultancy</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[#DDDDDD] text-xs">
            <Link href="#" className="hover:text-white hover:underline">Conditions of Use</Link>
            <Link href="#" className="hover:text-white hover:underline">Privacy Notice</Link>
            <Link href="#" className="hover:text-white hover:underline">Cookie Notice</Link>
            <Link href="#" className="hover:text-white hover:underline">Interest-Based Ads</Link>
          </div>
          <p className="text-[#AAAAAA] text-xs">© 2024 HireVexa Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
