'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { saveQuestionAction } from '@/actions/questions';

import { EditorHeader } from './editor/EditorHeader';
import { CodeSection } from './editor/CodeSection';
import { MetaSidebar } from './editor/MetaSidebar';
import { NoteSection } from './editor/NoteSection';
import { EditorFormData, QuestionEditorProps } from '@/types/editor';

export default function QuestionEditor({
  mode = 'create',
  initialData,
  preferredLang = 'typescript',
}: QuestionEditorProps) {
  const router = useRouter();

  // for Create
  const EMPTY_DATA: EditorFormData = {
    pid: '',
    title: '',
    difficulty: 'Medium',
    tags: [],
    link: '',
    language: preferredLang,
    code: '',
    masteryLevel: 0,
    notes: '',
  };

  const startData: EditorFormData = {
    ...EMPTY_DATA,
    ...(initialData || {}),
    difficulty: initialData?.difficulty || 'Medium',
  };
  const [formData, setFormData] = useState<EditorFormData>(startData);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.pid || !formData.title) {
      toast.error('Please fill in Question ID and Title');
      return;
    }

    setIsSaving(true);

    try {
      const result = await saveQuestionAction(formData);

      if (result.success) {
        toast.success(
          mode === 'create' ? 'Problem created!' : 'Changes saved!',
        );
        router.push('/questions');
      } else {
        toast.error(result.error || 'Something went wrong.');
      }
    } catch (error) {
      toast.error('Network error. Failed to save.');
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
      handleUpdate('tags', [...formData.tags, trimmedTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleUpdate(
      'tags',
      formData.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  return (
    <div className="relative min-h-screen w-full pb-20">
      {/* bg texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 flex flex-col gap-6 p-4 md:p-6 max-w-[1600px] mx-auto w-full">
        <EditorHeader
          pid={formData.pid}
          title={formData.title}
          mode={mode}
          isSaving={isSaving}
          onUpdate={handleUpdate}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[650px]">
            <div className="lg:col-span-2 flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem] overflow-hidden border border-white/60 bg-white/40 backdrop-blur-sm">
              <CodeSection
                code={formData.code}
                language={formData.language}
                onUpdate={handleUpdate}
              />
            </div>

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

          <div className="shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem] overflow-hidden border border-white/60 bg-white/60 backdrop-blur-xl">
            <NoteSection note={formData.notes} onUpdate={handleUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
}
