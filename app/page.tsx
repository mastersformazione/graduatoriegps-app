"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    interesse: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("https://graduatoriegps.it/api/leads.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registrazione completata");

        // reset form
        setForm({
          nome: "",
          email: "",
          telefono: "",
          interesse: "",
        });
      } else {
        alert("Errore: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Errore di connessione");
    }
  };

  return (
    <main style={{ padding: 20, fontFamily: "Arial", maxWidth: 400 }}>
      <h1>Graduatorie GPS 2026</h1>

      <p>
        Ricevi aggiornamenti su GPS, abilitazioni e percorsi universitari
        direttamente sul tuo telefono.
      </p>

      <h2>Registrati gratis</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Telefono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          required
        />

        <select
          value={form.interesse}
          onChange={(e) => setForm({ ...form, interesse: e.target.value })}
          required
        >
          <option value="">Seleziona interesse</option>
          <option value="Percorsi abilitanti">Percorsi abilitanti</option>
          <option value="GPS">GPS</option>
          <option value="TFA sostegno">TFA sostegno</option>
          <option value="Master scuola">Master scuola</option>
        </select>

        <button style={{ padding: 10, background: "black", color: "white" }}>
          Registrati
        </button>
      </form>
    </main>
  );
}
