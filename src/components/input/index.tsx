import { ErrorMessage, FieldProps } from "formik";
import React from "react";
import { Input, InputBox, StyledErrorMessage } from "./input.css";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputFieldWithErrors = ({
  field,
  ...props
}: InputProps & FieldProps) => {
  return (
    <InputBox>
      {props.placeholder}
      <Input {...field} value={field.value || ""} type={props.type} />
      <ErrorMessage name={field.name} component={StyledErrorMessage} />
    </InputBox>
  );
};
