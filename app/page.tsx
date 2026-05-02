"use client";

import InstallButton from "./install-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      style={{
        padding: 20,
        fontFamily: "Arial",
        maxWidth: 400,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1>Graduatorie GPS</h1>

      <p>
        Accedi alla tua area personale per ricevere aggiornamenti su GPS,
        abilitazioni, TFA sostegno e percorsi universitari.
      </p>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => router.push("/register")}
          style={{
            padding: 12,
            background: "black",
            color: "white",
            width: "100%",
          }}
        >
          Entra nella Dashboard
        </button>
      </div>

      <InstallButton />
    </main>
  );
}
