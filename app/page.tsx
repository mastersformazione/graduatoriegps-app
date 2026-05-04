"use client";

import InstallButton from "./install-button";
import { useRouter } from "next/navigation";
import ActionSheet from "@/components/ActionSheet";

export default function Home() {
  const router = useRouter();

  const handleAction = (action: string) => {
    if (action === "Home") {
      router.push("/");
    }

    if (action === "Accedi") {
      router.push("/dashboard");
    }

    if (action === "Registra") {
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

      <InstallButton />

      <p style={{ marginTop: 20, fontSize: 14 }}>
        Se hai già installato la app, puoi registrarti o accedere alla dashboard
        da questa schermata.
      </p>

      {/* ACTION SHEET */}
      <ActionSheet
        title="Menu"
        description="Scegli cosa fare"
        actions={["Home", "Accedi", "Registra"]}
        onAction={handleAction}
      />
    </main>
  );
}
