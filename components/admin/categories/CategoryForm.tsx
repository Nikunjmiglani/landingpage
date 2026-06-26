"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import axios from "axios";
import { toast } from "sonner";

import {
  categorySchema,
  type CategoryInput,
} from "@/lib/validations/category";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFormProps {
  category?: Category;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CategoryForm({
  category,
  onSuccess,
  onCancel,
}: CategoryFormProps) {
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(category);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
    },
  });

  const watchedName = watch("name");  
  
  useEffect(() => {
    if (!isEdit) {
      setValue(
        "slug",
        slugify(watchedName || "", {
          lower: true,
          strict: true,
          trim: true,
        })
      );
    }
  }, [watchedName, isEdit, setValue]);

  async function onSubmit(values: CategoryInput) {
    try {
      setLoading(true);

      if (isEdit) {
        await axios.patch(
          `/api/admin/categories/${category?.id}`,
          values
        );

        toast.success("Category updated successfully.");
      } else {
        await axios.post("/api/admin/categories", values);

        toast.success("Category created successfully.");
      }

      onSuccess?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }
    return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category Name
        </label>

        <input
          {...register("name")}
          placeholder="Web Development"
          className="w-full rounded-lg border px-4 py-2 outline-none transition focus:border-blue-500"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Slug
        </label>

        <input
          {...register("slug")}
          placeholder="web-development"
          className="w-full rounded-lg border bg-gray-50 px-4 py-2 outline-none"
        />

        {errors.slug && (
          <p className="mt-1 text-sm text-red-500">
            {errors.slug.message}
          </p>
        )}
      </div>
            <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border px-5 py-2 transition hover:bg-gray-100"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update Category"
            : "Create Category"}
        </button>
      </div>
    </form>
  );
}