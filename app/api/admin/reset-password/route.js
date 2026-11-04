import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db/mongodb";
import Admin from "@/lib/models/Admin";

export async function POST(request) {
  try {
    const { token, password } = await request.json();
    const rawToken = String(token || "").trim();
    const nextPassword = String(password || "");

    if (!rawToken) {
      return NextResponse.json(
        { message: "Le lien de réinitialisation est incomplet." },
        { status: 400 },
      );
    }

    if (nextPassword.length < 8 || nextPassword.length > 128) {
      return NextResponse.json(
        { message: "Le mot de passe doit contenir entre 8 et 128 caractères." },
        { status: 400 },
      );
    }

    await connectDB();
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const admin = await Admin.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
    }).select("+resetPasswordTokenHash +resetPasswordExpires");

    if (!admin) {
      return NextResponse.json(
        {
          message:
            "Ce lien est invalide ou a expiré. Demandez un nouvel email.",
        },
        { status: 400 },
      );
    }

    admin.password = nextPassword;
    admin.resetPasswordTokenHash = null;
    admin.resetPasswordExpires = null;
    await admin.save();

    return NextResponse.json({
      message: "Mot de passe modifié. Vous pouvez vous connecter.",
    });
  } catch (error) {
    console.error("[API ResetPassword] Error", {
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { message: "Erreur serveur. Réessayez dans un moment." },
      { status: 500 },
    );
  }
}
