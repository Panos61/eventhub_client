// Validate confirm password function
export const validateConfirmPassword = (pass: string, value: string) => {
  let error = '';
  if (pass && value) {
    if (pass != value) {
      error = 'Password not matched'
        .replace('Password not matched', 'Οι κωδικοί δεν ταιριάζουν')
        .replace('confirmPassword:Οι κωδικοί δεν ταιριάζουν', '');
    }
  }
  return error;
};
