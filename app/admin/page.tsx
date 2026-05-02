"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    titolo: "",
    messaggio: "",
    categoria: "Generale",
    adminKey: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Invio in corso...");

    try {
      const res = await fetch(
        "https://graduatoriegps.it/api/admin-crea-notifica.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Key": form.adminKey,
          },
          body: JSON.stringify({
            titolo: form.titolo,
            messaggio: form.messaggio,
            categoria: form.categoria,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setStatus("Notifica salvata e push inviata correttamente.");

        setForm({
          titolo: "",
          messaggio: "",
          categoria: "Generale",
          adminKey: form.adminKey,
        });
      } else {
        setStatus("Errore: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setStatus("Errore di connessione.");
    }
  };

  return (
    <main
      style={{
        padding: 20,
        fontFamily: "Arial",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <h1>Pannello Admin</h1>

      <p>
        Da qui puoi pubblicare una notifica nella dashboard e inviare una push.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="password"
          placeholder="Chiave admin"
          value={form.adminKey}
          onChange={(e) => setForm({ ...form, adminKey: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Titolo notifica"
          value={form.titolo}
          onChange={(e) => setForm({ ...form, titolo: e.target.value })}
          required
        />

        <textarea
          placeholder="Messaggio"
          value={form.messaggio}
          onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
          required
          rows={5}
        />

        <select
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        >
          <option value="Generale">Generale</option>
          <option value="GPS">GPS</option>
          <option value="Percorsi abilitanti">Percorsi abilitanti</option>
          <option value="TFA sostegno">TFA sostegno</option>
          <option value="Master scuola">Master scuola</option>
        </select>

        <button
          style={{
            padding: 12,
            background: "black",
            color: "white",
          }}
        >
          Pubblica notifica
        </button>
      </form>

      {status && <p style={{ marginTop: 20 }}>{status}</p>}
    </main>
  );
}
