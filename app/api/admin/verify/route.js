import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Admin from "@/lib/models/Admin";
import { verifyAuth } from "@/lib/utils/auth";

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
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
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
      return NextResponse.json(
        { message: "Admin non trouvé" },
        { status: 401 },
      );
    }

    console.log("[API Verify] Admin found and verified");
    return NextResponse.json({
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
    return NextResponse.json(
      { message: "Erreur serveur", details: error.message },
      { status: 500 },
    );
  }
}
