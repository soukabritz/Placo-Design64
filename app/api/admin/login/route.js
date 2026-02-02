import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Admin from "@/lib/models/Admin";
import { signToken, setAuthCookie } from "@/lib/utils/auth";

export async function POST(request) {
  try {
    console.log("Login API: Request received");

    const { email, password, recaptchaToken } = await request.json();
    console.log("Login API: Parsed request data", {
      email: email?.substring(0, 3) + "***",
      hasRecaptcha: !!recaptchaToken,
    });

    if (!email || !password) {
      const error = new Error("Missing email or password");
      console.error("Login API: Validation Error - Missing email or password", {
        error: error,
        hasEmail: !!email,
        hasPassword: !!password,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 },
      );
    }

    // Verify reCAPTCHA if configured
    if (process.env.RECAPTCHA_SECRET_KEY) {
      console.log("Login API: reCAPTCHA verification required");
      if (!recaptchaToken) {
        const error = new Error("Missing reCAPTCHA token");
        console.error("Login API: Validation Error - Missing reCAPTCHA token", {
          error: error,
          timestamp: new Date().toISOString(),
        });
        return NextResponse.json(
          { message: "Veuillez valider le reCAPTCHA" },
          { status: 400 },
        );
      }

      try {
        const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

        // Add a 5s timeout to the fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const recaptchaResponse = await fetch(recaptchaUrl, {
          method: "POST",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const recaptchaData = await recaptchaResponse.json();

        console.log("Login API: reCAPTCHA verification result", recaptchaData);

        if (!recaptchaData.success) {
          const error = new Error("reCAPTCHA verification failed");
          console.error("Login API: reCAPTCHA Verification Error", {
            error: error,
            recaptchaData: recaptchaData,
            timestamp: new Date().toISOString(),
          });
          return NextResponse.json(
            { message: "Échec de la vérification reCAPTCHA" },
            { status: 400 },
          );
        }
      } catch (error) {
        console.error("Login API: reCAPTCHA error:", error);
        return NextResponse.json(
          {
            message:
              error.name === "AbortError"
                ? "Le service reCAPTCHA a expiré"
                : "Erreur lors de la vérification reCAPTCHA",
          },
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
      const error = new Error("Admin not found");
      console.error("Login API: Authentication Error - Admin not found", {
        error: error,
        email: email,
        timestamp: new Date().toISOString(),
      });
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
      const error = new Error("Invalid password");
      console.error("Login API: Authentication Error - Invalid password", {
        error: error,
        email: email,
        adminId: admin._id.toString(),
        timestamp: new Date().toISOString(),
      });
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
    console.error("Login API: Global Error", {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      name: error.name,
    });
    return NextResponse.json(
      {
        message: "Erreur serveur",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
