"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Users, Briefcase, TrendingUp, CheckCircle, Search, Filter,
  ChevronRight, Settings, Bell, LogOut, BarChart2, FileText, Calendar, Loader2
} from "lucide-react";

const statusColor: Record<string, string> = {
  "PLACED":          "bg-[#E4F5F0] text-[#067D62]",
  "INTERVIEW_STAGE": "bg-[#E8F7F9] text-[#007185]",
  "OFFER_RECEIVED":  "bg-[#FFFBE6] text-[#C45500]",
  "ONBOARDING":      "bg-[#F0F2F2] text-[#565959]",
  "RESUME_REVIEW":   "bg-[#FFF0F0] text-[#CC0C39]",
};

const statusLabel: Record<string, string> = {
  PLACED: "Placed", INTERVIEW_STAGE: "Interview Stage",
  OFFER_RECEIVED: "Offer Received", ONBOARDING: "Onboarding", RESUME_REVIEW: "Resume Review",
};

type Candidate = {
  id: string; firstName: string; lastName: string;
  degree: string | null; college: string | null;
  status: string; profileScore: number;
  user: { email: string; createdAt: string };
  applications: { id: string }[];
};

type Stats = {
  totalCandidates: number; placedThisMonth: number;
  activeApplications: number; placementRate: number;
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState("candidates");
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session?.user?.role !== "ADMIN") router.push("/dashboard");
  }, [status, session, router]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      setStats(await res.json());
    } catch (e) { console.error(e); }
  }, []);

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, page: String(page) });
      const res = await fetch(`/api/admin/candidates?${params}`);
      const data = await res.json();
      setCandidates(data.candidates ?? []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? 1);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, page]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      fetchStats();
    }
  }, [status, session, fetchStats]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      const t = setTimeout(fetchCandidates, 300);
      return () => clearTimeout(t);
    }
  }, [search, page, status, session, fetchCandidates]);

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch("/api/admin/candidates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    fetchCandidates();
    fetchStats();
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-[#EAEDED] flex items-center justify-center"><Loader2 className="animate-spin text-[#FF9900]" size={32} /></div>;
  }

  const kpis = [
    { label: "Total Candidates",    value: stats?.totalCandidates ?? "—",          delta: "All registered",       icon: Users,      color: "text-[#007185]" },
    { label: "Placed This Month",   value: stats?.placedThisMonth ?? "—",           delta: "This month",           icon: CheckCircle,color: "text-[#067D62]" },
    { label: "Active Applications", value: stats?.activeApplications ?? "—",        delta: "Across all companies", icon: Briefcase,  color: "text-[#C45500]" },
    { label: "Placement Rate",      value: stats ? `${stats.placementRate}%` : "—", delta: "Overall",              icon: TrendingUp, color: "text-[#FF9900]" },
  ];

  return (
    <div className="min-h-screen bg-[#EAEDED] flex">
      {/* Sidebar */}
      <aside className="w-52 bg-[#131921] text-white flex-col hidden md:flex">
        <div className="p-4 border-b border-[#232F3E]">
          <div className="text-lg font-bold">Hirevexa</div>
          <div className="text-[#FF9900] text-[10px] tracking-widest uppercase font-semibold">Admin Portal</div>
        </div>
        <nav className="flex-1 py-4">
          {[
            { label: "Dashboard",    icon: BarChart2, tab: "overview" },
            { label: "Candidates",   icon: Users,     tab: "candidates" },
            { label: "Job Postings", icon: Briefcase, tab: "jobs" },
            { label: "Sessions",     icon: Calendar,  tab: "sessions" },
            { label: "Reports",      icon: FileText,  tab: "reports" },
            { label: "Settings",     icon: Settings,  tab: "settings" },
          ].map(item => (
            <button key={item.tab} onClick={() => setTab(item.tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${tab === item.tab ? "bg-[#232F3E] text-[#FF9900] font-semibold" : "text-[#CCCCCC] hover:bg-[#232F3E]"}`}>
              <item.icon size={16} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#232F3E]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center text-[#131921] font-bold text-xs">A</div>
            <div>
              <p className="text-xs font-semibold truncate max-w-[100px]">{session?.user?.email}</p>
              <p className="text-[10px] text-[#AAAAAA]">Super Admin</p>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 text-[#CCCCCC] hover:text-white text-xs">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-[#232F3E] text-white px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Admin Dashboard</h1>
            <p className="text-[#CCCCCC] text-xs">Hirevexa Management Portal</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative"><Bell size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center text-[#131921] font-bold text-xs">A</div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {kpis.map(k => (
              <div key={k.label} className="bg-white border border-[#DDD] rounded p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <k.icon size={20} className={k.color} />
                  <span className="text-[10px] text-[#565959]">Live</span>
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
                <h3 className="font-bold text-[#0F1111]">
                  Candidate Management{" "}
                  {total > 0 && <span className="text-[#565959] font-normal text-sm">({total} total)</span>}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-[#DDD] rounded px-3 py-1.5 gap-2">
                    <Search size={14} className="text-[#565959]" />
                    <input type="text" placeholder="Search candidates..." value={search}
                      onChange={e => { setSearch(e.target.value); setPage(1); }}
                      className="text-sm outline-none w-40 text-[#0F1111]" />
                  </div>
                  <button className="flex items-center gap-1 border border-[#DDD] rounded px-3 py-1.5 text-sm text-[#565959] hover:bg-[#F0F2F2]">
                    <Filter size={14} /> Filter
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="animate-spin text-[#FF9900]" size={24} />
                </div>
              ) : candidates.length === 0 ? (
                <div className="text-center py-16 text-[#565959] text-sm">
                  {search ? "No candidates match your search." : "No candidates registered yet."}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F0F2F2] border-b border-[#DDD]">
                        <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase">Candidate</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase hidden md:table-cell">Education</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase hidden md:table-cell">Profile Score</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-[#565959] uppercase">Apps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((c, i) => (
                        <tr key={c.id} className={`border-b border-[#EAEDED] hover:bg-[#F7F7F7] ${i % 2 === 0 ? "" : "bg-[#FAFAFA]"}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-[#232F3E] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                                {c.firstName[0]}
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-[#0F1111]">{c.firstName} {c.lastName}</p>
                                <p className="text-xs text-[#565959]">{c.user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <p className="text-xs font-semibold text-[#0F1111]">{c.degree || "—"}</p>
                            <p className="text-xs text-[#565959]">{c.college || "—"}</p>
                          </td>
                          <td className="px-4 py-3">
                            <select value={c.status} onChange={e => updateStatus(c.id, e.target.value)}
                              className={`text-xs font-bold px-2 py-1 rounded border-0 cursor-pointer outline-none ${statusColor[c.status] || "bg-[#F0F2F2] text-[#565959]"}`}>
                              {Object.entries(statusLabel).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-[#EAEDED] rounded-full">
                                <div className="h-1.5 bg-[#FF9900] rounded-full" style={{ width: `${c.profileScore}%` }} />
                              </div>
                              <span className="text-xs text-[#565959]">{c.profileScore}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-[#565959]">{c.applications.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex items-center justify-between px-4 py-3 border-t border-[#EAEDED] text-xs text-[#565959]">
                <span>Showing {candidates.length} of {total}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-2 py-1 border border-[#DDD] rounded hover:bg-[#F0F2F2] disabled:opacity-40">Prev</button>
                  {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)}
                      className={`px-2 py-1 rounded ${p === page ? "bg-[#232F3E] text-white" : "border border-[#DDD] hover:bg-[#F0F2F2]"}`}>{p}</button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                    className="px-2 py-1 border border-[#DDD] rounded hover:bg-[#F0F2F2] disabled:opacity-40">Next</button>
                </div>
              </div>
            </div>
          )}

          {tab === "jobs" && (
            <div className="bg-white border border-[#DDD] rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0F1111]">Active Job Postings</h3>
                <button className="bg-[#FF9900] text-[#131921] font-bold text-sm px-4 py-2 rounded hover:bg-[#FA8900]">+ Post New Job</button>
              </div>
              <div className="space-y-3">
                {[
                  { company: "TCS",      role: "Software Engineer",        openings: 20, applied: 45, deadline: "Dec 20", status: "Active" },
                  { company: "Infosys",  role: "Systems Engineer",         openings: 35, applied: 78, deadline: "Dec 25", status: "Active" },
                  { company: "Wipro",    role: "Project Engineer Trainee", openings: 15, applied: 32, deadline: "Dec 18", status: "Closing Soon" },
                  { company: "Accenture",role: "Associate Analyst",        openings: 10, applied: 21, deadline: "Jan 5",  status: "Active" },
                ].map(job => (
                  <div key={job.company + job.role} className="flex items-center gap-4 p-4 border border-[#DDD] rounded hover:bg-[#F7F7F7]">
                    <div className="w-10 h-10 rounded bg-[#232F3E] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{job.company[0]}</div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-[#0F1111]">{job.company} — {job.role}</p>
                      <p className="text-xs text-[#565959]">{job.openings} openings · {job.applied} applied · Deadline: {job.deadline}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${job.status === "Active" ? "bg-[#E4F5F0] text-[#067D62]" : "bg-[#FFEEDD] text-[#CC0C39]"}`}>{job.status}</span>
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
                  { title: "Monthly Placement Report",  desc: "Placements, salaries, companies",              icon: "📊" },
                  { title: "Counsellor Performance",    desc: "Sessions handled, placement rate by counsellor",icon: "👤" },
                  { title: "Company-wise Analysis",     desc: "Applications, selections, offer rates",         icon: "🏢" },
                  { title: "Revenue Report",            desc: "Service-wise revenue and collection status",    icon: "💰" },
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