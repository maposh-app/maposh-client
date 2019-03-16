import { Field, FormikProps } from "formik";
import * as React from "react";
import { InputFieldWithErrors } from "../input";
import { FormContent, FormSubmitButton } from "./form.css";

export interface IFormFields {
  name: string;
  placeholder: string;
  type?: string;
}

export interface IFormStatus {
  submitting: string;
  submit: string;
}

export const generateFormFields = (
  fields: IFormFields[],
  keyPrefix: string,
  handleBlur?: (e: React.FocusEvent) => void
) => {
  return fields.map((props, idx) => (
    <Field
      {...props}
      key={`${keyPrefix}-${idx}`}
      component={InputFieldWithErrors}
      onBlur={handleBlur ? handleBlur : null}
    />
  ));
};

export const generateFormSubmissionButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
  status: IFormStatus,
  isSubmitting = false
) => {
  return (
    <FormSubmitButton {...props}>
      {isSubmitting ? status.submitting : status.submit}
    </FormSubmitButton>
  );
};

export function generateForm<T>(
  formFields: IFormFields[],
  status: IFormStatus,
  handleBlur?: (e: React.FocusEvent) => void
) {
  return (props: FormikProps<T>) => {
    return (
      <FormContent onSubmit={props.handleSubmit}>
        {generateFormFields(formFields, "submit-field", handleBlur)}
        {generateFormSubmissionButton(
          { type: "submit", disabled: !props.isValid || props.isSubmitting },
          status,
          props.isSubmitting
        )}
      </FormContent>
    );
  };
}
