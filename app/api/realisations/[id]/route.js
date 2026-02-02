import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Realisation from "@/lib/models/Realisation";
import { verifyAuth } from "@/lib/utils/auth";
import { uploadToCloudinary } from "@/lib/utils/cloudinary";

export async function PUT(request, { params }) {
  try {
    console.log("[API Realisations] PUT request received");
    const { id } = await params;
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      const error = new Error("Unauthorized access attempt");
      console.error("[API Realisations] PUT Authentication Error", {
        error: error,
        auth: auth,
        id: id,
        timestamp: new Date().toISOString(),
      });
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

    console.log("[API Realisations] PUT: Updating realisation", {
      id,
      updateData,
    });
    await connectDB();
    const realisation = await Realisation.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!realisation) {
      const error = new Error("Realisation not found");
      console.error("[API Realisations] PUT Database Error", {
        error: error,
        id: id,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { message: "Réalisation non trouvée" },
        { status: 404 },
      );
    }

    console.log("[API Realisations] PUT: Realisation updated successfully", {
      id: id,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(realisation);
  } catch (error) {
    console.error("[API Realisations] PUT Error", {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      name: error.name,
    });
    return NextResponse.json(
      { message: "Erreur lors de la modification", details: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    console.log("[API Realisations] DELETE request received");
    const { id } = await params;
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      const error = new Error("Unauthorized access attempt");
      console.error("[API Realisations] DELETE Authentication Error", {
        error: error,
        auth: auth,
        id: id,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    console.log("[API Realisations] DELETE: Deleting realisation", { id });
    await connectDB();
    const realisation = await Realisation.findByIdAndDelete(id);

    if (!realisation) {
      const error = new Error("Realisation not found");
      console.error("[API Realisations] DELETE Database Error", {
        error: error,
        id: id,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { message: "Réalisation non trouvée" },
        { status: 404 },
      );
    }

    console.log("[API Realisations] DELETE: Realisation deleted successfully", {
      id: id,
      titre: realisation.titre,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ message: "Réalisation supprimée" });
  } catch (error) {
    console.error("[API Realisations] DELETE Error", {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      name: error.name,
    });
    return NextResponse.json(
      { message: "Erreur lors de la suppression", details: error.message },
      { status: 500 },
    );
  }
}
