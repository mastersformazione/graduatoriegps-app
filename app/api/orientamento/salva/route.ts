import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      user_email,
      user_nome,
      cambiamento,
      obiettivo,
      titolo_studio,
      interesse,
      urgenza,
      risultato_tipo,
    } = body;

    const query = `
      INSERT INTO orientamento_profili
      (user_email, user_nome, cambiamento, obiettivo, titolo_studio, interesse, urgenza, risultato_tipo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      user_email,
      user_nome,
      cambiamento,
      obiettivo,
      titolo_studio,
      interesse,
      urgenza,
      risultato_tipo,
    ]);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Errore salvataggio:", error);

    return NextResponse.json(
      {
        success: false,
        errorMessage:
          error instanceof Error ? error.message : "Errore sconosciuto",
      },
      { status: 500 }
    );
  }
}
