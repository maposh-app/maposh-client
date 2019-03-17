import { Auth } from "aws-amplify";
import { Formik, FormikActions, FormikValues } from "formik";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import * as yup from "yup";
import {
  generateFormContent,
  IFormFields,
  IFormStatus
} from "../../components/form";
import {
  FormContainer,
  FormContent,
  FormNav,
  FormPrompt,
  FormPromptBox
} from "../../components/form/form.css";

interface ISignupFormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}
interface ISignupProps {
  override?: string;
  authState?: string;
  onStateChange?: (where: string, state: object) => void;
  onAuthEvent?: (where: string, event: { type: string; data: string }) => void;
  authData?: FormikValues;
}

const SignUp: React.FC<ISignupProps> = props => {
  const signupFormInitialValues: ISignupFormValues = {
    email: props.authData ? props.authData.email : "",
    password: props.authData ? props.authData.password : "",
    passwordConfirmation: ""
  };
  const { t } = useTranslation();

  const submitSignupForm = (
    values: ISignupFormValues,
    actions: FormikActions<ISignupFormValues>
  ) => {
    Auth.signUp(values.email, values.password)
      .then(
        () =>
          props.onStateChange &&
          props.onStateChange("confirmSignUp", { username: values.email })
      )
      .catch(err => {
        if (props.onAuthEvent) {
          props.onAuthEvent("signUp", { type: "error", data: err.message });
          actions.setSubmitting(false);
        }
      });
  };

  const signupFormFields: IFormFields[] = t("signup.form", {
    returnObjects: true
  });

  const signupFormStatus: IFormStatus = t("signup.status", {
    returnObjects: true
  });

  const signupSchema = yup.object().shape({
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

  const goSignIn = (values: ISignupFormValues) => {
    if (props.onStateChange) {
      props.onStateChange("signIn", { ...values });
    }
  };

  return (
    <div>
      {props.authState === "signUp" && (
        <FormContainer>
          <Formik
            initialValues={signupFormInitialValues}
            validationSchema={signupSchema}
            onSubmit={submitSignupForm}
            validateOnBlur={true}
            validateOnChange={true}
            render={formikProps => (
              <FormContent onSubmit={formikProps.handleSubmit}>
                {generateFormContent<ISignupFormValues>(
                  signupFormFields,
                  signupFormStatus,
                  formikProps
                )}
                {props.onStateChange && (
                  <FormPrompt>
                    <FormPromptBox>
                      <Trans i18nKey="login.prompt">
                        Already have an account? Sign in
                        <FormNav onClick={() => goSignIn(formikProps.values)}>
                          here
                        </FormNav>
                        .
                      </Trans>
                    </FormPromptBox>
                  </FormPrompt>
                )}
              </FormContent>
            )}
          />
        </FormContainer>
      )}
    </div>
  );
};

export default SignUp;
