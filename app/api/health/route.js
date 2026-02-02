import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[Health Check] Request received");

    const healthData = {
      status: "ok",
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      hasMongoURI: !!process.env.MONGODB_URI,
      hasMongoURL: !!process.env.MONGODB_URL,
      hasDatabaseURL: !!process.env.DATABASE_URL,
      hasDBConnectionString: !!process.env.DB_CONNECTION_STRING,
      hasDBURI: !!process.env.DB_URI,
      allEnvKeys: Object.keys(process.env),
      allEnvVars: Object.fromEntries(
        Object.entries(process.env).map(([key, value]) => [key, value]),
      ),
      memory: process.memoryUsage(),
      uptime: process.uptime(),
    };

    console.log("[Health Check] Success", healthData);

    return NextResponse.json(healthData);
  } catch (error) {
    console.error("[Health Check] Error", {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
