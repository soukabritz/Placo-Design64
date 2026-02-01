import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Realisation from "@/lib/models/Realisation";

export async function GET() {
  try {
    await connectDB();
    const realisations = await Realisation.find({ showOnHome: true }).sort({
      date: -1,
    });
    return NextResponse.json(realisations);
  } catch (error) {
    console.error("Erreur GET home realisations:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
