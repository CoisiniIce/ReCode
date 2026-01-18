"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { saveQuestionAction } from "@/actions/questions";

import { EditorHeader } from "./editor/EditorHeader";
import { CodeSection } from "./editor/CodeSection";
import { MetaSidebar } from "./editor/MetaSidebar";
import { NoteSection } from "./editor/NoteSection";
import { EditorFormData, QuestionEditorProps } from "@/types/editor";

export default function QuestionEditor({
  mode = "create",
  initialData,
  preferredLang = "typescript",
}: QuestionEditorProps) {
  const router = useRouter();

  // for Create
  const EMPTY_DATA: EditorFormData = {
    pid: "",
    title: "",
    difficulty: "Medium",
    tags: [],
    link: "",
    language: preferredLang,
    code: "",
    masteryLevel: 0,
    notes: "",
  };

  const startData = mode === "edit" ? initialData || EMPTY_DATA : EMPTY_DATA;
  const [formData, setFormData] = useState<EditorFormData>(startData);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.pid || !formData.title) {
      toast.error("Please fill in Question ID and Title");
      return;
    }

    setIsSaving(true);

    try {
      const result = await saveQuestionAction(formData);

      if (result.success) {
        toast.success(
          mode === "create" ? "Problem created!" : "Changes saved!"
        );
        // 保存成功后跳转回列表页
        router.push("/questions");
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Network error. Failed to save.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      handleUpdate("tags", [...formData.tags, trimmedTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleUpdate(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col gap-8 p-6 md:p-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <EditorHeader
          pid={formData.pid}
          title={formData.title}
          mode={mode}
          isSaving={isSaving}
          onUpdate={handleUpdate}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[650px]">
          {/* Left: Code Editor */}
          <div className="lg:col-span-2 flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[1.5rem] overflow-hidden border border-white/60">
            <CodeSection
              code={formData.code}
              language={formData.language}
              onUpdate={handleUpdate}
            />
          </div>

          {/* Right: Metadata */}
          <div className="h-full">
            <MetaSidebar
              difficulty={formData.difficulty}
              tags={formData.tags}
              link={formData.link}
              masteryLevel={formData.masteryLevel}
              onUpdate={handleUpdate}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
            />
          </div>
        </div>

        {/* Note */}
        <div className="shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[1.5rem] overflow-hidden border border-white/60 bg-white/60 backdrop-blur-xl">
          <NoteSection note={formData.notes} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
}
