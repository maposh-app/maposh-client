import { Field } from "formik";
import * as React from "react";
import { InputFieldWithErrors } from "../components/input";
import { IFormFields } from "../model/form";

interface IParams {
  [key: string]: string;
}
interface IOption {
  value: string;
  label: string;
}

type IOptions = IOption[];

export function selectify(block: IParams): IOptions {
  const options: IOptions = Object.keys(block).map(key => {
    return { value: key, label: block[key] };
  });
  return options;
}

export const generateFormFields = (
  fields: IFormFields[],
  keyPrefix: string
) => {
  return fields.map((props, idx) => (
    <Field
      {...props}
      key={`${keyPrefix}-${idx}`}
      component={InputFieldWithErrors}
    />
  ));
};
