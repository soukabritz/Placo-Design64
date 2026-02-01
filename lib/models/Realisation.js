import mongoose from "mongoose";

const realisationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  imageUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
  showOnHome: { type: Boolean, default: false },
});

export default mongoose.models.Realisation ||
  mongoose.model("Realisation", realisationSchema);
