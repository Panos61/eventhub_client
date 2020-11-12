import React, { InputHTMLAttributes } from 'react';
import { TextField } from 'formik-material-ui';
import { FormHelperText } from '@material-ui/core';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps | any> = ({
  label,
  ...props
}) => {
  const [field, { error }]: any = useField(props);
  return (
    // <FormControl isInvalid={!!error}>
    //   <FormLabel htmlFor={field.name}>{label}</FormLabel>
    //   <InputOrTextarea {...field} {...props} id={field.name} />
    //   {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    // </FormControl>
    <>
      <TextField variant='outlined' fullWidth {...props} label={label} />
      <br />
      {error ? (
        <FormHelperText style={{ color: 'red' }}>
          {JSON.stringify(error)
            .replace('{', '')
            .replace('}', '')
            .replace('"', '')
            .replace('"', '')
            .replace('"', '')
            .replace('"', '')
            .replace('email:Μη έγκυρη μορφή email!', '')
            .replace('password:Υποχρεωτικό πεδίο!', '')
            .replace('email:Υποχρεωτικό πεδίο!', '')
            .replace('Login Error:', '')
            .replace('username:Username is required,', '')
            .replace(
              '"email":"Email is required","password":"Password is required"',
              ''
            )
            .replace(
              'email:Email is required,"password":"Password is required"',
              ''
            )
            .replace('password:Password is required', '')
            .replace('password:Password must be at least 6 characters', '')
            .replace('email:Email is invalid', '')
            .replace(
              '"email":"Μη έγκυρη μορφή email!","password":"Password is required"',
              ''
            )
            .replace('Register Error:', '')
            .replace(
              'Password length should be greater than 6',
              'Ο κωδικός θα πρέπει να είναι μεγαλύτερος από 6 χαρακτήρες!'
            )
            .replace('Invalid Error', 'Λάθος μορφή email!')
            .replace(
              'Email or Username already taken.',
              'Το email ή ο κωδικός χρησιμοποιούνται ήδη!'
            )}
        </FormHelperText>
      ) : (
        ''
      )}
    </>
  );
};
