"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type GpsUser = {
  nome: string;
  email: string;
  telefono: string;
  interesse: string;
};

type Notifica = {
  id: string;
  titolo: string;
  messaggio: string;
  categoria: string;
  created_at: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<GpsUser | null>(null);
  const [notifiche, setNotifiche] = useState<Notifica[]>([]);

  useEffect(() => {
    // Reset badge notifiche quando apro la dashboard

    const storedUser = localStorage.getItem("gps_user");

    if (!storedUser) {
      router.push("/register");
      return;
    }

    setUser(JSON.parse(storedUser) as GpsUser);

    const loadNotifiche = () => {
      fetch("https://graduatoriegps.it/api/notifiche.php?t=" + Date.now(), {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setNotifiche(data.data);
          }
        })
        .catch((error) => {
          console.error("Errore caricamento notifiche:", error);
        });
    };

    loadNotifiche();

    const interval = setInterval(loadNotifiche, 10000);

    return () => clearInterval(interval);
  }, [router]);

  if (!user) return null;

  return (
    <main style={{ padding: 20, fontFamily: "Arial", maxWidth: 500 }}>
      <h1>Dashboard Graduatorie GPS</h1>

      <p>Benvenuto {user.nome} 👋</p>

      <h2>Ultimi aggiornamenti</h2>

      {notifiche.length === 0 ? (
        <p>Nessuna notifica disponibile al momento.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {notifiche.map((notifica) => (
            <div
              key={notifica.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
                background: "#f9f9f9",
              }}
            >
              <h3 style={{ margin: "0 0 6px" }}>{notifica.titolo}</h3>
              <p style={{ margin: "0 0 8px" }}>{notifica.messaggio}</p>
              <small>
                {notifica.categoria} · {notifica.created_at}
              </small>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
