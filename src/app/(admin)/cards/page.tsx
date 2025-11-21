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
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useCard } from "@/hooks/useCard";
import { Employee } from "@/types/employee";

const ITEMS_PER_PAGE = 10;
const ROW_HEIGHT = 53;
const FIXED_TABLE_HEIGHT = ROW_HEIGHT * ITEMS_PER_PAGE;

export default function CardsPage() {
  const { cards } = useCard();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeMap, setEmployeeMap] = useState<Map<number, Employee>>(
    new Map()
  );
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        setLoadingEmployees(true);
        const response = await fetch("/api/employees", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar colaboradores");
        }

        const data = await response.json();
        const employeeList = data.data;
        setEmployees(employeeList);

        // Criar mapa para busca rápida por ID
        const map = new Map<number, Employee>();
        employeeList.forEach((emp: Employee) => {
          map.set(emp.id, emp);
        });
        setEmployeeMap(map);
      } catch (err) {
        console.error("Erro ao buscar colaboradores:", err);
      } finally {
        setLoadingEmployees(false);
      }
    }

    fetchEmployees();
  }, []);

  const getEmployeeName = (employeeId: number): string => {
    const employee = employeeMap.get(employeeId);
    return employee ? employee.name : "Funcionário não encontrado";
  };

  //   const handleAddEmployee = () => {
  //     setSelectedEmployee(null);
  //     setOpenForm(true);
  //   };

  //   const handleCloseForm = () => {
  //     setOpenForm(false);
  //     setSelectedEmployee(null);
  //   };

  //   const handleEditEmployee = (employee: Employee) => {
  //     setSelectedEmployee(employee);
  //     setOpenForm(true);
  //   };

  //   const handleDeleteEmployee = (employee: Employee) => {
  //     setSelectedEmployee(employee);
  //     setDeleteError(null);
  //     setOpenDeleteDialog(true);
  //   };

  //   const handleConfirmDelete = async () => {
  //     if (selectedEmployee) {
  //       const result = await deleteEmployee(selectedEmployee.id);
  //       if (!result.success) {
  //         setDeleteError(result.error || "Erro ao excluir colaborador");
  //       } else {
  //         setOpenDeleteDialog(false);
  //         setSelectedEmployee(null);
  //       }
  //     }
  //   };

  //   const handleCancelDelete = () => {
  //     setOpenDeleteDialog(false);
  //     setSelectedEmployee(null);
  //     setDeleteError(null);
  //   };

  //   const handleChangePage = (event: unknown, newPage: number) => {
  //     setPage(newPage);
  //   };

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
        <Typography variant="h4" component="h1">
          Cartões de ponto
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          //   onClick={handleAddEmployee}
          sx={{ textTransform: "none", fontSize: "1rem", borderRadius: 3 }}
        >
          Novo Cartão
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 3, height: FIXED_TABLE_HEIGHT }}
      >
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>ID do Cartão</TableCell>
              <TableCell>Nome do Funcionário</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.length > 0 ? (
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
                      <CheckCircleIcon
                        sx={{ color: "green", fontSize: "1.5rem" }}
                        aria-label="Ativo"
                      />
                    ) : (
                      <CancelIcon
                        sx={{ color: "red", fontSize: "1.5rem" }}
                        aria-label="Inativo"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      //   onClick={() => handleEditEmployee(employee)}
                      title="Editar"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      //   onClick={() => handleDeleteEmployee(employee)}
                      title="Deletar"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ height: FIXED_TABLE_HEIGHT }}>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ verticalAlign: "middle" }}
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
    </Container>
  );
}
