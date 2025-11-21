"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTimeRecords } from "@/hooks/useTimeRecords";
import { useEmployee } from "@/hooks/useEmployee";
import { timeRecord } from "@/types/time-records";

export default function Dashboard() {
  const { timeRecords, loading, error, fetchTimeRecords } = useTimeRecords();
  const { employees } = useEmployee();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getEmployeeName = (employeeId: number): string => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee?.name || "Funcionário não encontrado";
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchTimeRecords();
    setIsRefreshing(false);
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString("pt-BR");
  };

  const getTypeLabel = (type: "ARRIVAL" | "EXIT") => {
    return type === "ARRIVAL" ? "Entrada" : "Saída";
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
    <Box p={3}>
      <Box display="flex" alignItems="center" gap={1} sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", flex: 1 }}
        >
          Registros de Entrada e Saída
        </Typography>
        <IconButton
          onClick={handleRefresh}
          disabled={isRefreshing}
          sx={{
            color: "primary.main",
            transition: "transform 0.3s ease-in-out",
            transform: isRefreshing ? "rotate(360deg)" : "rotate(0deg)",
            "&:hover": {
              backgroundColor: "action.hover",
            },
            "&.Mui-disabled": {
              color: "action.disabled",
            },
          }}
          title="Atualizar dados"
        >
          <RefreshIcon />
        </IconButton>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table
          sx={{ minWidth: 700 }}
          aria-label="tabela de registros de entrada e saída"
        >
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Nome do Funcionário
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Data e Hora</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Criado em</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeRecords && timeRecords.length > 0 ? (
              timeRecords.map((record: timeRecord) => (
                <TableRow key={record.id} hover>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{getEmployeeName(record.employeeId)}</TableCell>
                  <TableCell>{formatDateTime(record.dateTime)}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 2,
                        py: 0.5,
                        borderRadius: "4px",
                        backgroundColor:
                          record.type === "ARRIVAL" ? "#e8f5e9" : "#ffebee",
                        color:
                          record.type === "ARRIVAL" ? "#2e7d32" : "#c62828",
                        fontWeight: "500",
                      }}
                    >
                      {getTypeLabel(record.type)}
                    </Box>
                  </TableCell>
                  <TableCell>{formatDateTime(record.createdAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography color="textSecondary">
                    Nenhum registro de entrada e saída encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
