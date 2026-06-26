"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import axios from "axios";
import { toast } from "sonner";
import { Info, Link as LinkIcon } from "lucide-react";

interface Category { id: string; name: string; }

interface Course {
  id: string; title: string; slug: string; shortDescription: string; description: string;
  thumbnailUrl?: string | null; previewVideoUrl?: string | null; instructor?: string | null;
  language: string; duration?: string | null; level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  price: number; discount: number; featured: boolean; published: boolean; categoryId?: string | null;
}

interface CourseFormProps {
  course?: Course;
  onSuccess: () => void;
  onCancel: () => void;
}

// Form values typed manually — avoids zodResolver type inference issues with Zod v4
interface CourseFormValues {
  title: string; slug: string; shortDescription: string; description: string;
  thumbnailUrl: string; previewVideoUrl: string; instructor: string;
  language: string; duration: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  price: number; discount: number; featured: boolean; published: boolean; categoryId: string;
}

const LEVELS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
] as const;

const LANGUAGES = ["English","Hindi","Hinglish","Tamil","Telugu","Marathi","Bengali","Gujarati"];

function validate(values: CourseFormValues): Partial<Record<keyof CourseFormValues, string>> {
  const errors: Partial<Record<keyof CourseFormValues, string>> = {};
  if (!values.title || values.title.trim().length < 5) errors.title = "Title must be at least 5 characters";
  if (values.title && values.title.trim().length > 120) errors.title = "Title cannot exceed 120 characters";
  if (!values.slug || values.slug.trim().length < 3) errors.slug = "Slug is required";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.slug)) errors.slug = "Slug must contain only lowercase letters, numbers and hyphens";
  if (!values.shortDescription || values.shortDescription.trim().length < 10) errors.shortDescription = "Short description must be at least 10 characters";
  if (!values.description || values.description.trim().length < 20) errors.description = "Description must be at least 20 characters";
  if (values.price < 0) errors.price = "Price cannot be negative";
  if (values.discount < 0 || values.discount > 100) errors.discount = "Discount must be between 0 and 100";
  return errors;
}

export default function CourseForm({ course, onSuccess, onCancel }: CourseFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(course?.thumbnailUrl ?? "");
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CourseFormValues, string>>>({});

  const isEdit = Boolean(course);

  const { register, handleSubmit, watch, setValue, reset, formState: { isSubmitting } } =
    useForm<CourseFormValues>({
      defaultValues: {
        title: course?.title ?? "",
        slug: course?.slug ?? "",
        shortDescription: course?.shortDescription ?? "",
        description: course?.description ?? "",
        thumbnailUrl: course?.thumbnailUrl ?? "",
        previewVideoUrl: course?.previewVideoUrl ?? "",
        instructor: course?.instructor ?? "",
        language: course?.language ?? "English",
        duration: course?.duration ?? "",
        level: course?.level ?? "BEGINNER",
        price: course?.price ?? 0,
        discount: course?.discount ?? 0,
        featured: course?.featured ?? false,
        published: course?.published ?? false,
        categoryId: course?.categoryId ?? "",
      },
    });

  const watchedTitle = watch("title");
  const watchedThumbnail = watch("thumbnailUrl");
  const watchedPrice = watch("price");
  const watchedDiscount = watch("discount");

  useEffect(() => {
    if (isEdit) return;
    setValue("slug", slugify(watchedTitle ?? "", { lower: true, strict: true, trim: true }), { shouldValidate: false });
  }, [watchedTitle, isEdit, setValue]);

  useEffect(() => { setThumbnailPreview(watchedThumbnail ?? ""); }, [watchedThumbnail]);

  useEffect(() => {
    axios.get("/api/admin/categories")
      .then(res => setCategories(res.data))
      .catch(() => toast.error("Could not load categories."));
  }, []);

  const effectivePrice = Number(watchedPrice) - (Number(watchedPrice) * Number(watchedDiscount)) / 100;

  async function onSubmit(values: CourseFormValues) {
    // Manual validation
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    try {
      const payload = {
        title: values.title.trim(),
        slug: values.slug.trim(),
        shortDescription: values.shortDescription.trim(),
        description: values.description.trim(),
        language: values.language,
        level: values.level,
        price: Number(values.price),
        discount: Number(values.discount),
        featured: Boolean(values.featured),
        published: Boolean(values.published),
        thumbnailUrl: values.thumbnailUrl || null,
        previewVideoUrl: values.previewVideoUrl || null,
        instructor: values.instructor || null,
        duration: values.duration || null,
        categoryId: values.categoryId || null,
      };

      if (isEdit) {
        await axios.patch(`/api/admin/courses/${course!.id}`, payload);
        toast.success("Course updated.");
      } else {
        await axios.post("/api/admin/courses", payload);
        toast.success("Course created.");
      }
      reset();
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    }
  }

  const err = (field: keyof CourseFormValues) => formErrors[field];

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">

      {/* Basic Info */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-500">Basic Information</h2>
        <div className="space-y-5">

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Course Title <span className="text-red-500">*</span></label>
            <input {...register("title")} disabled={isSubmitting} placeholder="e.g. Full Stack Web Development Bootcamp"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50 ${err("title") ? "border-red-400 bg-red-50" : "border-gray-300"}`} />
            {err("title") && <p className="mt-1 text-xs text-red-500">{err("title")}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Slug</label>
            <input {...register("slug")} disabled={isSubmitting} placeholder="full-stack-web-development-bootcamp"
              className={`w-full rounded-lg border px-4 py-2.5 font-mono text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50 ${err("slug") ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`} />
            {err("slug") && <p className="mt-1 text-xs text-red-500">{err("slug")}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Short Description <span className="text-red-500">*</span></label>
            <textarea {...register("shortDescription")} disabled={isSubmitting} rows={2} placeholder="Shown on course cards and search results."
              className={`w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50 ${err("shortDescription") ? "border-red-400 bg-red-50" : "border-gray-300"}`} />
            {err("shortDescription") && <p className="mt-1 text-xs text-red-500">{err("shortDescription")}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Description <span className="text-red-500">*</span></label>
            <textarea {...register("description")} disabled={isSubmitting} rows={6} placeholder="What students will learn, prerequisites, outcomes..."
              className={`w-full resize-y rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50 ${err("description") ? "border-red-400 bg-red-50" : "border-gray-300"}`} />
            {err("description") && <p className="mt-1 text-xs text-red-500">{err("description")}</p>}
          </div>

        </div>
      </section>

      {/* Media */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-500">Media</h2>
        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Thumbnail URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input {...register("thumbnailUrl")} disabled={isSubmitting} placeholder="https://..."
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50" />
            </div>
            {thumbnailPreview && (
              <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
                <img src={thumbnailPreview} alt="Thumbnail preview" className="h-32 w-full object-cover" onError={() => setThumbnailPreview("")} />
              </div>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Preview Video URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input {...register("previewVideoUrl")} disabled={isSubmitting} placeholder="https://youtube.com/..."
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50" />
            </div>
            <p className="mt-1.5 flex items-center gap-1 text-xs text-gray-400"><Info className="h-3 w-3" /> YouTube, Vimeo or direct video link</p>
          </div>

        </div>
      </section>

      {/* Course Details */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-500">Course Details</h2>
        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
            <select {...register("categoryId")} disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50">
              <option value="">No category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Level <span className="text-red-500">*</span></label>
            <select {...register("level")} disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50">
              {LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Language <span className="text-red-500">*</span></label>
            <select {...register("language")} disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50">
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Duration</label>
            <input {...register("duration")} disabled={isSubmitting} placeholder="e.g. 40 hours"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50" />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Instructor</label>
            <input {...register("instructor")} disabled={isSubmitting} placeholder="e.g. Rahul Sharma"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50" />
          </div>

        </div>
      </section>

      {/* Pricing */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-500">Pricing</h2>
        <div className="grid gap-5 sm:grid-cols-3">

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Price (₹) <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">₹</span>
              <input {...register("price", { valueAsNumber: true })} type="number" min={0} step={1} disabled={isSubmitting} placeholder="999"
                className={`w-full rounded-lg border py-2.5 pl-7 pr-4 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50 ${err("price") ? "border-red-400 bg-red-50" : "border-gray-300"}`} />
            </div>
            {err("price") && <p className="mt-1 text-xs text-red-500">{err("price")}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Discount (%)</label>
            <div className="relative">
              <input {...register("discount", { valueAsNumber: true })} type="number" min={0} max={100} step={1} disabled={isSubmitting} placeholder="0"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-4 pr-8 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500">Effective Price</label>
            <div className="flex h-[42px] items-center rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-green-700">
              ₹{isNaN(effectivePrice) ? "—" : Math.max(0, effectivePrice).toFixed(0)}
            </div>
          </div>

        </div>
      </section>

      {/* Settings */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-500">Settings</h2>
        <div className="space-y-4">

          <label className="flex cursor-pointer items-start gap-3">
            <input {...register("published")} type="checkbox" disabled={isSubmitting}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-black disabled:cursor-not-allowed" />
            <div>
              <p className="text-sm font-medium text-gray-700">Published</p>
              <p className="text-xs text-gray-400">Make this course visible to students on the platform.</p>
            </div>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input {...register("featured")} type="checkbox" disabled={isSubmitting}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-black disabled:cursor-not-allowed" />
            <div>
              <p className="text-sm font-medium text-gray-700">Featured</p>
              <p className="text-xs text-gray-400">Show this course on the homepage and in featured sections.</p>
            </div>
          </label>

        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pb-4">
        <button type="button" onClick={() => { reset(); setFormErrors({}); onCancel(); }} disabled={isSubmitting}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}
          className="min-w-[140px] rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create Course")}
        </button>
      </div>

    </form>
  );
}