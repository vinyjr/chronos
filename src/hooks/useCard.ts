"use client";

import { useState, useEffect } from "react";
import { card } from "@/types/card";

export function useCard() {
  const [cards, setCards] = useState<card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const response = await fetch("/api/cards", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar cartões");
        }

        const data = await response.json();
        setCards(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setCards([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  return {
    cards,
    loading,
    error,
  };
}
