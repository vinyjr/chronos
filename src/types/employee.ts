export interface Employee {
  id: number;
  name: string;
  cpf: string;
  arrivalTime: string;
  exitTime: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface newEmployee {
  name: string;
  cpf: string;
  arrivalTime: string;
  exitTime: string;
}