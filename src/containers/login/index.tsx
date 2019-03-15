import { Auth } from "aws-amplify";
import { Formik } from "formik";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as yup from "yup";
import MaposhAuthenticator from "../../components/authenticator";
import { generateForm, IFormFields, IFormStatus } from "../../components/form";
import { FormContainer, FormNav, FormPrompt } from "../../components/form/form.css";
import { NamedModal } from "../../components/modal";
import { MaposhState } from "../../service/store";
import { updateUserStatus } from "../../service/store/system/actions";
import { ISystemState } from "../../service/store/system/types";

interface ILoginFormValues {
  email: string;
  password: string;
}

const initialValues: ILoginFormValues = {
  email: "",
  password: ""
};

interface ILoginProps {
  system: ISystemState;
  updateUserStatus: typeof updateUserStatus;
  override?: string;
  authState?: string;
  onStateChange?: (where: string, state: object) => void;
}

const BaseLogin: React.FC<ILoginProps & RouteComponentProps> = props => {
  const submitForm = async (values: ILoginFormValues) => {
    try {
      await Auth.signIn(values.email, values.password);
      Auth.currentAuthenticatedUser().then(result => console.log(result));
      props.updateUserStatus({ isAuthenticated: true });
    } catch (e) {
      if (e.code === "UserNotConfirmedException") {
        props.history.push("/signup", {
          email: values.email,
          password: values.password
        });
      } else {
        alert(e.message);
      }
    }
  };

  const { t } = useTranslation();

  const formFields: IFormFields[] = t("login.form", {
    returnObjects: true
  });
  const formStatus: IFormStatus = t("login.status", {
    returnObjects: true
  });

  const signupSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("login.errors.emailIsValid"))
      .required(t("login.errors.email")),
    password: yup.string().required(t("login.errors.password"))
  });
  const goSignUp = () => {
    if (props.onStateChange) {
      props.onStateChange("signUp", {});
    }
  };
  return (
    <div>
      {props.authState === "signIn" && (
        <FormContainer>
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={submitForm}
            render={generateForm(formFields, formStatus)}
          />
          {props.onStateChange && (
            <FormPrompt>
              <Trans i18nKey="signup.prompt">
                Don't have an account? Sign up
                <FormNav onClick={() => goSignUp()}>here</FormNav>.
              </Trans>
            </FormPrompt>
          )}
        </FormContainer>
      )}
    </div>
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

export const Login = withRouter(
  connect(
    mapStateToProps,
    { updateUserStatus }
  )(BaseLogin)
);

// const LoginModal = withRouter(NamedModal("login", <Login />));
const LoginModal = withRouter(NamedModal("login", <MaposhAuthenticator />));

export default LoginModal;
