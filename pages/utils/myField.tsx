import * as React from 'react';
import { FieldProps, useField } from 'formik';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

export const myField: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  field,
  label,
  type,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      label={label}
      type={type}
      required
      variant='outlined'
      fullWidth
      {...field}
    />
  );
};
