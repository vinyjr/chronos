"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";

import { newEmployee, Employee } from "@/types/employee";
import { useEmployee } from "@/hooks/useEmployee";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onEmployeeAdded?: () => void;
  selectedEmployee?: Employee | null;
}

export default function EmployeeForm({
  open,
  onClose,
  onEmployeeAdded,
  selectedEmployee,
}: EmployeeFormProps) {
  const { createEmployee, updateEmployee, validateFormData } = useEmployee();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<newEmployee>({
    name: "",
    cpf: "",
    arrivalTime: "",
    exitTime: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name,
        cpf: selectedEmployee.cpf,
        arrivalTime: selectedEmployee.arrivalTime,
        exitTime: selectedEmployee.exitTime,
      });
    } else {
      setFormData({
        name: "",
        cpf: "",
        arrivalTime: "",
        exitTime: "",
      });
    }
    setErrorMessage(null);
    setSuccessMessage(null);
    setFieldErrors({});
  }, [selectedEmployee, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "name") {
      formattedValue = value.slice(0, 100);
    } else if (name === "cpf") {
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      if (numericValue.length <= 3) {
        formattedValue = numericValue;
      } else if (numericValue.length <= 6) {
        formattedValue = numericValue.slice(0, 3) + "." + numericValue.slice(3);
      } else if (numericValue.length <= 9) {
        formattedValue =
          numericValue.slice(0, 3) +
          "." +
          numericValue.slice(3, 6) +
          "." +
          numericValue.slice(6);
      } else {
        formattedValue =
          numericValue.slice(0, 3) +
          "." +
          numericValue.slice(3, 6) +
          "." +
          numericValue.slice(6, 9) +
          "-" +
          numericValue.slice(9);
      }
    } else if (name === "arrivalTime" || name === "exitTime") {
      const numericValue = value.replace(/\D/g, "").slice(0, 4);
      if (numericValue.length <= 2) {
        formattedValue = numericValue;
      } else {
        formattedValue = numericValue.slice(0, 2) + ":" + numericValue.slice(2);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    const cleanCPF = formData.cpf.replace(/\D/g, "");
    const dataToSend = {
      ...formData,
      cpf: cleanCPF,
    };

    let result;
    if (selectedEmployee) {
      // Edição
      result = await updateEmployee(selectedEmployee.id, dataToSend);
      if (result.success) {
        setSuccessMessage("Colaborador atualizado com sucesso!");
      }
    } else {
      // Criação
      result = await createEmployee(dataToSend);
      if (result.success) {
        setSuccessMessage("Colaborador adicionado com sucesso!");
      }
    }

    if (result.success) {
      setFormData({
        name: "",
        cpf: "",
        arrivalTime: "",
        exitTime: "",
      });
      setFieldErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
        onEmployeeAdded?.();
      }, 1500);
    } else {
      setErrorMessage(result.error || "Erro ao processar colaborador");
    }

    setLoading(false);
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: "",
        cpf: "",
        arrivalTime: "",
        exitTime: "",
      });
      setFieldErrors({});
      setErrorMessage(null);
      setSuccessMessage(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ mt: 1 }}>
        {selectedEmployee ? "Editar Colaborador" : "Novo Colaborador"}
      </DialogTitle>
      <DialogContent sx={{ margin: 1 }}>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <TextField
            variant="outlined"
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            disabled={loading}
            error={!!fieldErrors.name}
            helperText={fieldErrors.name || `${formData.name.length}/100`}
            slotProps={{
              htmlInput: {
                maxLength: 100,
              },
            }}
          />

          <TextField
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            fullWidth
            disabled={loading}
            placeholder="000.000.000-00"
            error={!!fieldErrors.cpf}
            helperText={fieldErrors.cpf || "11 dígitos"}
            slotProps={{
              htmlInput: {
                maxLength: 14,
                inputMode: "numeric",
              },
            }}
            sx={{ borderRadius: 3 }}
          />
          <Grid
            sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
          >
            <TextField
              label="Horário de Chegada"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="HH:MM"
              fullWidth
              error={!!fieldErrors.arrivalTime}
              helperText={fieldErrors.arrivalTime || "Formato: HH:MM"}
              inputProps={{ maxLength: 5, inputMode: "numeric" }}
              sx={{ borderRadius: 3, maxWidth: 250 }}
            />

            <TextField
              label="Horário de Saída"
              name="exitTime"
              value={formData.exitTime}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="HH:MM"
              fullWidth
              error={!!fieldErrors.exitTime}
              helperText={fieldErrors.exitTime || "Formato: HH:MM"}
              slotProps={{
                htmlInput: {
                  maxLength: 5,
                  inputMode: "numeric",
                },
              }}
              sx={{ borderRadius: 3, maxWidth: 250 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleClose}
          disabled={loading}
          sx={{ borderRadius: 3 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{ position: "relative", borderRadius: 3 }}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : selectedEmployee ? (
            "Atualizar"
          ) : (
            "Adicionar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
