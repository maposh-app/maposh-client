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

const generateFormFields = (fields: IFormFields[], keyPrefix: string) => {
  return fields.map((props, idx) => (
    <Field
      {...props}
      key={`${keyPrefix}-${idx}`}
      component={InputFieldWithErrors}
    />
  ));
};

export function generateForm<T>(
  formFields: IFormFields[],
  status: IFormStatus
) {
  return (props: FormikProps<T>) => {
    return (
      <FormContent onSubmit={props.handleSubmit}>
        {generateFormFields(formFields, "confirmation-field")}
        <FormSubmitButton type="submit">
          {props.isSubmitting ? status.submitting : status.submit}
        </FormSubmitButton>
      </FormContent>
    );
  };
}
