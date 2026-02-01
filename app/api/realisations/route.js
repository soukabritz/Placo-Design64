import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Realisation from "@/lib/models/Realisation";
import { verifyAuth } from "@/lib/utils/auth";
import { uploadToCloudinary } from "@/lib/utils/cloudinary";

export async function GET() {
  try {
    await connectDB();
    const realisations = await Realisation.find().sort({ date: -1 });
    return NextResponse.json(realisations);
  } catch (error) {
    console.error("Erreur GET realisations:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const formData = await request.formData();
    const titre = formData.get("titre");
    const description = formData.get("description");
    const showOnHome = formData.get("showOnHome") === "true";
    const image = formData.get("image");

    if (!titre || !image) {
      return NextResponse.json(
        { message: "Le titre et l'image sont requis" },
        { status: 400 },
      );
    }

    // Convert file to buffer for Cloudinary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64 for Cloudinary upload
    const fileBase64 = `data:${image.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await uploadToCloudinary(
      fileBase64,
      "placo-design-64/realisations",
    );

    await connectDB();
    const realisation = new Realisation({
      titre,
      description,
      imageUrl: uploadResult.url,
      showOnHome,
    });

    await realisation.save();
    return NextResponse.json(realisation, { status: 201 });
  } catch (error) {
    console.error("Erreur POST realisation:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création" },
      { status: 500 },
    );
  }
}
