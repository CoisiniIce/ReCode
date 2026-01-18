"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { type registerUserProps } from "@/types";

export const registerUser = async ({
  username,
  preferredLang,
  uiLanguage,
}: registerUserProps) => {
  try {
    await prisma.user.create({
      data: {
        username,
        preferredLang,
        uiLanguage,
      },
    });
  } catch (error) {
    console.error("Create user error:", error);
    return { error: "Username might already be taken." };
  }

  revalidatePath("/");
  redirect("/home");
};
