"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("gps_user");

    if (!storedUser) {
      router.push("/register");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) {
    return null; // evita flash contenuto
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial", maxWidth: 500 }}>
      <h1>Dashboard Graduatorie GPS</h1>

      <p>Benvenuto {user.nome} 👋</p>

      <h2>I tuoi aggiornamenti</h2>

      <ul>
        <li>Sei registrato correttamente</li>
        <li>Riceverai aggiornamenti personalizzati</li>
        <li>Controlla spesso questa pagina</li>
      </ul>
    </main>
  );
}
