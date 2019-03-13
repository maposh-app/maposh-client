import { Formik, FormikActions, FormikProps } from "formik";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import * as yup from "yup";
import {
  FormContainer,
  FormContent,
  FormPrompt,
  FormSubmitButton
} from "../../components/form/form.css";
import { NamedModal } from "../../components/modal";
import { IFormFields, IFormStatus } from "../../model/form";
import { generateFormFields } from "../../utils/transform";

export interface ISignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const SignupForm = (formFields: IFormFields[], status: IFormStatus) => (
  props: FormikProps<ISignupFormValues>
) => {
  return (
    <FormContent onSubmit={props.handleSubmit}>
      {generateFormFields(formFields, "signup-field")}
      <FormSubmitButton type="submit">
        {props.isSubmitting ? status.submitting : status.submit}
      </FormSubmitButton>
      <FormPrompt>
        <Trans i18nKey="login.prompt">
          Already have an account? Sign in <Link to="/login">here</Link>.
        </Trans>
      </FormPrompt>
    </FormContent>
  );
};

const initialValues: ISignupFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: ""
};

const submitForm = (values: ISignupFormValues, actions: FormikActions<{}>) => {
  // tslint:disable:no-console
  console.log("submitting the form..");
  console.log({ values, actions });
};

export const BaseSignup = () => {
  const { t } = useTranslation();

  const formFields: IFormFields[] = t("signup.form", {
    returnObjects: true
  });
  const formStatus: IFormStatus = t("signup.status", {
    returnObjects: true
  });

  const signupSchema = yup.object().shape({
    firstName: yup.string().required(t("signup.errors.firstName")),
    lastName: yup.string().required(t("signup.errors.lastName")),
    email: yup
      .string()
      .email(t("signup.errors.emailIsValid"))
      .required(t("signup.errors.email")),
    password: yup
      .string()
      .required(t("signup.errors.password"))
      .min(8, t("signup.errors.passwordLength"))
      .matches(/[a-z]/, t("signup.errors.passwordLowercaseLetter"))
      .matches(/[A-Z]/, t("signup.errors.passwordUppercaseLetter"))
      .matches(/[0-9]/, t("signup.errors.passwordNumber"))
      .matches(
        /[a-zA-Z0-9]+[^a-zA-Z0-9\s]+/,
        t("signup.errors.passwordSpecialCharacter")
      ),
    passwordConfirmation: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        t("signup.errors.passwordConfirmation")
      )
      .required(t("signup.errors.passwordConfirmation"))
  });
  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={submitForm}
        render={SignupForm(formFields, formStatus)}
      />
    </FormContainer>
  );
};

const SignupModal = withRouter(NamedModal("signup", <BaseSignup />));

export default SignupModal;
