import { Auth } from "aws-amplify";
import { Formik, FormikActions, FormikErrors } from "formik";
import * as React from "react";
import { withTranslation } from "react-i18next";
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
import i18n from "../../service/i18n";

interface IPasswordResetEntryFormValues {
  email: string;
}

interface IPasswordResetSubmitFormValues {
  passwordResetCode: string;
  newPassword: string;
}

type IPasswordResetFormValues = IPasswordResetEntryFormValues &
  IPasswordResetSubmitFormValues;

interface IPasswordResetProps {
  t: i18n.TFunction;
  i18n: i18n.i18n;
  tReady: any;
  override?: string;
  authState?: string;
  onStateChange?: (where: string, state?: object) => void;
  onAuthEvent?: (where: string, event: { type: string; data: string }) => void;
  authData?: { email: string };
  children?: React.ReactNode;
}

interface IPasswordResetState {
  hasCode: boolean;
  values: IPasswordResetFormValues;
  buttonStatus: {
    entry: IFormStatus;
    submit: IFormStatus;
  };
}

class BasePasswordReset extends React.Component<
  IPasswordResetProps,
  IPasswordResetState
> {
  public static getDerivedStateFromProps(
    props: IPasswordResetProps,
    currentState: IPasswordResetState
  ) {
    if (
      props.authData &&
      props.authData.email &&
      currentState.values.email !== props.authData.email
    ) {
      return {
        values: { ...currentState.values, email: props.authData.email }
      };
    }
    return null;
  }
  public static Page = (props: {
    children: any;
    validate: (
      values: IPasswordResetFormValues
    ) => FormikErrors<IPasswordResetFormValues>;
  }) => props.children;

  public constructor(props: IPasswordResetProps) {
    super(props);

    const { t } = this.props;

    const passwordResetEntryFormStatus: IFormStatus = t(
      "password_reset.entry_form_status",
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

    const initialValues = {
      email: (props.authData && props.authData.email) || "",
      passwordResetCode: "",
      newPassword: ""
    };

    this.state = {
      hasCode: false,
      values: initialValues,
      buttonStatus: {
        entry: passwordResetEntryFormStatus,
        submit: passwordResetSubmitFormStatus
      }
    };
  }

  public validate = (values: IPasswordResetFormValues) => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.hasCode ? 1 : 0
    ];
    return React.isValidElement<{
      validate: (
        values: IPasswordResetFormValues
      ) => FormikErrors<IPasswordResetFormValues>;
    }>(activePage) && activePage.props.validate
      ? activePage.props.validate(values)
      : {};
  };

  public render() {
    const { hasCode, values, buttonStatus } = this.state;
    const { children } = this.props;
    const activePage = React.Children.toArray(children)[hasCode ? 1 : 0];

    return (
      <Formik
        initialValues={values}
        validate={this.validate}
        onSubmit={this.submitForm}
        validateOnBlur={true}
        validateOnChange={true}
        render={({ handleSubmit, isValid, isSubmitting }) => {
          return (
            <div>
              {this.props.authState === "forgotPassword" && (
                <FormContainer>
                  <FormContent onSubmit={handleSubmit}>
                    {activePage}

                    {hasCode
                      ? generateFormSubmissionButton(
                          {
                            type: "submit",
                            disabled: !isValid || isSubmitting
                          },
                          buttonStatus.submit,
                          isSubmitting
                        )
                      : generateFormSubmissionButton(
                          {
                            type: "submit",
                            disabled: !isValid || isSubmitting
                          },
                          buttonStatus.entry,
                          isSubmitting
                        )}
                  </FormContent>
                  <FormPrompt>
                    <FormPromptBox>
                      {hasCode ? (
                        <FormNav onClick={() => this.sendCode()}>
                          {this.props.t("password_reset.resend")}
                        </FormNav>
                      ) : (
                        <FormNav onClick={() => this.goSignIn()}>
                          {this.props.t("password_reset.completion_prompt")}
                        </FormNav>
                      )}
                    </FormPromptBox>
                  </FormPrompt>
                </FormContainer>
              )}
            </div>
          );
        }}
      />
    );
  }

  // public saveEmail = (evt: React.FocusEvent) => {
  //   const currentEmail = evt.target.getAttribute("value");
  //   if (evt.target.getAttribute("name") === "email" && currentEmail) {
  //     this.setState(state => ({
  //       ...state,
  //       values: { ...state.values, email: currentEmail }
  //     }));
  //   }
  // };

  private goSignIn = () => {
    if (this.props.onStateChange) {
      this.props.onStateChange("signIn", {});
    }
  };

  private sendCode = () => {
    return Auth.forgotPassword(this.state.values.email)
      .then(data => {
        this.setState({ hasCode: data.CodeDeliveryDetails !== null });
        return data;
      })
      .catch(err => {
        if (this.props.onAuthEvent) {
          this.props.onAuthEvent("forgotPassword", {
            type: "error",
            data: err.message
          });
        }
        throw err;
      });
  };

  private initiatePasswordReset = (values: IPasswordResetFormValues) => {
    this.setState({ values }, () => {
      this.sendCode().catch(err => {
        if (this.props.onAuthEvent) {
          this.props.onAuthEvent("forgotPassword", {
            type: "error",
            data: err.message
          });
        }
      });
    });
  };

  private submitForm = (
    values: IPasswordResetFormValues,
    actions: FormikActions<IPasswordResetFormValues>
  ) => {
    if (this.state.hasCode) {
      this.setState({ values }, () => {
        Auth.forgotPasswordSubmit(
          this.state.values.email,
          this.state.values.passwordResetCode,
          this.state.values.newPassword
        )
          .then(() => {
            if (this.props.onStateChange) {
              this.props.onStateChange("signIn", {});
            }
          })
          .catch(err => {
            if (this.props.onAuthEvent) {
              this.props.onAuthEvent("forgotPassword", {
                type: "error",
                data: err.message
              });
            }
          });
      });
    } else {
      this.initiatePasswordReset(values);
    }
    actions.setTouched({});
    actions.setSubmitting(false);
  };
}

const PasswordResetWithoutTranslation: React.FC<
  IPasswordResetProps
> = props => {
  const { t } = props;

  const passwordResetEntryFormFields: IFormFields[] = t(
    "password_reset.entry_form",
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
  return (
    <BasePasswordReset {...props}>
      <BasePasswordReset.Page
        validate={values => {
          const errors: FormikErrors<IPasswordResetFormValues> = {};
          if (!values.email) {
            errors.email = t("login.errors.email");
          }
          return errors;
        }}
      >
        {generateFormFields(passwordResetEntryFormFields)}
      </BasePasswordReset.Page>
      <BasePasswordReset.Page
        validate={values => {
          const errors: FormikErrors<IPasswordResetFormValues> = {};
          // check the code
          if (!values.passwordResetCode) {
            errors.passwordResetCode = t(
              "password_reset.errors.confirmation_code"
            );
          }
          // check the password
          if (!values.newPassword) {
            errors.newPassword = t("signup.errors.password");
          }
          if (!(values.newPassword && values.newPassword.length >= 8)) {
            errors.newPassword = t("signup.errors.passwordLength");
          }
          if (!(values.newPassword && /[a-z]/.test(values.newPassword))) {
            errors.newPassword = t("signup.errors.passwordLowercaseLetter");
          }
          if (!(values.newPassword && /[A-Z]/.test(values.newPassword))) {
            errors.newPassword = t("signup.errors.passwordUppercaseLetter");
          }
          if (!(values.newPassword && /[0-9]/.test(values.newPassword))) {
            errors.newPassword = t("signup.errors.passwordNumber");
          }
          if (!(values.newPassword && /[0-9]/.test(values.newPassword))) {
            errors.newPassword = t("signup.errors.passwordNumber");
          }
          if (
            !(
              values.newPassword &&
              /[a-zA-Z0-9]+[^a-zA-Z0-9\s]+/.test(values.newPassword)
            )
          ) {
            errors.newPassword = t("signup.errors.passwordSpecialCharacter");
          }
          return errors;
        }}
      >
        {generateFormFields(passwordResetSubmitFormFields)}
      </BasePasswordReset.Page>
    </BasePasswordReset>
  );
};

const PasswordReset = withTranslation()(PasswordResetWithoutTranslation);
export default PasswordReset;
