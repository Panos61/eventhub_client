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
            .replace('Login Error:', '')}
        </FormHelperText>
      ) : (
        ''
      )}
    </>
  );
};
