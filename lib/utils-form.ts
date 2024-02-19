export const validateEmail = (email: string): boolean => {
  // Expresión regular para validar un correo electrónico básico.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
