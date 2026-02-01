import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNextReviewDate(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  // set to 6am
  date.setHours(6, 0, 0, 0);
  return date;
}