export interface EditorFormData {
  // Problem
  pid: string;
  title: string;
  difficulty: string;
  tags: string[];
  link: string;

  // Submission
  language: string;
  code: string;

  // Progress
  masteryLevel: number;
  notes: string;
}

export interface MetaSidebarProps {
  difficulty: string;
  tags: string[];
  link: string;
  masteryLevel: number;
  onUpdate: (field: string, value: any) => void;
}

export interface QuestionEditorProps {
  mode: "create" | "edit";
  // clean data
  initialData?: Partial<EditorFormData>;
  preferredLang?: string;
}

export interface EditorHeaderProps {
  pid: string;
  title: string;
  isSaving: boolean;
  mode: "create" | "edit";
  onUpdate: (field: string, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export interface CodeSectionProps {
  code: string;
  language: string;
  onUpdate: (field: string, value: any) => void;
}
