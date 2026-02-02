import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[API Root] Basic test endpoint");
    
    return NextResponse.json({
      message: "API is working!",
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV
    });
  } catch (error) {
    console.error("[API Root] Error", error);
    return NextResponse.json(
      { message: "API Error", error: error.message },
      { status: 500 }
    );
  }
}
