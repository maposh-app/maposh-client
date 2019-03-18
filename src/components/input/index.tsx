import { ErrorMessage, FieldProps } from "formik";
import React from "react";
import { Input, InputBox, InputPlaceholder, InputTitle, StyledErrorMessage } from "./input.css";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputFieldWithErrors = ({
  field,
  ...props
}: InputProps & FieldProps) => {
  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) {
      props.onBlur(evt);
    }
  };
  return (
    <InputBox>
      <InputTitle>
        <InputPlaceholder>{props.placeholder}</InputPlaceholder>
        <ErrorMessage name={field.name} component={StyledErrorMessage} />
      </InputTitle>
      <Input
        {...field}
        value={field.value || ""}
        type={props.type}
        onBlur={handleBlur}
      />
    </InputBox>
  );
};
