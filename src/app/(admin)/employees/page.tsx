"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEmployee } from "@/hooks/useEmployee";
import EmployeeForm from "@/components/EmployeeForm";

const ITEMS_PER_PAGE = 10;
const ROW_HEIGHT = 53;
const FIXED_TABLE_HEIGHT = ROW_HEIGHT * ITEMS_PER_PAGE;

export default function EmployeesPage() {
  const { employees, setEmployees, loading, error } = useEmployee();
  const [page, setPage] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  const handleAddEmployee = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleEmployeeAdded = () => {
    // Refresh da lista acontece automaticamente via hook
  };

  const handleEditEmployee = (id: number) => {
    console.log("Editar colaborador:", id);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
    console.log("Deletar colaborador:", id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

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
          Colaboradores
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
          sx={{ textTransform: "none", fontSize: "1rem", borderRadius: 3 }}
        >
          Novo Colaborador
        </Button>
      </Box>

      <EmployeeForm
        open={openForm}
        onClose={handleCloseForm}
        onEmployeeAdded={handleEmployeeAdded}
      />

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 3, height: FIXED_TABLE_HEIGHT }}
      >
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Horário de Chegada</TableCell>
              <TableCell>Horário de Saída</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                >
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.cpf}</TableCell>
                  <TableCell>{employee.arrivalTime}</TableCell>
                  <TableCell>{employee.exitTime}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditEmployee(employee.id)}
                      title="Editar"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteEmployee(employee.id)}
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
                  colSpan={5}
                  align="center"
                  sx={{ verticalAlign: "middle" }}
                >
                  <Typography color="textSecondary">
                    Nenhum colaborador cadastrado
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {employees.length > ITEMS_PER_PAGE && (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={employees.length}
          rowsPerPage={ITEMS_PER_PAGE}
          page={page}
          onPageChange={handleChangePage}
          sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
        />
      )}
    </Container>
  );
}
