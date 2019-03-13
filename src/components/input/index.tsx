import { ErrorMessage, FieldProps } from "formik";
import React from "react";
import { InputField, StyledErrorMessage } from "./input.css";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputFieldWithErrors = ({
  field,
  ...props
}: InputProps & FieldProps) => {
  return (
    <InputField>
      {/* <Field
        name={field.name}
        value={field.value || ""}
        placeholder={props.placeholder}
        component={StyledInput}
      /> */}
      <input
        {...field}
        value={field.value || ""}
        {...props}
        className={`__input`}
      />
      <ErrorMessage name={field.name} component={StyledErrorMessage} />
    </InputField>
  );
};
