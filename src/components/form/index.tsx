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

export function generateFormFields<T>(
  fields: IFormFields[],
  formikProps?: FormikProps<T>,
  handleBlur?: (e: React.FocusEvent) => void
) {
  return fields.map((props, idx) => (
    <Field
      {...props}
      key={`${Object.keys(fields).join("-")}-${idx}`}
      component={InputFieldWithErrors}
      onChange={formikProps ? formikProps.handleChange : null}
      onBlur={
        handleBlur ? handleBlur : formikProps ? formikProps.handleBlur : null
      }
    />
  ));
}

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

export function generateFormContent<T>(
  formFields: IFormFields[],
  status: IFormStatus,
  props: FormikProps<T>,
  handleBlur?: (e: React.FocusEvent) => void
) {
  return (
    <>
      {generateFormFields<T>(formFields, props, handleBlur)}
      {generateFormSubmissionButton(
        { type: "submit", disabled: !props.isValid || props.isSubmitting },
        status,
        props.isSubmitting
      )}
    </>
  );
}
