import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[API Root] Basic test endpoint");

    // Check required environment variables
    const requiredVars = {
      MONGODB_URI: process.env.MONGODB_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      CONTACT_EMAIL: process.env.CONTACT_EMAIL,
      CONTACT_EMAIL_PASSWORD: process.env.CONTACT_EMAIL_PASSWORD,
    };

    const missingVars = Object.entries(requiredVars)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      return NextResponse.json({
        message: "Environment variables missing",
        status: "error",
        missing: missingVars,
        timestamp: new Date().toISOString(),
        nodeEnv: process.env.NODE_ENV,
      });
    }

    return NextResponse.json({
      message:
        "All systems ready! Environment variables are properly configured.",
      status: "ok",
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error("[API Root] Error", error);
    return NextResponse.json(
      { message: "API Error", error: error.message },
      { status: 500 },
    );
  }
}
