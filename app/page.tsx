"use client";

import InstallButton from "./install-button";

export default function Home() {
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
        Installa la app per ricevere aggiornamenti su GPS, abilitazioni, TFA
        sostegno e percorsi universitari direttamente sul tuo telefono.
      </p>

      <div style={{ marginTop: 30 }}>
        <InstallButton />
      </div>

      <p style={{ marginTop: 20, fontSize: 14 }}>
        Dopo l&apos;installazione potrai registrarti e accedere alla tua
        dashboard personale.
      </p>
    </main>
  );
}
