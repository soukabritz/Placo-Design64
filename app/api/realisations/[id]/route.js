import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Realisation from "@/lib/models/Realisation";
import { verifyAuth } from "@/lib/utils/auth";
import { uploadToCloudinary } from "@/lib/utils/cloudinary";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type");
    let updateData = {};

    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      updateData = {
        titre: formData.get("titre"),
        description: formData.get("description"),
        showOnHome: formData.get("showOnHome") === "true",
      };

      const image = formData.get("image");
      if (image && typeof image !== "string") {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileBase64 = `data:${image.type};base64,${buffer.toString("base64")}`;
        const uploadResult = await uploadToCloudinary(
          fileBase64,
          "placo-design-64/realisations",
        );
        updateData.imageUrl = uploadResult.url;
      } else if (formData.get("imageUrl")) {
        updateData.imageUrl = formData.get("imageUrl");
      }
    } else {
      updateData = await request.json();
    }

    await connectDB();
    const realisation = await Realisation.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!realisation) {
      return NextResponse.json(
        { message: "Réalisation non trouvée" },
        { status: 404 },
      );
    }

    return NextResponse.json(realisation);
  } catch (error) {
    console.error("Erreur PUT realisation:", error);
    return NextResponse.json(
      { message: "Erreur lors de la modification" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    await connectDB();
    const realisation = await Realisation.findByIdAndDelete(id);

    if (!realisation) {
      return NextResponse.json(
        { message: "Réalisation non trouvée" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Réalisation supprimée" });
  } catch (error) {
    console.error("Erreur DELETE realisation:", error);
    return NextResponse.json(
      { message: "Erreur lors de la suppression" },
      { status: 500 },
    );
  }
}
