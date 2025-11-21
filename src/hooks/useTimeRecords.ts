"use client";

import { useState, useEffect } from "react";
import { timeRecord } from "@/types/time-records";

export function useTimeRecords() {
  const [timeRecords, setCards] = useState<timeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchTimeRecords() {
    try {
      setLoading(true);
      const response = await fetch("/api/time-records", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar registros de tempo");
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

  useEffect(() => {
    fetchTimeRecords();
  }, []);

  return {
    timeRecords,
    loading,
    error,
    fetchTimeRecords,
  };
}