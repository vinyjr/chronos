"use client";

import { useState } from "react";
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

import { newEmployee } from "@/types/employee";
import { useEmployee } from "@/hooks/useEmployee";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onEmployeeAdded?: () => void;
}

export default function EmployeeForm({
  open,
  onClose,
  onEmployeeAdded,
}: EmployeeFormProps) {
  const { createEmployee, validateFormData } = useEmployee();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro do campo ao editar
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

    // Validar formulário
    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    const result = await createEmployee(formData);

    if (result.success) {
      setSuccessMessage("Colaborador adicionado com sucesso!");
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
      setErrorMessage(result.error || "Erro ao adicionar colaborador");
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
  console.log(fieldErrors.name);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ mt: 1 }}>Novo Colaborador</DialogTitle>
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
            helperText={fieldErrors.name}
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
            helperText={fieldErrors.cpf || "Mínimo 11 caracteres"}
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
          {loading ? <CircularProgress size={24} /> : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
