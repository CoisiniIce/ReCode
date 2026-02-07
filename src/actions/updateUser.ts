"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { type UpdateUserProps } from "@/types";

export const updateUserPreferences = async ({
  username,
  preferredLang,
  uiLanguage,
  dailyReviewLimit,
}: UpdateUserProps) => {
  try {
    await prisma.user.update({
      where: { username },
      data: {
        preferredLang,
        uiLanguage,
        dailyReviewLimit,
      },
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false, error: "Update failed" };
  }
};
