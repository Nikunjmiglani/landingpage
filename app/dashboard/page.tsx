"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import {
  CheckCircle, Clock, AlertCircle, Briefcase, FileText,
  Calendar, TrendingUp, ChevronRight, User, Loader2
} from "lucide-react";

const appStatusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof Clock }> = {
  APPLIED:              { label: "Applied",              color: "text-[#565959]", bg: "bg-[#F0F2F2]",  icon: Clock },
  UNDER_REVIEW:         { label: "Under Review",         color: "text-[#C45500]", bg: "bg-[#FFF3E0]",  icon: AlertCircle },
  INTERVIEW_SCHEDULED:  { label: "Interview Scheduled",  color: "text-[#007185]", bg: "bg-[#E8F7F9]",  icon: Calendar },
  OFFER_RECEIVED:       { label: "Offer Received!",      color: "text-[#067D62]", bg: "bg-[#E4F5F0]",  icon: CheckCircle },
  PLACED:               { label: "Placed",               color: "text-[#067D62]", bg: "bg-[#E4F5F0]",  icon: CheckCircle },
  REJECTED:             { label: "Rejected",             color: "text-[#CC0C39]", bg: "bg-[#FFF0F0]",  icon: AlertCircle },
};

type Application = {
  id: string; status: string; appliedAt: string;
  job: { company: string; role: string };
};

type Document = {
  id: string; name: string; type: string; status: string; uploadedAt: string;
};

type CandidateProfile = {
  id: string; firstName: string; lastName: string;
  degree: string | null; branch: string | null; college: string | null; gradYear: string | null;
  profileScore: number; status: string;
  applications: Application[];
  documents: Document[];
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/candidate/profile")
        .then(r => r.json())
        .then(data => { setProfile(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#EAEDED]">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#FF9900]" size={32} />
        </div>
      </div>
    );
  }

  const apps = profile?.applications ?? [];
  const docs = profile?.documents ?? [];
  const offersCount  = apps.filter(a => a.status === "OFFER_RECEIVED" || a.status === "PLACED").length;
  const interviewCount = apps.filter(a => a.status === "INTERVIEW_SCHEDULED").length;

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome bar */}
        <div className="bg-[#232F3E] text-white rounded p-4 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FF9900] flex items-center justify-center text-[#131921] font-bold text-lg">
              {profile?.firstName?.[0] ?? session?.user?.email?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p className="text-xs text-[#CCCCCC]">Hello,</p>
              <p className="text-lg font-bold">{profile ? `${profile.firstName} ${profile.lastName}` : session?.user?.email}</p>
              <p className="text-xs text-[#AAAAAA]">
                {[profile?.degree, profile?.college, profile?.gradYear ? `${profile.gradYear} Passout` : null].filter(Boolean).join(" · ") || "Complete your profile to get started"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[#FF9900] font-bold text-sm">Profile: {profile?.profileScore ?? 0}% complete</p>
              <div className="w-40 h-2 bg-[#37475A] rounded-full mt-1">
                <div className="h-2 bg-[#FF9900] rounded-full transition-all" style={{ width: `${profile?.profileScore ?? 0}%` }} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Link href="/onboarding" className="bg-[#FF9900] text-[#131921] font-bold text-xs px-4 py-2 rounded hover:bg-[#FA8900]">
                Complete Profile
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-[#AAAAAA] hover:text-white text-[10px] text-center">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-[#DDD] bg-white rounded-t overflow-x-auto">
          {["overview", "applications", "sessions", "documents"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold capitalize whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab ? "border-[#FF9900] text-[#131921]" : "border-transparent text-[#565959] hover:text-[#131921]"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Applications Sent",    value: apps.length,    sub: "Total applied",          icon: Briefcase,  color: "text-[#007185]" },
                { label: "Interviews Scheduled", value: interviewCount, sub: "Upcoming interviews",    icon: Calendar,   color: "text-[#C45500]" },
                { label: "Offers Received",      value: offersCount,    sub: "Active offers",          icon: CheckCircle,color: "text-[#067D62]" },
                { label: "Profile Strength",     value: `${profile?.profileScore ?? 0}%`, sub: profile?.profileScore ?? 0 >= 80 ? "Good — keep going" : "Needs improvement", icon: TrendingUp, color: "text-[#FF9900]" },
              ].map(k => (
                <div key={k.label} className="bg-white border border-[#DDD] rounded p-4 shadow-sm">
                  <k.icon size={20} className={`${k.color} mb-2`} />
                  <p className="text-2xl font-bold text-[#0F1111]">{k.value}</p>
                  <p className="text-xs text-[#565959] mt-0.5">{k.label}</p>
                  <p className={`text-xs font-semibold mt-1 ${k.color}`}>{k.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recent Applications */}
              <div className="md:col-span-2 bg-white border border-[#DDD] rounded">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#EAEDED]">
                  <h3 className="font-bold text-sm text-[#0F1111]">Recent Applications</h3>
                  <button onClick={() => setActiveTab("applications")} className="text-[#007185] text-xs hover:underline flex items-center gap-1">
                    View all <ChevronRight size={12} />
                  </button>
                </div>
                {apps.length === 0 ? (
                  <div className="text-center py-10 text-[#565959] text-sm">
                    No applications yet.<br />
                    <Link href="#" className="text-[#007185] hover:underline text-xs mt-1 inline-block">Browse open jobs →</Link>
                  </div>
                ) : apps.slice(0, 4).map(app => {
                  const cfg = appStatusConfig[app.status] ?? appStatusConfig.APPLIED;
                  return (
                    <div key={app.id} className="flex items-center gap-3 px-4 py-3 border-b border-[#EAEDED] last:border-0 hover:bg-[#F7F7F7]">
                      <div className="w-9 h-9 rounded bg-[#232F3E] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {app.job.company[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#0F1111]">{app.job.company}</p>
                        <p className="text-xs text-[#565959] truncate">{app.job.role}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                          <cfg.icon size={10} />{cfg.label}
                        </div>
                        <p className="text-[10px] text-[#565959] mt-0.5">{new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Profile completion checklist */}
              <div className="bg-white border border-[#DDD] rounded">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#EAEDED]">
                  <h3 className="font-bold text-sm text-[#0F1111]">Profile Checklist</h3>
                </div>
                <div>
                  {[
                    { label: "Basic info filled",   done: !!(profile?.firstName && profile?.lastName) },
                    { label: "Education added",     done: !!(profile?.degree && profile?.college) },
                    { label: "Resume uploaded",     done: docs.some(d => d.type === "resume") },
                    { label: "Applied to a job",    done: apps.length > 0 },
                    { label: "Interview scheduled", done: interviewCount > 0 },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 px-4 py-3 border-b border-[#EAEDED] last:border-0">
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${item.done ? "bg-[#067D62]" : "border-2 border-[#DDD]"}`}>
                        {item.done && <CheckCircle size={10} className="text-white" />}
                      </div>
                      <p className={`text-xs ${item.done ? "line-through text-[#565959]" : "text-[#0F1111] font-semibold"}`}>{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3">
                  <Link href="/onboarding" className="block w-full text-center bg-[#FFD814] text-[#131921] font-bold text-xs py-2 rounded border border-[#FCD200]">
                    Complete Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications tab */}
        {activeTab === "applications" && (
          <div className="bg-white border border-[#DDD] rounded">
            <div className="px-4 py-3 border-b border-[#EAEDED]">
              <h3 className="font-bold text-[#0F1111]">All Applications ({apps.length})</h3>
            </div>
            {apps.length === 0 ? (
              <div className="text-center py-16 text-[#565959] text-sm">No applications yet.</div>
            ) : apps.map(app => {
              const cfg = appStatusConfig[app.status] ?? appStatusConfig.APPLIED;
              return (
                <div key={app.id} className="flex items-center gap-4 px-4 py-4 border-b border-[#EAEDED] last:border-0 hover:bg-[#F7F7F7]">
                  <div className="w-10 h-10 rounded bg-[#232F3E] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {app.job.company[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#0F1111]">{app.job.company}</p>
                    <p className="text-xs text-[#565959]">{app.job.role}</p>
                  </div>
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                    <cfg.icon size={11} />{cfg.label}
                  </div>
                  <p className="text-xs text-[#565959] w-20 text-right">
                    {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Sessions tab */}
        {activeTab === "sessions" && (
          <div className="bg-white border border-[#DDD] rounded p-6">
            <h3 className="font-bold text-[#0F1111] mb-4">Counselling & Mock Interview Sessions</h3>
            <div className="space-y-3">
              {[
                { title: "1:1 Career Counselling", counsellor: "Ms. Anita Joshi", date: "Scheduled by admin", type: "Upcoming", mode: "Video Call" },
                { title: "Resume Review Session",  counsellor: "Ms. Divya Nair",  date: "After profile review", type: "Pending", mode: "Video Call" },
              ].map(s => (
                <div key={s.title} className="flex items-start gap-4 p-4 border border-[#DDD] rounded">
                  <div className="w-10 h-10 rounded-full bg-[#232F3E] text-white flex items-center justify-center flex-shrink-0">
                    <User size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#0F1111]">{s.title}</p>
                    <p className="text-xs text-[#565959]">{s.counsellor} · {s.mode}</p>
                    <p className="text-xs text-[#007185] mt-1">{s.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${s.type === "Upcoming" ? "bg-[#E8F7F9] text-[#007185]" : "bg-[#F0F2F2] text-[#565959]"}`}>
                    {s.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents tab */}
        {activeTab === "documents" && (
          <div className="bg-white border border-[#DDD] rounded p-6">
            <h3 className="font-bold text-[#0F1111] mb-4">My Documents</h3>
            {docs.length === 0 ? (
              <div className="text-center py-10 text-[#565959] text-sm">No documents uploaded yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {docs.map(doc => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 border border-[#DDD] rounded hover:bg-[#F7F7F7]">
                    <FileText size={24} className={doc.status === "PENDING" ? "text-[#CC0C39]" : "text-[#007185]"} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0F1111] truncate">{doc.name}</p>
                      <p className="text-xs text-[#565959]">{new Date(doc.uploadedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      doc.status === "APPROVED" ? "bg-[#E4F5F0] text-[#067D62]" :
                      doc.status === "PENDING"  ? "bg-[#FFEEDD] text-[#CC0C39]" :
                      "bg-[#F0F2F2] text-[#565959]"
                    }`}>{doc.status}</span>
                  </div>
                ))}
              </div>
            )}
            <button className="border-2 border-dashed border-[#DDD] w-full py-4 rounded text-sm text-[#565959] hover:border-[#007185] hover:text-[#007185] transition-colors">
              + Upload New Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
}