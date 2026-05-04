"use client";

import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function PercorsoPage() {
  const risultato = {
    tipo: "SCUOLA_GPS",
    tempo: "8–12 mesi",
    difficolta: "Media",
    steps: [
      "Verifica del titolo di studio",
      "Iscrizione al percorso universitario",
      "Aumento punteggio GPS",
      "Inserimento in graduatoria",
    ],
    mancanze: [
      "Master universitario (+3 punti)",
      "Certificazione informatica (+1 punto)",
    ],
  };

  return (
    <main style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <Header
        title="Il tuo percorso più veloce"
        subtitle="Abbiamo analizzato il tuo profilo e definito il percorso più rapido per raggiungere il tuo obiettivo."
      />

      <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
        {/* BLOCCO IMPATTO */}
        <Card>
          <h3>Per il tuo profilo</h3>
          <p>Questo è il percorso più rapido per entrare nel mondo scuola</p>

          <p style={{ marginTop: 10 }}>⏱ Tempo: {risultato.tempo}</p>
          <p>📊 Difficoltà: {risultato.difficolta}</p>
        </Card>

        {/* ROADMAP */}
        <Card title="Il percorso passo dopo passo">
          <ul>
            {risultato.steps.map((step, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                {step}
              </li>
            ))}
          </ul>
        </Card>

        {/* COSA MANCA */}
        <Card title="Cosa ti manca per arrivarci">
          <ul>
            {risultato.mancanze.map((item, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* RISULTATO */}
        <Card title="Cosa puoi ottenere">
          <p>
            Seguendo questo percorso puoi aumentare le tue possibilità di
            inserimento in graduatoria e costruire una posizione più stabile.
          </p>
        </Card>

        {/* CTA */}
        <Button
          label="Ricevi il tuo piano personalizzato"
          variant="primary"
          onClick={() =>
            window.open(
              "https://wa.me/393298170817?text=Ho visto il percorso più veloce, voglio il piano personalizzato",
              "_blank"
            )
          }
        />
      </div>
    </main>
  );
}
