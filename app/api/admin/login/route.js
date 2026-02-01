import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Admin from "@/lib/models/Admin";
import { signToken, setAuthCookie } from "@/lib/utils/auth";
import axios from "axios";

export async function POST(request) {
  try {
    const { email, password, recaptchaToken } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 },
      );
    }

    // Verify reCAPTCHA if configured
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { message: "Veuillez valider le reCAPTCHA" },
          { status: 400 },
        );
      }

      try {
        const recaptchaResponse = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify`,
          null,
          {
            params: {
              secret: process.env.RECAPTCHA_SECRET_KEY,
              response: recaptchaToken,
            },
          },
        );

        if (!recaptchaResponse.data.success) {
          return NextResponse.json(
            { message: "Échec de la vérification reCAPTCHA" },
            { status: 400 },
          );
        }
      } catch (error) {
        console.error("Erreur reCAPTCHA:", error);
        return NextResponse.json(
          { message: "Erreur lors de la vérification reCAPTCHA" },
          { status: 400 },
        );
      }
    }

    // Connect to database and find admin
    await connectDB();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 },
      );
    }

    // Verify password
    const isValidPassword = await admin.comparePassword(password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 },
      );
    }

    // Create token
    const token = signToken({ id: admin._id.toString() });

    // Create response with cookie
    const response = NextResponse.json({
      message: "Connexion réussie",
      admin: {
        email: admin.email,
      },
    });

    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error("Erreur de connexion:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
