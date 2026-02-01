import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { nom, prenom, telephone, email, objet, precision } =
      await request.json();

    if (!nom || !prenom || !telephone || !email || !objet || !precision) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires." },
        { status: 400 },
      );
    }

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

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Votre message a bien été envoyé !" });
  } catch (error) {
    console.error("Erreur envoi mail:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'envoi du message." },
      { status: 500 },
    );
  }
}
