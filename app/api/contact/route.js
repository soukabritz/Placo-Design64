import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    console.log("[API Contact] POST request received");
    const { nom, prenom, telephone, email, objet, precision } =
      await request.json();

    if (!nom || !prenom || !telephone || !email || !objet || !precision) {
      const error = new Error("Missing required fields");
      console.error("[API Contact] Validation Error", {
        error: error,
        hasNom: !!nom,
        hasPrenom: !!prenom,
        hasTelephone: !!telephone,
        hasEmail: !!email,
        hasObjet: !!objet,
        hasPrecision: !!precision,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires." },
        { status: 400 },
      );
    }

    console.log("[API Contact] Creating email transporter");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${nom} ${prenom}" <${email}>`,
      to: "abdelkader.biarritz@gmail.com",
      subject: `[Contact] ${objet}`,
      text: `
Nom: ${nom}
Prénom: ${prenom}
Téléphone: ${telephone}
Email: ${email}

Objet: ${objet}

Précision:
${precision}
`,
    };

    console.log("[API Contact] Sending email");
    await transporter.sendMail(mailOptions);
    console.log("[API Contact] Email sent successfully", {
      to: "abdelkader.biarritz@gmail.com",
      from: email,
      subject: `[Contact] ${objet}`,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ message: "Votre message a bien été envoyé !" });
  } catch (error) {
    console.error("[API Contact] Error", {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      name: error.name,
    });
    return NextResponse.json(
      { message: "Erreur lors de l'envoi du message.", details: error.message },
      { status: 500 },
    );
  }
}
