import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Admin from "@/lib/models/Admin";
import { verifyAuth } from "@/lib/utils/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function json(body, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0, must-revalidate",
      Vary: "Cookie",
    },
  });
}

export async function GET(request) {
  try {
    console.log("[API Verify] GET request received");
    const auth = await verifyAuth(request);

    if (!auth.authenticated) {
      const error = new Error("Unauthorized access attempt");
      console.error("[API Verify] Authentication Error", {
        error: error,
        auth: auth,
        timestamp: new Date().toISOString(),
      });
      return json({ message: "Non autorisé" }, 401);
    }

    console.log("[API Verify] User authenticated, fetching admin data");
    await connectDB();
    const admin = await Admin.findById(auth.userId).select("-password");

    if (!admin) {
      const error = new Error("Admin not found in database");
      console.error("[API Verify] Database Error", {
        error: error,
        userId: auth.userId,
        timestamp: new Date().toISOString(),
      });
      return json({ message: "Admin non trouvé" }, 401);
    }

    console.log("[API Verify] Admin found and verified");
    return json({
      isAuthenticated: true,
      admin: {
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("[API Verify] Global Error", {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      name: error.name,
    });
    return json({ message: "Erreur serveur" }, 500);
  }
}
