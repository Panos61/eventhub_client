// Validate confirm password function
export const validateConfirmPassword = (pass: string, value: string) => {
  let error = '';
  if (pass && value) {
    if (pass != value) {
      error = 'Password not matched';
    }
  }
  return error;
};
