import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Admin from "@/lib/models/Admin";
import { signToken, setAuthCookie } from "@/lib/utils/auth";
import axios from "axios";

export async function POST(request) {
  try {
    console.log("Login API: Request received");

    const { email, password, recaptchaToken } = await request.json();
    console.log("Login API: Parsed request data", {
      email: email?.substring(0, 3) + "***",
      hasRecaptcha: !!recaptchaToken,
    });

    if (!email || !password) {
      console.log("Login API: Missing email or password");
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 },
      );
    }

    // Verify reCAPTCHA if configured
    if (process.env.RECAPTCHA_SECRET_KEY) {
      console.log("Login API: reCAPTCHA verification required");
      if (!recaptchaToken) {
        console.log("Login API: Missing reCAPTCHA token");
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

        console.log(
          "Login API: reCAPTCHA verification result",
          recaptchaResponse.data,
        );

        if (!recaptchaResponse.data.success) {
          console.log("Login API: reCAPTCHA verification failed");
          return NextResponse.json(
            { message: "Échec de la vérification reCAPTCHA" },
            { status: 400 },
          );
        }
      } catch (error) {
        console.error("Login API: reCAPTCHA error:", error);
        return NextResponse.json(
          { message: "Erreur lors de la vérification reCAPTCHA" },
          { status: 400 },
        );
      }
    } else {
      console.log("Login API: reCAPTCHA not configured, skipping verification");
    }

    // Connect to database and find admin
    console.log("Login API: Connecting to database");
    await connectDB();
    const admin = await Admin.findOne({ email });
    console.log("Login API: Admin found:", !!admin);

    if (!admin) {
      console.log("Login API: Admin not found");
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 },
      );
    }

    // Verify password
    console.log("Login API: Verifying password");
    const isValidPassword = await admin.comparePassword(password);
    console.log("Login API: Password valid:", isValidPassword);

    if (!isValidPassword) {
      console.log("Login API: Invalid password");
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 },
      );
    }

    // Create token
    console.log("Login API: Creating token");
    const token = signToken({ id: admin._id.toString() });

    // Create response with cookie
    const response = NextResponse.json({
      message: "Connexion réussie",
      admin: {
        email: admin.email,
      },
    });

    setAuthCookie(response, token);
    console.log("Login API: Login successful");

    return response;
  } catch (error) {
    console.error("Login API: Error:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
