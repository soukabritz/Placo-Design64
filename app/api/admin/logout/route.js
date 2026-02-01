import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/utils/auth";

export async function POST() {
  const response = NextResponse.json({ message: "Déconnexion réussie" });
  removeAuthCookie(response);
  return response;
}
