"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useCard } from "@/hooks/useCard";
import { useEmployee } from "@/hooks/useEmployee";
import { Employee } from "@/types/employee";

const ITEMS_PER_PAGE = 10;
const ROW_HEIGHT = 53;
const FIXED_TABLE_HEIGHT = ROW_HEIGHT * ITEMS_PER_PAGE;

export default function CardsPage() {
  const { cards, loading, error, fetchCards } = useCard();
  const { employees } = useEmployee();
  const [employeeMap, setEmployeeMap] = useState<Map<number, Employee>>(
    new Map()
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | "">("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState(false);

  useEffect(() => {
    if (employees && employees.length > 0) {
      const map = new Map<number, Employee>();
      employees.forEach((emp: Employee) => {
        map.set(emp.id, emp);
      });
      setEmployeeMap(map);
    }
  }, [employees]);

  const getEmployeeName = (employeeId: number): string => {
    const employee = employeeMap.get(employeeId);
    return employee ? employee.name : "Funcionário não encontrado";
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setSelectedEmployeeId("");
    setCreateError(null);
    setCreateSuccess(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployeeId("");
    setCreateError(null);
    setCreateSuccess(false);
  };

  const handleCreateCard = async () => {
    if (!selectedEmployeeId) {
      setCreateError("Selecione um funcionário");
      return;
    }

    try {
      setIsCreating(true);
      setCreateError(null);

      const response = await fetch(
        `/api/cards/employee/${selectedEmployeeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao criar cartão");
      }

      setCreateSuccess(true);
      await fetchCards();
      setTimeout(() => {
        handleCloseDialog();
      }, 1000);
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Erro ao criar cartão"
      );
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Cartões de Ponto
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ textTransform: "none", fontSize: "1rem", borderRadius: 1 }}
        >
          Novo Cartão
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: 2,
          maxHeight: FIXED_TABLE_HEIGHT,
          overflow: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID do Cartão</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Nome do Funcionário
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards && cards.length > 0 ? (
              cards.map((card) => (
                <TableRow
                  key={card.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                >
                  <TableCell>{card.id}</TableCell>
                  <TableCell>{getEmployeeName(card.employeeId)}</TableCell>
                  <TableCell align="center">
                    {card.active ? (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Ativo"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        icon={<CancelIcon />}
                        label="Inativo"
                        color="error"
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  {/* <TableCell align="center">
                    <IconButton size="small" color="primary" title="Editar">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" title="Deletar">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ height: FIXED_TABLE_HEIGHT }}>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ verticalAlign: "middle", py: 8 }}
                >
                  <Typography color="textSecondary">
                    Nenhum cartão cadastrado
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Criar Novo Cartão de Ponto</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {createError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {createError}
            </Alert>
          )}
          {createSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Cartão criado com sucesso!
            </Alert>
          )}
          <FormControl fullWidth disabled={isCreating || createSuccess}>
            <InputLabel>Funcionário</InputLabel>
            <Select
              value={selectedEmployeeId}
              label="Funcionário"
              onChange={(e) => setSelectedEmployeeId(e.target.value as number)}
            >
              {employees && employees.length > 0 ? (
                employees.map((emp: Employee) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Nenhum funcionário disponível</MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isCreating}>
            Cancelar
          </Button>
          <Button
            onClick={handleCreateCard}
            variant="contained"
            disabled={isCreating || !selectedEmployeeId || createSuccess}
          >
            {isCreating ? "Criando..." : "Criar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
