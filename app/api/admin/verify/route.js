import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Admin from "@/lib/models/Admin";
import { verifyAuth } from "@/lib/utils/auth";

export async function GET(request) {
  try {
    const auth = await verifyAuth(request);

    if (!auth.authenticated) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    await connectDB();
    const admin = await Admin.findById(auth.userId).select("-password");

    if (!admin) {
      return NextResponse.json(
        { message: "Admin non trouvé" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      isAuthenticated: true,
      admin: {
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Erreur de vérification auth:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
