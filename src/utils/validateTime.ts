export const validateTime = (time: string): string | null => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return "Horário deve estar no formato HH:MM";
  }
  return null;
};
