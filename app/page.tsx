"use client";

import InstallButton from "./install-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleAccess = () => {
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
        Accedi alla tua area personale per ricevere aggiornamenti su GPS,
        abilitazioni, TFA sostegno e percorsi universitari.
      </p>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleAccess}
          style={{
            padding: 12,
            background: "black",
            color: "white",
            width: "100%",
          }}
        >
          Accedi / Registrati
        </button>
      </div>

      <InstallButton />
    </main>
  );
}
