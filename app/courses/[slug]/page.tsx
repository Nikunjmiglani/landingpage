"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  BookOpen, Clock, Users, Star, ChevronDown, ChevronRight,
  Play, Lock, CheckCircle, ArrowLeft, Globe, BarChart2, Loader2
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface Lesson { id: string; title: string; duration?: string | null; isPreview: boolean; order: number; }
interface Module { id: string; title: string; description?: string | null; order: number; lessons: Lesson[]; }
interface Course {
  id: string; title: string; slug: string; shortDescription: string; description: string;
  thumbnailUrl?: string | null; previewVideoUrl?: string | null; instructor?: string | null;
  language: string; duration?: string | null; level: string; price: number; discount: number;
  featured: boolean; category?: { name: string; slug: string } | null;
  modules: Module[];
  _count: { enrollments: number; reviews: number };
}

const LEVEL_LABELS: Record<string, string> = { BEGINNER: "Beginner", INTERMEDIATE: "Intermediate", ADVANCED: "Advanced" };

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const slug = params.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(`/api/courses/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        setCourse(data);
        // Expand first module by default
        if (data.modules?.[0]) setExpandedModules(new Set([data.modules[0].id]));
      })
      .catch(() => router.push("/courses"))
      .finally(() => setLoading(false));
  }, [slug, router]);

  // Check if already enrolled
  useEffect(() => {
    if (!session || !course) return;
    axios.get("/api/enrollments").then(res => {
      const isEnrolled = res.data.some((e: any) => e.courseId === course.id);
      setEnrolled(isEnrolled);
    }).catch(() => {});
  }, [session, course]);

  async function handleEnroll() {
    if (!session) { router.push("/login"); return; }
    if (enrolled) { router.push("/dashboard/courses"); return; }
    try {
      setEnrolling(true);
      await axios.post("/api/enrollments", { courseId: course!.id });
      setEnrolled(true);
      toast.success("Enrolled successfully! Start learning now.");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to enroll.");
    } finally { setEnrolling(false); }
  }

  function toggleModule(id: string) {
    setExpandedModules(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  const totalLessons = course?.modules.reduce((a, m) => a + m.lessons.length, 0) ?? 0;
  const effectivePrice = course ? course.price - (course.price * course.discount) / 100 : 0;

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-[#FF9900]" size={32} /></div>
    </div>
  );
  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a2332] to-[#232F3E] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <Link href="/courses" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition">
            <ArrowLeft size={15} /> Back to Courses
          </Link>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {course.category && (
                <p className="text-[#FF9900] text-xs font-semibold uppercase tracking-widest mb-3">{course.category.name}</p>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">{course.title}</h1>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">{course.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-6">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><BarChart2 size={11} /> {LEVEL_LABELS[course.level]}</span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Globe size={11} /> {course.language}</span>
                {course.duration && <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Clock size={11} /> {course.duration}</span>}
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><Users size={11} /> {course._count.enrollments} enrolled</span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"><BookOpen size={11} /> {course.modules.length} modules · {totalLessons} lessons</span>
              </div>
              {course.instructor && <p className="text-sm text-gray-400">Instructor: <span className="text-white font-medium">{course.instructor}</span></p>}
            </div>

            {/* Enrollment card — visible on desktop in hero, hidden on mobile (shown below) */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-gray-900">
                {course.thumbnailUrl ? (
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-300" />
                  </div>
                )}
                <div className="p-5">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{effectivePrice === 0 ? "Free" : `₹${effectivePrice.toFixed(0)}`}</span>
                    {course.discount > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-400 line-through">₹{course.price}</span>
                        <span className="text-sm font-bold text-emerald-600">{course.discount}% off</span>
                      </div>
                    )}
                  </div>
                  <button onClick={handleEnroll} disabled={enrolling}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#e88d00] text-gray-900 font-bold py-3.5 rounded-xl text-sm transition disabled:opacity-60 mb-3">
                    {enrolling ? <><Loader2 size={15} className="animate-spin" /> Enrolling...</> :
                      enrolled ? <><CheckCircle size={15} /> Go to Course</> : "Enroll Now"}
                  </button>
                  {!session && <p className="text-xs text-center text-gray-400"><Link href="/login" className="text-[#FF9900] font-semibold hover:underline">Login</Link> to enroll</p>}
                  <div className="mt-4 space-y-2">
                    {[`${course.modules.length} modules`, `${totalLessons} lessons`, course.language, LEVEL_LABELS[course.level]].map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle size={13} className="text-emerald-500 flex-shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile enroll card */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold text-gray-900">{effectivePrice === 0 ? "Free" : `₹${effectivePrice.toFixed(0)}`}</span>
          {course.discount > 0 && <span className="text-xs text-gray-400 line-through ml-2">₹{course.price}</span>}
        </div>
        <button onClick={handleEnroll} disabled={enrolling}
          className="inline-flex items-center gap-2 bg-[#FF9900] text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm transition disabled:opacity-60">
          {enrolling ? <Loader2 size={14} className="animate-spin" /> : enrolled ? "Go to Course" : "Enroll Now"}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">About This Course</h2>
              <p className="text-sm text-gray-600 leading-7 whitespace-pre-wrap">{course.description}</p>
            </div>

            {/* Curriculum */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Curriculum</h2>
                <span className="text-xs text-gray-500">{course.modules.length} modules · {totalLessons} lessons</span>
              </div>

              {course.modules.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">Curriculum coming soon.</p>
              ) : (
                <div className="space-y-2">
                  {course.modules.map((mod, mi) => {
                    const isOpen = expandedModules.has(mod.id);
                    return (
                      <div key={mod.id} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button onClick={() => toggleModule(mod.id)}
                          className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50 hover:bg-gray-100 transition text-left">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-[#232F3E] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{mi + 1}</span>
                            <div>
                              <p className="font-semibold text-sm text-gray-900">{mod.title}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{mod.lessons.length} lesson{mod.lessons.length !== 1 ? "s" : ""}</p>
                            </div>
                          </div>
                          {isOpen ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                        </button>
                        {isOpen && (
                          <div className="divide-y divide-gray-100">
                            {mod.lessons.map((lesson, li) => (
                              <div key={lesson.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50">
                                <span className="text-xs text-gray-400 w-5 flex-shrink-0">{li + 1}.</span>
                                {lesson.isPreview
                                  ? <Play size={14} className="text-[#FF9900] flex-shrink-0" />
                                  : <Lock size={14} className="text-gray-300 flex-shrink-0" />}
                                <span className={`text-sm flex-1 ${lesson.isPreview ? "text-gray-800" : "text-gray-500"}`}>{lesson.title}</span>
                                {lesson.isPreview && <span className="text-xs text-[#FF9900] font-semibold bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">Preview</span>}
                                {lesson.duration && <span className="text-xs text-gray-400">{lesson.duration}</span>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Desktop sidebar spacer — card already rendered in hero */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </div>
  );
}