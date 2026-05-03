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
          risultato_tipo: getRisultato().tipo,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getRisultato = () => {
    const cambiamento = formData.cambiamento || "";
    const interesse = formData.interesse || "";

    if (
      cambiamento === "Voglio lavorare nella scuola" ||
      interesse === "Insegnare"
    ) {
      return {
        tipo: "SCUOLA_GPS",
        titolo: "Percorso consigliato: mondo scuola",
        descrizione:
          "Le tue risposte indicano un interesse verso l’insegnamento, le GPS o la crescita nel mondo scuola. Il primo passo è verificare se il tuo titolo è già spendibile o se servono integrazioni, master o certificazioni.",
        consigli: [
          "Verifica del titolo di studio",
          "Controllo delle classi di concorso accessibili",
          "Eventuale integrazione di esami",
          "Master universitari per aumentare il punteggio",
          "Certificazioni informatiche e linguistiche",
        ],
      };
    }

    if (cambiamento === "Voglio diventare un professionista") {
      return {
        tipo: "PROFESSIONE",
        titolo: "Percorso consigliato: professione regolamentata",
        descrizione:
          "Hai scelto una strada che può richiedere una laurea specifica, un percorso strutturato e, in alcuni casi, tirocinio o abilitazione professionale.",
        consigli: [
          "Scelta della laurea più coerente",
          "Verifica dei requisiti professionali",
          "Valutazione tra triennale, magistrale o ciclo unico",
          "Orientamento prima dell’iscrizione",
        ],
      };
    }

    if (
      cambiamento === "Voglio guadagnare di più" ||
      cambiamento === "Voglio cambiare lavoro"
    ) {
      return {
        tipo: "CRESCITA_LAVORO",
        titolo: "Percorso consigliato: crescita professionale",
        descrizione:
          "Il tuo obiettivo sembra essere migliorare la tua posizione, aumentare le opportunità o cambiare settore. In questo caso può essere utile valutare una laurea, un master o certificazioni mirate.",
        consigli: [
          "Laurea triennale o magistrale",
          "Master professionalizzante",
          "Certificazioni spendibili nel lavoro",
          "Percorsi collegati a scuola, concorsi o aziende",
        ],
      };
    }

    if (cambiamento === "Voglio prendere una laurea") {
      return {
        tipo: "LAUREA",
        titolo: "Percorso consigliato: scelta universitaria",
        descrizione:
          "Le tue risposte indicano che vuoi costruire un percorso universitario. La scelta migliore dipende dal tuo titolo attuale, dai tuoi interessi e dal tipo di lavoro che immagini per il futuro.",
        consigli: [
          "Analisi dell’area universitaria più adatta",
          "Confronto tra corsi di laurea",
          "Valutazione degli sbocchi professionali",
          "Piano di studio compatibile con lavoro e impegni",
        ],
      };
    }

    return {
      tipo: "INDECISO",
      titolo: "Percorso consigliato: chiarire la direzione",
      descrizione:
        "È normale non avere ancora le idee chiare. Il punto di partenza migliore è capire quale obiettivo vuoi costruire e quale percorso può essere più realistico per la tua situazione.",
      consigli: [
        "Consulenza orientativa",
        "Analisi del titolo attuale",
        "Confronto tra più aree di studio",
        "Valutazione delle opportunità più concrete",
      ],
    };
  };

  if (step >= steps.length) {
    const risultato = getRisultato();

    return (
      <div style={{ padding: 20 }}>
        <h1>{risultato.titolo}</h1>

        <p>{risultato.descrizione}</p>

        <h3>Cosa potresti valutare adesso:</h3>

        <ul>
          {risultato.consigli.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p style={{ marginTop: 20 }}>
          Ogni situazione cambia in base al titolo di studio, all’obiettivo e
          alle tempistiche. Prima di scegliere un corso, può essere utile fare
          una verifica personalizzata.
        </p>

        <a
          href="https://wa.me/393298170817?text=Ho%20completato%20il%20test%20di%20orientamento%20e%20vorrei%20ricevere%20un%20piano%20personalizzato"
          target="_blank"
        >
          <button style={{ marginTop: 20 }}>
            Ricevi il tuo piano su WhatsApp
          </button>
        </a>
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
