import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Realisation from "@/lib/models/Realisation";

export async function GET() {
  try {
    console.log("[API Home Realisations] GET request received");
    await connectDB();
    console.log("[API Home Realisations] Database connected, fetching data...");
    const realisations = await Realisation.find({ showOnHome: true }).sort({
      date: -1,
    });
    console.log(`[API Home Realisations] Found ${realisations.length} items`);
    return NextResponse.json(realisations);
  } catch (error) {
    console.error("[API Home Realisations] GET Error", {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      name: error.name,
    });
    return NextResponse.json(
      { message: "Erreur serveur", details: error.message },
      { status: 500 },
    );
  }
}
