export interface ReviewTask {
  id: string;
  questionId: string;
  title: string;
  difficulty: string;
  url: string | null;
  slug: string | null;
  masteryLevel: number;
  lastReviewDate: string | null;
  notes?: string | null;
  tags?: string;
  submissions?: {
    language: string;
    code: string;
  }[];
}

export interface ReviewClientProps {
  initialReviews: ReviewTask[];
}
