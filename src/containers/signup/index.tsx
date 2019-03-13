import { Formik, FormikActions, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as yup from "yup";
import Modal from "../../components/modal";
import { IFormFields, IFormStatus } from "../../model/form";
import { generateFormFields } from "../../utils/transform";
import { Form, FormContainer } from "./signup.css";

interface ISignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

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

const mySignupForm = (formFields: IFormFields[], status: IFormStatus) => (
  props: FormikProps<ISignupFormValues>
) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      {generateFormFields(formFields, "signup-field")}
      <button
        className="button is-block is-link is-medium is-fullwidth"
        type="submit"
      >
        {props.isSubmitting ? status.submitting : status.submit}
      </button>
    </Form>
  );
};

export const Signup = () => {
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
        render={mySignupForm(formFields, formStatus)}
      />
    </FormContainer>
  );
};

const SignupModal: React.FC<RouteComponentProps> = props => {
  const shouldSignupOpen = (locationPath: string) =>
    /\bsignup\b/.test(locationPath);
  return (
    <Modal
      className="signup"
      isOpen={shouldSignupOpen(props.location.pathname)}
      onRequestClose={() => props.history.push("/")}
      content={<Signup />}
      shouldCloseOnOverlayClick={true}
    />
  );
};

const EnhancedSignupModal = withRouter(SignupModal);

export default EnhancedSignupModal;
