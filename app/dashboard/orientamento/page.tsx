"use client";

import { useState } from "react";

type OrientamentoData = {
  cambiamento?: string;
  titolo_studio?: string;
  interesse?: string;
  urgenza?: string;
};

type StepItem = {
  id: keyof OrientamentoData;
  domanda: string;
  opzioni: string[];
};

export default function OrientamentoPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<OrientamentoData>({});

  const steps: StepItem[] = [
    {
      id: "cambiamento",
      domanda: "Che cambiamento vorresti ottenere nella tua vita?",
      opzioni: [
        "Voglio lavorare nella scuola",
        "Voglio diventare un professionista",
        "Voglio guadagnare di più",
        "Voglio cambiare lavoro",
        "Voglio prendere una laurea",
        "Non ho ancora le idee chiare",
      ],
    },
    {
      id: "titolo_studio",
      domanda: "Qual è il tuo titolo di studio attuale?",
      opzioni: [
        "Diploma",
        "Laurea triennale",
        "Laurea magistrale",
        "Laurea vecchio ordinamento",
        "Master",
        "Non ho ancora un titolo universitario",
        "Altro",
      ],
    },
    {
      id: "interesse",
      domanda: "Quale ambito ti appassiona di più?",
      opzioni: [
        "Aiutare le persone",
        "Insegnare",
        "Lavorare con bambini e ragazzi",
        "Economia e impresa",
        "Diritto e giustizia",
        "Comunicazione",
        "Tecnologia",
        "Sport e benessere",
        "Pubblica amministrazione",
        "Non saprei",
      ],
    },
    {
      id: "urgenza",
      domanda: "Quando vorresti iniziare a costruire questo percorso?",
      opzioni: [
        "Subito",
        "Entro 3 mesi",
        "Entro 6 mesi",
        "Più avanti",
        "Sto solo cercando informazioni",
      ],
    },
  ];

  const handleSelect = async (value: string) => {
    const currentStep = steps[step];

    const updatedData: OrientamentoData = {
      ...formData,
      [currentStep.id]: value,
    };

    setFormData(updatedData);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      await salvaDati(updatedData);
      setStep(step + 1);
    }
  };

  const salvaDati = async (data: OrientamentoData) => {
    try {
      await fetch("/api/orientamento/salva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: "test@app.com",
          user_nome: "Utente",
          cambiamento: data.cambiamento,
          obiettivo: data.cambiamento,
          titolo_studio: data.titolo_studio,
          interesse: data.interesse,
          urgenza: data.urgenza,
          risultato_tipo: "BASE",
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (step >= steps.length) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Il tuo orientamento è pronto</h1>
        <p>
          In base alle tue risposte possiamo già individuare una direzione utile
          per costruire il tuo percorso.
        </p>

        <h3>Prossimo passo consigliato:</h3>

        <ul>
          <li>Verifica del tuo titolo di studio</li>
          <li>Analisi delle opportunità disponibili</li>
          <li>Scelta del percorso più adatto</li>
        </ul>

        <button style={{ marginTop: 20 }}>Parla con un orientatore</button>
      </div>
    );
  }

  const current = steps[step];

  return (
    <div style={{ padding: 20 }}>
      <h1>Trova la tua strada</h1>
      <p>{current.domanda}</p>

      <div style={{ marginTop: 20 }}>
        {current.opzioni.map((opzione, index) => (
          <button
            key={index}
            onClick={() => handleSelect(opzione)}
            style={{
              display: "block",
              marginBottom: 10,
              padding: 10,
              width: "100%",
            }}
          >
            {opzione}
          </button>
        ))}
      </div>
    </div>
  );
}
