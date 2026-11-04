import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import connectDB from "@/lib/db/mongodb";
import Admin from "@/lib/models/Admin";

const TOKEN_TTL_MS = 60 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;

const GENERIC_MESSAGE =
  "Si un compte correspond à cette adresse, un email de réinitialisation vient d'être envoyé. Le lien est valable 1 heure.";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getBaseUrl(request) {
  const configured = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  const proto = request.headers.get("x-forwarded-proto") || "https";

  if (
    process.env.NODE_ENV === "production" &&
    (!host || host.startsWith("localhost") || host.startsWith("127.0.0.1"))
  ) {
    return "https://placodesign64.com";
  }

  return `${proto}://${host}`;
}

export async function POST(request) {
  try {
    const { email } = await request.json();
    const normalizedEmail = String(email || "").trim();

    if (!normalizedEmail) {
      return NextResponse.json(
        { message: "L'adresse email est requise." },
        { status: 400 },
      );
    }

    if (!process.env.CONTACT_EMAIL || !process.env.CONTACT_EMAIL_PASSWORD) {
      console.error("[API ForgotPassword] Email transport is not configured");
      return NextResponse.json(
        {
          message:
            "L'envoi d'email n'est pas configuré sur le serveur. Réessayez plus tard.",
        },
        { status: 500 },
      );
    }

    await connectDB();
    const admin = await Admin.findOne({
      email: {
        $regex: `^${escapeRegex(normalizedEmail)}$`,
        $options: "i",
      },
    }).select("+resetPasswordTokenHash +resetPasswordExpires");

    if (!admin) {
      return NextResponse.json({ message: GENERIC_MESSAGE });
    }

    const expiresAt = admin.resetPasswordExpires
      ? new Date(admin.resetPasswordExpires).getTime()
      : 0;
    if (expiresAt - Date.now() > TOKEN_TTL_MS - RESEND_COOLDOWN_MS) {
      return NextResponse.json({ message: GENERIC_MESSAGE });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    admin.resetPasswordTokenHash = tokenHash;
    admin.resetPasswordExpires = new Date(Date.now() + TOKEN_TTL_MS);
    await admin.save();

    const resetUrl = `${getBaseUrl(request)}/reinitialiser-mot-de-passe?token=${rawToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Placo Design 64" <${process.env.CONTACT_EMAIL}>`,
        to: admin.email,
        subject: "Réinitialisation de votre mot de passe",
        text: `Bonjour,

Vous avez demandé à réinitialiser le mot de passe administrateur de Placo Design 64.

Ouvrez ce lien pour choisir un nouveau mot de passe (valable 1 heure) :
${resetUrl}

Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.

Placo Design 64
`,
      });
    } catch (mailError) {
      admin.resetPasswordTokenHash = null;
      admin.resetPasswordExpires = null;
      await admin.save();
      console.error("[API ForgotPassword] Email send failed", {
        message: mailError.message,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        {
          message:
            "L'email n'a pas pu être envoyé. Réessayez dans un moment.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: GENERIC_MESSAGE });
  } catch (error) {
    console.error("[API ForgotPassword] Error", {
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { message: "Erreur serveur. Réessayez dans un moment." },
      { status: 500 },
    );
  }
}
