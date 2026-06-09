"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X, MapPin, User } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="bg-[#131921] text-white">
        {/* Main nav */}
        <div className="flex items-center gap-2 px-3 py-2">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-2 border border-transparent hover:border-white px-2 py-1 rounded flex-shrink-0">
            <img
              src="/logo.png"
              alt="HireVexa Logo"
              className="h-8 w-8 object-contain rounded-full bg-white p-0.5"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-lg tracking-tight">HireVexa</span>
              <span className="text-[#FF9900] text-[9px] font-semibold tracking-widest uppercase hidden sm:block">Consultancy</span>
            </div>
          </Link>

          {/* Deliver to — hidden on mobile */}
          <div className="hidden lg:flex flex-col text-xs px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer flex-shrink-0">
            <span className="text-[#CCCCCC] text-[10px]">Serving</span>
            <div className="flex items-center gap-1 font-bold text-sm">
              <MapPin size={14} className="text-white" />
              <span>Pan India</span>
            </div>
          </div>

          {/* Search bar — hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-1 mx-2">
            <div className="flex items-center bg-[#37475A] px-3 py-1 rounded-l text-white text-xs cursor-pointer hover:bg-[#4a5568] whitespace-nowrap flex-shrink-0">
              <span>All</span>
              <ChevronDown size={12} className="ml-1" />
            </div>
            <input
              type="text"
              placeholder="Search for jobs, courses, consultancy services..."
              className="flex-1 px-3 py-2 text-white text-sm outline-none min-w-0"
            />
            <button className="bg-[#FF9900] hover:bg-[#FA8900] px-4 rounded-r flex-shrink-0">
              <Search size={20} className="text-[#131921]" />
            </button>
          </div>

          {/* Nav links — desktop only */}
          <div className="hidden md:flex items-center gap-1 ml-1 flex-shrink-0">
            <Link href="/login" className="flex flex-col text-xs px-2 py-1 border border-transparent hover:border-white rounded">
              <span className="text-[#CCCCCC] text-[10px]">Hello, Sign in</span>
              <div className="flex items-center gap-1 font-bold text-sm whitespace-nowrap">
                <span>Account</span>
                <ChevronDown size={12} />
              </div>
            </Link>

            <Link href="/dashboard" className="flex flex-col text-xs px-2 py-1 border border-transparent hover:border-white rounded">
              <span className="text-[#CCCCCC] text-[10px]">Track</span>
              <span className="font-bold text-sm whitespace-nowrap">Applications</span>
            </Link>

            <Link href="/onboarding" className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded">
              <User size={22} />
              <div className="flex flex-col text-xs">
                <span className="text-[#CCCCCC] text-[10px]">New here?</span>
                <span className="font-bold text-sm whitespace-nowrap">Get Started</span>
              </div>
            </Link>
          </div>

          {/* Mobile right side actions */}
          <div className="flex items-center gap-2 ml-auto md:hidden">
            

            {/* Sign in icon */}
            <Link href="/login" className="p-1 border border-transparent hover:border-white rounded">
              <User size={22} />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 border border-transparent hover:border-white rounded"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar — expands when search icon tapped */}
        {searchOpen && (
          <div className="flex md:hidden px-3 pb-2">
            <input
              type="text"
              placeholder="Search jobs, courses, services..."
              className="flex-1 px-3 py-2 text-black text-sm outline-none rounded-l"
              autoFocus
            />
            <button className="bg-[#FF9900] hover:bg-[#FA8900] px-4 rounded-r">
              <Search size={18} className="text-[#131921]" />
            </button>
          </div>
        )}

        {/* Sub nav */}
        {/* Sub nav */}
<div className="bg-[#232F3E] flex items-center gap-1 px-3 py-1 overflow-x-auto scrollbar-hide">
  <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap border border-transparent hover:border-white flex-shrink-0">
    <Menu size={16} />
    <span className="font-semibold">All</span>
  </button>

  <Link
    href="/about"
    className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white flex-shrink-0"
  >
    About Hirevexa
  </Link>

  <Link
    href="/resume-building"
    className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white flex-shrink-0"
  >
    Resume Building
  </Link>

  <Link
    href="/job-placement"
    className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white flex-shrink-0"
  >
    Job Placement
  </Link>

  <Link
    href="/interview-prep"
    className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white flex-shrink-0"
  >
    Interview Prep  
  </Link>

  <Link
    href="/skill-courses"
    className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white flex-shrink-0"
  >
    Skill Courses
  </Link>

  <Link
    href="/internships"
    className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white flex-shrink-0"
  >
    Internships
  </Link>

  <Link
    href="/campus-drive"
    className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white flex-shrink-0"
  >
    Campus Drive
  </Link>

  <Link
    href="/mnc-referrals"
    className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white flex-shrink-0"
  >
    MNC Referrals
  </Link>

  <Link
    href="/career-counselling"
    className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white flex-shrink-0"
  >
    Career Counselling
  </Link>

  
</div>
      </header>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="bg-[#232F3E] text-white flex flex-col md:hidden shadow-xl">
          {/* User greeting */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[#37475A]">
            <div className="w-10 h-10 rounded-full bg-[#FF9900] flex items-center justify-center">
              <User size={20} className="text-[#131921]" />
            </div>
            <div>
              <p className="font-bold text-sm">Hello, User</p>
              <Link href="/login" className="text-[#FF9900] text-xs hover:underline">Sign in to your account →</Link>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col divide-y divide-[#37475A]">
            <Link href="/onboarding" className="flex items-center gap-3 px-4 py-3 hover:bg-[#37475A] transition-colors">
              <span className="text-[#FF9900]">🚀</span>
              <div>
                <p className="font-semibold text-sm">Get Started Free</p>
                <p className="text-[#CCCCCC] text-xs">Register & begin your placement journey</p>
              </div>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-[#37475A] transition-colors">
              <span>📋</span>
              <div>
                <p className="font-semibold text-sm">My Applications</p>
                <p className="text-[#CCCCCC] text-xs">Track your job applications</p>
              </div>
            </Link>
            <Link href="/login" className="flex items-center gap-3 px-4 py-3 hover:bg-[#37475A] transition-colors">
              <span>👤</span>
              <div>
                <p className="font-semibold text-sm">Account & Portal</p>
                <p className="text-[#CCCCCC] text-xs">Sign in or manage your profile</p>
              </div>
            </Link>
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-[#37475A] transition-colors">
              <span>🔧</span>
              <div>
                <p className="font-semibold text-sm">Admin Portal</p>
                <p className="text-[#CCCCCC] text-xs">For team members only</p>
              </div>
            </Link>
          </div>

          {/* Services quick links */}
<div className="px-4 py-3 border-t border-[#37475A]">
  <p className="text-[#CCCCCC] text-xs font-semibold uppercase tracking-wider mb-2">
    Our Services
  </p>

  <div className="grid grid-cols-2 gap-2">

    <Link
      href="/resume-building"
      className="text-sm text-white hover:text-[#FF9900] py-1 transition-colors"
    >
      → Resume Building
    </Link>

    <Link
      href="/job-placement"
      className="text-sm text-white hover:text-[#FF9900] py-1 transition-colors"
    >
      → Job Placement
    </Link>

    <Link
      href="/interview-prep"
      className="text-sm text-white hover:text-[#FF9900] py-1 transition-colors"
    >
      → Interview Prep
    </Link>

    <Link
      href="/skill-courses"
      className="text-sm text-white hover:text-[#FF9900] py-1 transition-colors"
    >
      → Skill Courses
    </Link>

    <Link
      href="/internships"
      className="text-sm text-white hover:text-[#FF9900] py-1 transition-colors"
    >
      → Internships
    </Link>

    <Link
      href="/campus-drive"
      className="text-sm text-white hover:text-[#FF9900] py-1 transition-colors"
    >
      → Campus Drive
    </Link>

    <Link
      href="/mnc-referrals"
      className="text-sm text-white hover:text-[#FF9900] py-1 transition-colors"
    >
      → MNC Referrals
    </Link>

    <Link
      href="/career-counselling"
      className="text-sm text-white hover:text-[#FF9900] py-1 transition-colors"
    >
      → Career Counselling
    </Link>

  </div>
</div>

          {/* CTA */}
          <div className="px-4 py-4 border-t border-[#37475A]">
            <Link
              href="/onboarding"
              className="block w-full bg-[#FF9900] hover:bg-[#FA8900] text-[#131921] font-bold py-3 rounded text-center text-sm transition-colors"
            >
              Register Free — Get Placed Today
            </Link>
          </div>
        </div>
      )}
    </>
  );
}