import { Auth } from "aws-amplify";
import { Formik, FormikActions } from "formik";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import * as yup from "yup";
import { generateForm, IFormFields, IFormStatus } from "../../components/form";
import {
  FormContainer,
  FormNav,
  FormPrompt,
  FormPromptBox
} from "../../components/form/form.css";

interface ISignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}
const signupFormInitialValues: ISignupFormValues = {
  email: "",
  password: "",
  passwordConfirm: ""
};
interface ISignupProps {
  override?: string;
  authState?: string;
  onStateChange?: (where: string, state: object) => void;
  onAuthEvent?: (where: string, event: { type: string; data: string }) => void;
}

const Signup: React.FC<ISignupProps> = props => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation();

  const submitSignupForm = (
    values: ISignupFormValues,
    actions: FormikActions<ISignupFormValues>
  ) => {
    setIsLoading(true);
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

  const goSignIn = () => {
    if (props.onStateChange) {
      props.onStateChange("signIn", {});
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
            render={generateForm(signupFormFields, signupFormStatus)}
          />
          {props.onStateChange && (
            <FormPrompt>
              <FormPromptBox>
                <Trans i18nKey="login.prompt">
                  Already have an account? Sign in <FormNav onClick={() => goSignIn()}>here</FormNav>.
                </Trans>
              </FormPromptBox>
            </FormPrompt>
          )}
        </FormContainer>
      )}
    </div>
  );
};

export default Signup;
