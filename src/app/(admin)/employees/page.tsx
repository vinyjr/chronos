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
import { Employee } from "@/types/employee";

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "João Silva",
    cpf: "123.456.789-00",
    arrivalTime: "08:00",
    exitTime: "17:00",
  },
  {
    id: 2,
    name: "Maria Santos",
    cpf: "987.654.321-11",
    arrivalTime: "09:00",
    exitTime: "18:00",
  },
  {
    id: 3,
    name: "Pedro Costa",
    cpf: "456.789.123-22",
    arrivalTime: "08:30",
    exitTime: "17:30",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    cpf: "111.222.333-44",
    arrivalTime: "07:30",
    exitTime: "16:30",
  },
  {
    id: 5,
    name: "Carlos Souza",
    cpf: "555.666.777-88",
    arrivalTime: "08:15",
    exitTime: "17:15",
  },
  {
    id: 6,
    name: "Fernanda Lima",
    cpf: "999.000.111-22",
    arrivalTime: "09:30",
    exitTime: "18:30",
  },
  {
    id: 7,
    name: "Roberto Dias",
    cpf: "333.444.555-66",
    arrivalTime: "08:00",
    exitTime: "17:00",
  },
  {
    id: 8,
    name: "Juliana Pereira",
    cpf: "777.888.999-00",
    arrivalTime: "08:45",
    exitTime: "17:45",
  },
  {
    id: 9,
    name: "Lucas Santos",
    cpf: "222.333.444-55",
    arrivalTime: "07:00",
    exitTime: "16:00",
  },
  {
    id: 10,
    name: "Beatriz Costa",
    cpf: "666.777.888-99",
    arrivalTime: "09:00",
    exitTime: "18:00",
  },
  {
    id: 11,
    name: "Marcelo Silva",
    cpf: "444.555.666-77",
    arrivalTime: "08:30",
    exitTime: "17:30",
  },
];

const ITEMS_PER_PAGE = 10;
const ROW_HEIGHT = 53;
const FIXED_TABLE_HEIGHT = ROW_HEIGHT * ITEMS_PER_PAGE;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [page, setPage] = useState(0);

  const handleAddEmployee = () => {
    console.log("Adicionar novo colaborador");
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

  const paginatedEmployees = employees.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

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
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((employee) => (
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
