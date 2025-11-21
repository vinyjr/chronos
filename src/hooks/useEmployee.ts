"use client";

import { useState, useEffect } from "react";
import { Employee, newEmployee } from "@/types/employee";
import { validateCPF } from '@/utils/validateCPF'
import { validateTime } from '@/utils/validateTime'


interface ValidationError {
  [key: string]: string;
}

export function useEmployee() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        setLoading(true);
        const response = await fetch("/api/employees", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar colaboradores");
        }

        const data = await response.json();
        setEmployees(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  // Validar formulário
  const validateFormData = (formData: newEmployee): ValidationError => {
    const errors: ValidationError = {};

    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Nome é obrigatório";
    }

    const cpfError = validateCPF(formData.cpf);
    if (cpfError) {
      errors.cpf = cpfError;
    }

    const arrivalError = validateTime(formData.arrivalTime);
    if (arrivalError) {
      errors.arrivalTime = arrivalError;
    }

    const exitError = validateTime(formData.exitTime);
    if (exitError) {
      errors.exitTime = exitError;
    }

    return errors;
  };

  // Criar novo funcionário
  const createEmployee = async (
    formData: newEmployee
  ): Promise<{ success: boolean; error?: string }> => {
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length > 0) {
      return {
        success: false,
        error: Object.values(validationErrors).join(", "),
      };
    }

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao criar colaborador");
      }

      const newEmployeeData = await response.json();
      setEmployees([...employees, newEmployeeData.data]);

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar colaborador";
      return { success: false, error: errorMessage };
    }
  };

  return {
    employees,
    setEmployees,
    loading,
    error,
    createEmployee,
    validateFormData,
  };
}
