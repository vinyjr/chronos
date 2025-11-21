export const validateCPF = (cpf: string): string | null => {
  const cleanCPF = cpf.replace(/\D/g, "");
  if (cleanCPF.length < 11) {
    return "CPF deve ter no mínimo 11 caracteres";
  }
  return null;
};
