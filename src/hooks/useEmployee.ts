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

  const updateEmployee = async (
    id: number,
    formData: Partial<newEmployee>
  ): Promise<{ success: boolean; error?: string }> => {
    const validationErrors = validateFormData(formData as newEmployee);

    const filteredErrors = Object.keys(validationErrors).reduce(
      (acc, key) => {
        if (formData[key as keyof newEmployee]) {
          acc[key] = validationErrors[key];
        }
        return acc;
      },
      {} as ValidationError
    );

    if (Object.keys(filteredErrors).length > 0) {
      return {
        success: false,
        error: Object.values(filteredErrors).join(", "),
      };
    }

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao atualizar colaborador");
      }

      const updatedEmployeeData = await response.json();
      setEmployees(
        employees.map((emp) =>
          emp.id === id ? updatedEmployeeData.data : emp
        )
      );

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar colaborador";
      return { success: false, error: errorMessage };
    }
  };

  const deleteEmployee = async (
    id: number
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao excluir colaborador");
      }

      setEmployees(employees.filter((emp) => emp.id !== id));

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao excluir colaborador";
      return { success: false, error: errorMessage };
    }
  };

  return {
    employees,
    setEmployees,
    loading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    validateFormData,
  };
}
