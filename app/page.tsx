"use client";

import InstallButton from "./install-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    const user = localStorage.getItem("gps_user");

    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  };

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
        Ricevi aggiornamenti su GPS, abilitazioni, TFA sostegno e percorsi
        universitari direttamente sul tuo telefono.
      </p>

      <button
        onClick={handleStart}
        style={{
          marginTop: 20,
          padding: 12,
          background: "black",
          color: "white",
          width: "100%",
        }}
      >
        Inizia / Registrati
      </button>

      <InstallButton />

      <p style={{ marginTop: 20, fontSize: 14 }}>
        Se hai già installato la app, puoi registrarti o accedere alla dashboard
        da questa schermata.
      </p>
    </main>
  );
}
