"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  PREVIEW_COOKIE,
  previewCredentialsMatch,
  previewSessionToken,
} from "@/lib/preview-auth";
import { safeReturnPath } from "@/lib/return-path";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = safeReturnPath(String(formData.get("next") ?? ""));

  if (!previewCredentialsMatch(username, password)) {
    return { error: "Invalid username or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(PREVIEW_COOKIE, await previewSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(next);
}
