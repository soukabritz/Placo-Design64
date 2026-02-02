import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/utils/auth";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Déconnexion réussie" });
    removeAuthCookie(response);
    console.log("[API Logout] Logout successful", {
      timestamp: new Date().toISOString(),
    });
    return response;
  } catch (error) {
    console.error("[API Logout] Error", {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      name: error.name,
    });
    return NextResponse.json(
      { message: "Erreur lors de la déconnexion", details: error.message },
      { status: 500 },
    );
  }
}
