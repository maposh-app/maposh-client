import { Auth } from "aws-amplify";
import { Formik, FormikActions } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
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

interface IConfirmationFormValues {
  email: string;
  confirmationCode: string;
}
interface IConfirmationProps {
  override?: string;
  authState?: string;
  onStateChange?: (where: string, state?: object) => void;
  onAuthEvent?: (where: string, event: { type: string; data: string }) => void;
  authData?: { email: string };
}

const Confirmation: React.FC<IConfirmationProps> = props => {
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (props.authData && props.authData.email) {
      setEmail(props.authData.email);
    }
  }, [props.authData]);

  const submitConfirmationForm = async (
    values: IConfirmationFormValues,
    actions: FormikActions<IConfirmationFormValues>
  ) => {
    if (values.email) {
      setEmail(values.email);
    }
    Auth.confirmSignUp(values.email, values.confirmationCode)
      .then(() => props.onStateChange && props.onStateChange("signIn"))
      .catch(err => {
        if (props.onAuthEvent) {
          props.onAuthEvent("confirmSignUp", {
            type: "error",
            data: err.message
          });
        }
        actions.setSubmitting(false);
      });
  };

  const saveEmail = (evt: React.FocusEvent) => {
    const currentEmail = evt.target.getAttribute("value");
    if (evt.target.getAttribute("name") === "email" && currentEmail) {
      setEmail(currentEmail);
    }
  };
  const { t } = useTranslation();

  const formFields: IFormFields[] = t("account_confirmation.form", {
    returnObjects: true
  });
  const formStatus: IFormStatus = t("account_confirmation.status", {
    returnObjects: true
  });

  const confirmationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("login.errors.emailIsValid"))
      .required(t("login.errors.email")),
    confirmationCode: yup
      .string()
      .required(t("account_confirmation.errors.confirmation_code"))
  });

  const goSignIn = (values: IConfirmationFormValues) => {
    if (props.onStateChange) {
      props.onStateChange("signIn", { ...values });
    }
  };

  const resendCode = () => {
    Auth.resendSignUp(email).catch(err => {
      if (props.onAuthEvent) {
        props.onAuthEvent("confirmSignUp", {
          type: "error",
          data: err.message
        });
      }
    });
  };

  return (
    <>
      {props.authState === "confirmSignUp" && (
        <FormContainer>
          <Formik
            initialValues={{ email, confirmationCode: "" }}
            validationSchema={confirmationSchema}
            onSubmit={submitConfirmationForm}
            render={formikProps => (
              <>
                <FormContent onSubmit={formikProps.handleSubmit}>
                  {generateFormContent<IConfirmationFormValues>(
                    formFields,
                    formStatus,
                    formikProps,
                    saveEmail
                  )}
                </FormContent>
                <FormPrompt>
                  <FormPromptBox>
                    <FormNav onClick={() => resendCode()}>
                      {t("account_confirmation.resend")}
                    </FormNav>
                  </FormPromptBox>
                  <FormPromptBox>
                    <FormNav onClick={() => goSignIn(formikProps.values)}>
                      {t("account_confirmation.completion_prompt")}
                    </FormNav>
                  </FormPromptBox>
                </FormPrompt>
              </>
            )}
          />
        </FormContainer>
      )}
    </>
  );
};

export default Confirmation;
