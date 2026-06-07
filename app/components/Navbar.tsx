"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X, MapPin, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Amazon style */}
      <header className="bg-[#131921] text-white">
        {/* Main nav */}
        <div className="flex items-center gap-2 px-3 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-2 border border-transparent hover:border-white px-2 py-1 rounded">
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-xl tracking-tight">HireVexa</span>
              <span className="text-[#FF9900] text-[10px] font-semibold tracking-widest uppercase">Consultancy</span>
            </div>
          </Link>

          {/* Deliver to */}
          <div className="hidden md:flex flex-col text-xs px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer">
            <span className="text-[#CCCCCC] text-[10px]">Serving</span>
            <div className="flex items-center gap-1 font-bold text-sm">
              <MapPin size={14} className="text-white" />
              <span>Pan India</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex flex-1 mx-2">
            <div className="flex items-center bg-[#37475A] px-3 py-1 rounded-l text-white text-xs cursor-pointer hover:bg-[#4a5568] whitespace-nowrap">
              <span>All Services</span>
              <ChevronDown size={12} className="ml-1" />
            </div>
            <input
              type="text"
              placeholder="Search for jobs, courses, consultancy services..."
              className="flex-1 px-3 py-2 text-black text-sm outline-none"
            />
            <button className="bg-[#FF9900] hover:bg-[#FA8900] px-4 rounded-r">
              <Search size={20} className="text-[#131921]" />
            </button>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1 ml-1">
            <Link href="/login" className="flex flex-col text-xs px-2 py-1 border border-transparent hover:border-white rounded">
              <span className="text-[#CCCCCC] text-[10px]">Hello, Sign in</span>
              <div className="flex items-center gap-1 font-bold text-sm">
                <span>Account & Portal</span>
                <ChevronDown size={12} />
              </div>
            </Link>

            <Link href="/dashboard" className="flex flex-col text-xs px-2 py-1 border border-transparent hover:border-white rounded">
              <span className="text-[#CCCCCC] text-[10px]">Track</span>
              <span className="font-bold text-sm">Applications</span>
            </Link>

            <Link href="/onboarding" className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded">
              <User size={24} />
              <div className="flex flex-col text-xs">
                <span className="text-[#CCCCCC] text-[10px]">New here?</span>
                <span className="font-bold text-sm">Get Started</span>
              </div>
            </Link>
          </div>

          <button className="md:hidden ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sub nav */}
        <div className="bg-[#232F3E] flex items-center gap-1 px-3 py-1 overflow-x-auto">
          <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap border border-transparent hover:border-white">
            <Menu size={16} />
            <span className="font-semibold">All</span>
          </button>
          {["Job Placement", "Resume Building", "Interview Prep", "Skill Courses", "Internships", "Campus Drive", "MNC Referrals", "Career Counselling"].map((item) => (
            <Link key={item} href="#" className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap hover:text-white">
              {item}
            </Link>
          ))}
          <Link href="#" className="px-2 py-1 hover:bg-[#37475A] rounded text-sm whitespace-nowrap text-[#FF9900] font-semibold">
            🔥 Placement Drive
          </Link>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="bg-[#232F3E] text-white p-4 flex flex-col gap-3 md:hidden">
          <Link href="/login" className="py-2 border-b border-[#37475A]">Sign In / Account</Link>
          <Link href="/dashboard" className="py-2 border-b border-[#37475A]">Dashboard</Link>
          <Link href="/onboarding" className="py-2 border-b border-[#37475A]">Get Started</Link>
          <Link href="/admin" className="py-2">Admin Portal</Link>
        </div>
      )}
    </>
  );
}
