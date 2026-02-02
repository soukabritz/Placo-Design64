import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Debug endpoint to check environment variables
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI ? "***SET***" : "***MISSING***",
      MONGODB_URL: process.env.MONGODB_URL ? "***SET***" : "***MISSING***",
      DATABASE_URL: process.env.DATABASE_URL ? "***SET***" : "***MISSING***",
      DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING
        ? "***SET***"
        : "***MISSING***",
      DB_URI: process.env.DB_URI ? "***SET***" : "***MISSING***",
      CONTACT_EMAIL: process.env.CONTACT_EMAIL ? "***SET***" : "***MISSING***",
      CONTACT_EMAIL_PASSWORD: process.env.CONTACT_EMAIL_PASSWORD
        ? "***SET***"
        : "***MISSING***",
      RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY
        ? "***SET***"
        : "***MISSING***",
      JWT_SECRET: process.env.JWT_SECRET ? "***SET***" : "***MISSING***",
      // List all environment variables that start with common prefixes
      allEnvVars: Object.keys(process.env)
        .filter(
          (key) =>
            key.includes("MONGO") ||
            key.includes("DB") ||
            key.includes("DATABASE") ||
            key.includes("HOSTINGER") ||
            key.includes("VERCEL") ||
            key.includes("NEXT_PUBLIC"),
        )
        .sort(),
    };

    console.log("[Debug Env] Environment variables check", {
      timestamp: new Date().toISOString(),
      envVars: envVars,
    });

    return NextResponse.json({
      message: "Environment variables debug info",
      envVars,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Debug Env] Error", {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message: "Debug endpoint error",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
