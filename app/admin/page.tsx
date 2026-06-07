"use client";
import { useState } from "react";
import Link from "next/link";
import { Users, Briefcase, TrendingUp, CheckCircle, Search, Filter, ChevronRight, Settings, Bell, LogOut, BarChart2, FileText, Calendar } from "lucide-react";

const candidates = [
  { id: "CB001", name: "Rahul Sharma", degree: "B.Tech CSE", college: "DTU Delhi", status: "Interview Stage", counsellor: "Ms. Anita", score: 85, applied: 5 },
  { id: "CB002", name: "Priya Gupta", degree: "BCA", college: "DU Delhi", status: "Placed", counsellor: "Mr. Ravi", score: 92, applied: 8 },
  { id: "CB003", name: "Amit Singh", degree: "B.Tech ECE", college: "NIT Trichy", status: "Onboarding", counsellor: "Ms. Divya", score: 70, applied: 2 },
  { id: "CB004", name: "Sneha Reddy", degree: "MBA", college: "NMIMS", status: "Placed", counsellor: "Ms. Anita", score: 95, applied: 12 },
  { id: "CB005", name: "Karan Mehta", degree: "B.Sc IT", college: "Mumbai Univ.", status: "Resume Review", counsellor: "Mr. Ravi", score: 60, applied: 0 },
  { id: "CB006", name: "Divya Nair", degree: "B.Tech CSE", college: "VIT Vellore", status: "Offer Received", counsellor: "Ms. Divya", score: 88, applied: 6 },
];

const statusColor: Record<string, string> = {
  "Placed": "bg-[#E4F5F0] text-[#067D62]",
  "Interview Stage": "bg-[#E8F7F9] text-[#007185]",
  "Offer Received": "bg-[#FFFBE6] text-[#C45500]",
  "Onboarding": "bg-[#F0F2F2] text-[#565959]",
  "Resume Review": "bg-[#FFF0F0] text-[#CC0C39]",
};

export default function AdminPage() {
  const [tab, setTab] = useState("candidates");
  const [search, setSearch] = useState("");

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#EAEDED] flex">
      {/* Sidebar */}
      <aside className="w-52 bg-[#131921] text-white flex flex-col hidden md:flex">
        <div className="p-4 border-b border-[#232F3E]">
          <div className="text-lg font-bold">CareerBridge</div>
          <div className="text-[#FF9900] text-[10px] tracking-widest uppercase font-semibold">Admin Portal</div>
        </div>
        <nav className="flex-1 py-4">
          {[
            { label: "Dashboard", icon: BarChart2, tab: "overview" },
            { label: "Candidates", icon: Users, tab: "candidates" },
            { label: "Job Postings", icon: Briefcase, tab: "jobs" },
            { label: "Sessions", icon: Calendar, tab: "sessions" },
            { label: "Reports", icon: FileText, tab: "reports" },
            { label: "Settings", icon: Settings, tab: "settings" },
          ].map(item => (
            <button key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${tab === item.tab ? "bg-[#232F3E] text-[#FF9900] font-semibold" : "text-[#CCCCCC] hover:bg-[#232F3E]"}`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#232F3E]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center text-[#131921] font-bold text-xs">A</div>
            <div>
              <p className="text-xs font-semibold">Admin User</p>
              <p className="text-[10px] text-[#AAAAAA]">Super Admin</p>
            </div>
          </div>
          <Link href="/login" className="flex items-center gap-2 text-[#CCCCCC] hover:text-white text-xs">
            <LogOut size={14} /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-[#232F3E] text-white px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Admin Dashboard</h1>
            <p className="text-[#CCCCCC] text-xs">CareerBridge Management Portal</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC0C39] rounded-full text-[9px] font-bold flex items-center justify-center">3</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center text-[#131921] font-bold text-xs">A</div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          {/* KPI cards always visible */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Total Candidates", value: "248", delta: "+12 this week", icon: Users, color: "text-[#007185]" },
              { label: "Placed This Month", value: "34", delta: "+8 vs last month", icon: CheckCircle, color: "text-[#067D62]" },
              { label: "Active Applications", value: "187", delta: "Across 45 companies", icon: Briefcase, color: "text-[#C45500]" },
              { label: "Placement Rate", value: "94%", delta: "↑ 2% vs last quarter", icon: TrendingUp, color: "text-[#FF9900]" },
            ].map(k => (
              <div key={k.label} className="bg-white border border-[#DDD] rounded p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <k.icon size={20} className={k.color} />
                  <span className="text-[10px] text-[#565959]">↑ Live</span>
                </div>
                <p className="text-2xl font-bold text-[#0F1111]">{k.value}</p>
                <p className="text-xs text-[#565959]">{k.label}</p>
                <p className={`text-xs font-semibold mt-1 ${k.color}`}>{k.delta}</p>
              </div>
            ))}
          </div>

          {/* Candidates Table */}
          {(tab === "candidates" || tab === "overview") && (
            <div className="bg-white border border-[#DDD] rounded">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 py-3 border-b border-[#EAEDED]">
                <h3 className="font-bold text-[#0F1111]">Candidate Management</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-[#DDD] rounded px-3 py-1.5 gap-2">
                    <Search size={14} className="text-[#565959]" />
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="text-sm outline-none w-40 text-[#0F1111]"
                    />
                  </div>
                  <button className="flex items-center gap-1 border border-[#DDD] rounded px-3 py-1.5 text-sm text-[#565959] hover:bg-[#F0F2F2]">
                    <Filter size={14} /> Filter
                  </button>
                  <button className="bg-[#FF9900] text-[#131921] font-bold text-xs px-4 py-2 rounded hover:bg-[#FA8900]">
                    + Add Candidate
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F0F2F2] border-b border-[#DDD]">
                      <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase">ID</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase">Candidate</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase hidden md:table-cell">Education</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase hidden md:table-cell">Counsellor</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase hidden md:table-cell">Profile</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => (
                      <tr key={c.id} className={`border-b border-[#EAEDED] hover:bg-[#F7F7F7] cursor-pointer ${i % 2 === 0 ? "" : "bg-[#FAFAFA]"}`}>
                        <td className="px-4 py-3 text-xs text-[#007185] font-semibold">{c.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#232F3E] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {c.name[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-[#0F1111]">{c.name}</p>
                              <p className="text-xs text-[#565959]">{c.applied} applications</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <p className="text-xs font-semibold text-[#0F1111]">{c.degree}</p>
                          <p className="text-xs text-[#565959]">{c.college}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${statusColor[c.status] || "bg-[#F0F2F2] text-[#565959]"}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-xs text-[#565959]">{c.counsellor}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[#EAEDED] rounded-full">
                              <div className="h-1.5 bg-[#FF9900] rounded-full" style={{ width: `${c.score}%` }} />
                            </div>
                            <span className="text-xs text-[#565959]">{c.score}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="text-[#007185] text-xs hover:underline">View</button>
                            <button className="text-[#007185] text-xs hover:underline">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-4 py-3 border-t border-[#EAEDED] text-xs text-[#565959]">
                <span>Showing {filtered.length} of {candidates.length} candidates</span>
                <div className="flex items-center gap-1">
                  <button className="px-2 py-1 border border-[#DDD] rounded hover:bg-[#F0F2F2]">Prev</button>
                  <button className="px-2 py-1 bg-[#232F3E] text-white rounded">1</button>
                  <button className="px-2 py-1 border border-[#DDD] rounded hover:bg-[#F0F2F2]">2</button>
                  <button className="px-2 py-1 border border-[#DDD] rounded hover:bg-[#F0F2F2]">Next</button>
                </div>
              </div>
            </div>
          )}

          {/* Jobs tab */}
          {tab === "jobs" && (
            <div className="bg-white border border-[#DDD] rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0F1111]">Active Job Postings</h3>
                <button className="bg-[#FF9900] text-[#131921] font-bold text-sm px-4 py-2 rounded hover:bg-[#FA8900]">+ Post New Job</button>
              </div>
              <div className="space-y-3">
                {[
                  { company: "TCS", role: "Software Engineer", openings: 20, applied: 45, deadline: "Dec 20", status: "Active" },
                  { company: "Infosys", role: "Systems Engineer", openings: 35, applied: 78, deadline: "Dec 25", status: "Active" },
                  { company: "Wipro", role: "Project Engineer Trainee", openings: 15, applied: 32, deadline: "Dec 18", status: "Closing Soon" },
                  { company: "Accenture", role: "Associate Analyst", openings: 10, applied: 21, deadline: "Jan 5", status: "Active" },
                ].map(job => (
                  <div key={job.company + job.role} className="flex items-center gap-4 p-4 border border-[#DDD] rounded hover:bg-[#F7F7F7]">
                    <div className="w-10 h-10 rounded bg-[#232F3E] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {job.company[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-[#0F1111]">{job.company} — {job.role}</p>
                      <p className="text-xs text-[#565959]">{job.openings} openings · {job.applied} applied · Deadline: {job.deadline}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${job.status === "Active" ? "bg-[#E4F5F0] text-[#067D62]" : "bg-[#FFEEDD] text-[#CC0C39]"}`}>
                      {job.status}
                    </span>
                    <ChevronRight size={14} className="text-[#565959]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "reports" && (
            <div className="bg-white border border-[#DDD] rounded p-6">
              <h3 className="font-bold text-[#0F1111] mb-4">Reports & Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Monthly Placement Report", desc: "Placements, salaries, companies — Dec 2024", icon: "📊" },
                  { title: "Counsellor Performance", desc: "Sessions handled, placement rate by counsellor", icon: "👤" },
                  { title: "Company-wise Analysis", desc: "Applications, selections, offer rates by company", icon: "🏢" },
                  { title: "Revenue Report", desc: "Service-wise revenue and collection status", icon: "💰" },
                ].map(r => (
                  <div key={r.title} className="flex items-start gap-3 p-4 border border-[#DDD] rounded hover:bg-[#F7F7F7] cursor-pointer">
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <p className="font-bold text-sm text-[#0F1111]">{r.title}</p>
                      <p className="text-xs text-[#565959] mb-2">{r.desc}</p>
                      <button className="text-[#007185] text-xs hover:underline">Download PDF →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
