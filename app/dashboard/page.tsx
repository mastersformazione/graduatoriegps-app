"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type GpsUser = {
  nome: string;
  email: string;
  telefono: string;
  interesse: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<GpsUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("gps_user");

    if (!storedUser) {
      router.push("/register");
      return;
    }

    setUser(JSON.parse(storedUser) as GpsUser);
  }, [router]);

  if (!user) return null;

  return (
    <main style={{ padding: 20, fontFamily: "Arial", maxWidth: 500 }}>
      <h1>Dashboard Graduatorie GPS</h1>

      <p>Benvenuto {user.nome} 👋</p>

      <h2>I tuoi aggiornamenti</h2>

      <ul>
        <li>Sei registrato correttamente.</li>
        <li>Riceverai aggiornamenti personalizzati.</li>
        <li>Controlla spesso questa pagina.</li>
      </ul>
    </main>
  );
}
