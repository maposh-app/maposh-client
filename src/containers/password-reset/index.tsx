import { Auth } from "aws-amplify";
import { Formik, FormikActions } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {
  generateFormFields,
  generateFormSubmissionButton,
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

interface IPasswordResetEntryFormValues {
  email: string;
}

interface IPasswordResetSubmitFormValues {
  passwordResetCode: string;
  newPassword: string;
}

interface IPasswordResetProps {
  override?: string;
  authState?: string;
  onStateChange?: (where: string, state?: object) => void;
  onAuthEvent?: (where: string, event: { type: string; data: string }) => void;
  authData?: { email: string };
}

const PasswordReset: React.FC<IPasswordResetProps> = props => {
  const [email, setEmail] = React.useState("");
  const [isAwaitingCode, setIsAwaitingCode] = React.useState(false);
  const [submitAction, setSubmitAction] = React.useState("");

  React.useEffect(() => {
    if (props.authData && props.authData.email) {
      setEmail(props.authData.email);
    }
  }, [props.authData]);

  const sendCode = () => {
    return Auth.forgotPassword(email)
      .then(data => setIsAwaitingCode(data.CodeDeliveryDetails !== null))
      .catch(err => {
        if (props.onAuthEvent) {
          props.onAuthEvent("signIn", {
            type: "error",
            data: err.message
          });
        }
        throw err;
      });
  };
  const initiatePasswordReset = (
    values: IPasswordResetEntryFormValues,
    actions: FormikActions<IPasswordResetEntryFormValues>
  ) => {
    setEmail(values.email);
    sendCode().catch(err => {
      if (props.onAuthEvent) {
        props.onAuthEvent("signIn", {
          type: "error",
          data: err.message
        });
      }
      actions.setSubmitting(false);
    });
  };

  const submitPasswordResetForm = async (
    values: IPasswordResetSubmitFormValues,
    actions: FormikActions<IPasswordResetSubmitFormValues>
  ) => {
    Auth.forgotPasswordSubmit(
      email,
      values.passwordResetCode,
      values.newPassword
    )
      .then(() => {
        if (props.onStateChange) {
          props.onStateChange("signIn", {});
        }
      })
      .catch(err => {
        if (props.onAuthEvent) {
          props.onAuthEvent("forgotPassword", {
            type: "error",
            data: err.message
          });
        }
        actions.setSubmitting(false);
      });
  };

  const handleSubmit = async (
    values: IPasswordResetSubmitFormValues & IPasswordResetEntryFormValues,
    actions: FormikActions<
      IPasswordResetSubmitFormValues & IPasswordResetEntryFormValues
    >
  ) => {
    if (submitAction === "SEND_CODE") {
      return initiatePasswordReset(values, actions);
    } else if (submitAction === "SUBMIT") {
      return submitPasswordResetForm(values, actions);
    }
  };

  const saveEmail = (evt: React.FocusEvent) => {
    const currentEmail = evt.target.getAttribute("value");
    if (evt.target.getAttribute("name") === "email" && currentEmail) {
      setEmail(currentEmail);
    }
  };

  const { t } = useTranslation();

  const passwordResetEntryFormFields: IFormFields[] = t(
    "password_reset.entry_form",
    {
      returnObjects: true
    }
  );

  const passwordResetEntryFormStatus: IFormStatus = t(
    "password_reset.entry_form_status",
    {
      returnObjects: true
    }
  );

  const passwordResetSubmitFormFields: IFormFields[] = t(
    "password_reset.submit_form",
    {
      returnObjects: true
    }
  );

  const passwordResetSubmitFormStatus: IFormStatus = t(
    "password_reset.submit_form_status",
    {
      returnObjects: true
    }
  );

  const passwordResetValidationSchema = yup.lazy<
    IPasswordResetEntryFormValues & IPasswordResetSubmitFormValues
  >(values => {
    return yup.object().shape({
      email: yup
        .string()
        .email(t("login.errors.emailIsValid"))
        .required(t("login.errors.email")),
      passwordResetCode: yup.string(),
      // .required(t("password_reset.errors.confirmation_code")),
      newPassword: yup.string()
      // .required(t("signup.errors.password"))
      // .min(8, t("signup.errors.passwordLength"))
      // .matches(/[a-z]/, t("signup.errors.passwordLowercaseLetter"))
      // .matches(/[A-Z]/, t("signup.errors.passwordUppercaseLetter"))
      // .matches(/[0-9]/, t("signup.errors.passwordNumber"))
      // .matches(
      //   /[a-zA-Z0-9]+[^a-zA-Z0-9\s]+/,
      //   t("signup.errors.passwordSpecialCharacter")
      // )
    });
  });

  const passwordResetEntryFormInitialValues: IPasswordResetEntryFormValues = {
    email: (props.authData && props.authData.email) || ""
  };

  const passwordResetSubmitFormInitialValues: IPasswordResetSubmitFormValues = {
    passwordResetCode: "",
    newPassword: ""
  };

  const goSignIn = () => {
    if (props.onStateChange) {
      props.onStateChange("signIn", {});
    }
  };

  return (
    <>
      {props.authState === "forgotPassword" && (
        <FormContainer>
          <Formik
            initialValues={{
              ...passwordResetEntryFormInitialValues,
              ...passwordResetSubmitFormInitialValues
            }}
            validationSchema={() => passwordResetValidationSchema}
            onSubmit={handleSubmit}
            render={formikProps => {
              return (
                <FormContent onSubmit={formikProps.handleSubmit}>
                  {isAwaitingCode
                    ? generateFormFields(
                        passwordResetSubmitFormFields,
                        "submit-password-reset"
                      )
                    : generateFormFields(
                        passwordResetEntryFormFields,
                        "initiate-password-reset",
                        saveEmail
                      )}
                  {isAwaitingCode
                    ? generateFormSubmissionButton(
                        {
                          type: "submit",
                          disabled:
                            !formikProps.isValid || formikProps.isSubmitting,
                          onClick: () => setSubmitAction("SUBMIT")
                        },
                        passwordResetSubmitFormStatus,
                        formikProps.isSubmitting
                      )
                    : generateFormSubmissionButton(
                        {
                          type: "submit",
                          disabled:
                            !formikProps.isValid || formikProps.isSubmitting,
                          onClick: () => setSubmitAction("SEND_CODE")
                        },
                        passwordResetEntryFormStatus,
                        formikProps.isSubmitting
                      )}
                </FormContent>
              );
            }}
          />
          <FormPrompt>
            <FormPromptBox>
              {isAwaitingCode ? (
                <FormNav onClick={() => sendCode()}>
                  {t("password_reset.resend")}
                </FormNav>
              ) : (
                <FormNav onClick={() => goSignIn()}>
                  {t("password_reset.completion_prompt")}
                </FormNav>
              )}
            </FormPromptBox>
          </FormPrompt>
        </FormContainer>
      )}
    </>
  );
};

export default PasswordReset;
