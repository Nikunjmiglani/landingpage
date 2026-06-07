"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { CheckCircle, Clock, AlertCircle, Briefcase, FileText, Calendar, Bell, TrendingUp, Star, ChevronRight, User } from "lucide-react";

const applications = [
  { company: "TCS", role: "Software Engineer", status: "Interview Scheduled", date: "Dec 15", color: "text-[#007185]", bg: "bg-[#E8F7F9]", icon: Calendar },
  { company: "Infosys", role: "Systems Engineer", status: "Application Sent", date: "Dec 12", color: "text-[#565959]", bg: "bg-[#F0F2F2]", icon: Clock },
  { company: "Wipro", role: "Project Engineer", status: "Offer Received!", date: "Dec 10", color: "text-[#067D62]", bg: "bg-[#E4F5F0]", icon: CheckCircle },
  { company: "HCL", role: "Graduate Engineer", status: "Under Review", date: "Dec 8", color: "text-[#C45500]", bg: "bg-[#FFF3E0]", icon: AlertCircle },
  { company: "Accenture", role: "Associate Analyst", status: "Application Sent", date: "Dec 5", color: "text-[#565959]", bg: "bg-[#F0F2F2]", icon: Clock },
];

const tasks = [
  { title: "Complete Mock Interview #2", due: "Dec 16", priority: "High", done: false },
  { title: "Upload 10th Marksheet", due: "Dec 17", priority: "High", done: false },
  { title: "LinkedIn profile review", due: "Dec 18", priority: "Medium", done: true },
  { title: "Aptitude test - Batch A", due: "Dec 20", priority: "Medium", done: false },
];

const timeline = [
  { event: "Profile Approved by Counsellor", date: "Dec 10", done: true },
  { event: "Resume Enhanced & Uploaded", date: "Dec 11", done: true },
  { event: "Applied to 5 Companies", date: "Dec 12", done: true },
  { event: "Interview Round 1 - TCS", date: "Dec 15", done: false },
  { event: "Offer & Negotiation Support", date: "TBD", done: false },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome bar */}
        <div className="bg-[#232F3E] text-white rounded p-4 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FF9900] flex items-center justify-center text-[#131921] font-bold text-lg">R</div>
            <div>
              <p className="text-xs text-[#CCCCCC]">Hello,</p>
              <p className="text-lg font-bold">Rahul Sharma</p>
              <p className="text-xs text-[#AAAAAA]">B.Tech CSE · Delhi Technological University · 2024 Passout</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[#FF9900] font-bold text-sm">Profile: 85% complete</p>
              <div className="w-40 h-2 bg-[#37475A] rounded-full mt-1">
                <div className="w-[85%] h-2 bg-[#FF9900] rounded-full" />
              </div>
            </div>
            <Link href="/onboarding" className="bg-[#FF9900] text-[#131921] font-bold text-xs px-4 py-2 rounded hover:bg-[#FA8900]">
              Complete Profile
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-[#DDD] bg-white rounded-t overflow-x-auto mb-0">
          {["overview", "applications", "tasks", "sessions", "documents"].map(tab => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold capitalize whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab ? "border-[#FF9900] text-[#131921]" : "border-transparent text-[#565959] hover:text-[#131921]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Applications Sent", value: "5", sub: "+2 this week", icon: Briefcase, color: "text-[#007185]" },
                { label: "Interviews Scheduled", value: "1", sub: "TCS — Dec 15", icon: Calendar, color: "text-[#C45500]" },
                { label: "Offers Received", value: "1", sub: "Wipro · ₹3.8L", icon: CheckCircle, color: "text-[#067D62]" },
                { label: "Profile Strength", value: "85%", sub: "Good — keep going", icon: TrendingUp, color: "text-[#FF9900]" },
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
                <div>
                  {applications.slice(0, 4).map(app => (
                    <div key={app.company + app.role} className="flex items-center gap-3 px-4 py-3 border-b border-[#EAEDED] last:border-0 hover:bg-[#F7F7F7]">
                      <div className="w-9 h-9 rounded bg-[#232F3E] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {app.company[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#0F1111]">{app.company}</p>
                        <p className="text-xs text-[#565959] truncate">{app.role}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${app.bg} ${app.color}`}>
                          <app.icon size={10} />
                          {app.status}
                        </div>
                        <p className="text-[10px] text-[#565959] mt-0.5">{app.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks */}
              <div className="bg-white border border-[#DDD] rounded">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#EAEDED]">
                  <h3 className="font-bold text-sm text-[#0F1111]">Pending Tasks</h3>
                  <span className="bg-[#CC0C39] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {tasks.filter(t => !t.done).length}
                  </span>
                </div>
                <div>
                  {tasks.map(task => (
                    <div key={task.title} className={`flex items-start gap-3 px-4 py-3 border-b border-[#EAEDED] last:border-0 ${task.done ? "opacity-50" : ""}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${task.done ? "bg-[#067D62] border-[#067D62]" : "border-[#DDD]"}`}>
                        {task.done && <CheckCircle size={10} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs font-semibold ${task.done ? "line-through text-[#565959]" : "text-[#0F1111]"}`}>{task.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-[#565959]">Due: {task.due}</span>
                          <span className={`text-[10px] font-bold ${task.priority === "High" ? "text-[#CC0C39]" : "text-[#C45500]"}`}>{task.priority}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="bg-white border border-[#DDD] rounded p-4">
              <h3 className="font-bold text-sm text-[#0F1111] mb-4">Your Placement Journey</h3>
              <div className="flex flex-col gap-0">
                {timeline.map((t, i) => (
                  <div key={t.event} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${t.done ? "bg-[#067D62]" : "bg-[#DDD]"}`}>
                        {t.done ? <CheckCircle size={14} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-[#888]" />}
                      </div>
                      {i < timeline.length - 1 && <div className={`w-0.5 h-8 ${t.done ? "bg-[#067D62]" : "bg-[#DDD]"}`} />}
                    </div>
                    <div className="pb-4">
                      <p className={`text-sm font-semibold ${t.done ? "text-[#0F1111]" : "text-[#565959]"}`}>{t.event}</p>
                      <p className="text-xs text-[#565959]">{t.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="bg-white border border-[#DDD] rounded">
            <div className="px-4 py-3 border-b border-[#EAEDED] flex items-center justify-between">
              <h3 className="font-bold text-[#0F1111]">All Applications ({applications.length})</h3>
              <select className="border border-[#DDD] rounded px-3 py-1.5 text-xs text-[#565959] focus:outline-none">
                <option>All Status</option>
                <option>Interview Scheduled</option>
                <option>Offer Received</option>
                <option>Application Sent</option>
              </select>
            </div>
            {applications.map(app => (
              <div key={app.company + app.role} className="flex items-center gap-4 px-4 py-4 border-b border-[#EAEDED] last:border-0 hover:bg-[#F7F7F7] cursor-pointer">
                <div className="w-10 h-10 rounded bg-[#232F3E] text-white flex items-center justify-center font-bold flex-shrink-0">
                  {app.company[0]}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-[#0F1111]">{app.company}</p>
                  <p className="text-xs text-[#565959]">{app.role}</p>
                </div>
                <div>
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold ${app.bg} ${app.color}`}>
                    <app.icon size={11} />
                    {app.status}
                  </div>
                </div>
                <p className="text-xs text-[#565959] w-20 text-right">{app.date}</p>
                <ChevronRight size={14} className="text-[#565959]" />
              </div>
            ))}
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="bg-white border border-[#DDD] rounded p-6">
            <h3 className="font-bold text-[#0F1111] mb-4">Counselling & Mock Interview Sessions</h3>
            <div className="space-y-3">
              {[
                { title: "1:1 Career Counselling", counsellor: "Ms. Anita Joshi", date: "Dec 14, 11:00 AM", type: "Upcoming", mode: "Video Call" },
                { title: "Mock Interview #1", counsellor: "Mr. Ravi Kumar (Ex-TCS HR)", date: "Dec 11, 3:00 PM", type: "Completed", mode: "Video Call" },
                { title: "Resume Review Session", counsellor: "Ms. Divya Nair", date: "Dec 9, 10:00 AM", type: "Completed", mode: "Video Call" },
              ].map(s => (
                <div key={s.title} className="flex items-start gap-4 p-4 border border-[#DDD] rounded hover:bg-[#F7F7F7]">
                  <div className="w-10 h-10 rounded-full bg-[#232F3E] text-white flex items-center justify-center flex-shrink-0">
                    <User size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#0F1111]">{s.title}</p>
                    <p className="text-xs text-[#565959]">{s.counsellor} · {s.mode}</p>
                    <p className="text-xs text-[#007185] mt-1">{s.date}</p>
                  </div>
                  <div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${s.type === "Upcoming" ? "bg-[#E8F7F9] text-[#007185]" : "bg-[#E4F5F0] text-[#067D62]"}`}>
                      {s.type}
                    </span>
                  </div>
                  {s.type === "Upcoming" && (
                    <button className="bg-[#FFD814] text-[#131921] font-bold text-xs px-4 py-1.5 rounded border border-[#FCD200]">
                      Join
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="bg-white border border-[#DDD] rounded p-6">
            <h3 className="font-bold text-[#0F1111] mb-4">My Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "Resume_Rahul_Enhanced.pdf", status: "Approved", date: "Dec 11", size: "245 KB" },
                { name: "Cover_Letter_TCS.pdf", status: "Ready", date: "Dec 12", size: "102 KB" },
                { name: "10th_Marksheet.pdf", status: "Pending Upload", date: "—", size: "—" },
                { name: "12th_Marksheet.pdf", status: "Uploaded", date: "Dec 8", size: "380 KB" },
                { name: "Degree_Certificate.pdf", status: "Pending Upload", date: "—", size: "—" },
              ].map(doc => (
                <div key={doc.name} className="flex items-center gap-3 p-3 border border-[#DDD] rounded hover:bg-[#F7F7F7]">
                  <FileText size={24} className={doc.status === "Pending Upload" ? "text-[#CC0C39]" : "text-[#007185]"} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F1111] truncate">{doc.name}</p>
                    <p className="text-xs text-[#565959]">{doc.date} · {doc.size}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    doc.status === "Approved" ? "bg-[#E4F5F0] text-[#067D62]" :
                    doc.status === "Pending Upload" ? "bg-[#FFEEDD] text-[#CC0C39]" :
                    "bg-[#F0F2F2] text-[#565959]"
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 border-2 border-dashed border-[#DDD] w-full py-4 rounded text-sm text-[#565959] hover:border-[#007185] hover:text-[#007185] transition-colors">
              + Upload New Document
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
