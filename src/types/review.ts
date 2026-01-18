export interface ReviewTask {
  id: string;
  questionId: string;
  title: string;
  difficulty: string;
  url: string | null;
  slug: string | null;
  masteryLevel: number;
  lastReviewDate: string | null;
}

export interface ReviewClientProps {
  initialReviews: ReviewTask[];
}