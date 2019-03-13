import { Auth } from "aws-amplify";
import { Formik, FormikProps } from "formik";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { connect } from "react-redux";
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
import { MaposhState } from "../../service/store";
import { updateUserStatus } from "../../service/store/system/actions";
import { ISystemState } from "../../service/store/system/types";
import { generateFormFields } from "../../utils/transform";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = (
  formFields: IFormFields[],
  formStatus: IFormStatus
) => (props: FormikProps<ILoginFormValues>) => {
  return (
    <FormContent onSubmit={props.handleSubmit}>
      {generateFormFields(formFields, "login-field")}
      <FormSubmitButton type="submit">
        {props.isSubmitting ? formStatus.submitting : formStatus.submit}
      </FormSubmitButton>
      <FormPrompt>
        <Trans i18nKey="signup.prompt">
          Don't have an account? Sign up <Link to="/signup">here</Link>.
        </Trans>
      </FormPrompt>
    </FormContent>
  );
};

const initialValues: ILoginFormValues = {
  email: "",
  password: ""
};

interface ILoginProps {
  system: ISystemState;
  updateUserStatus: typeof updateUserStatus;
}

export const BaseLogin: React.FC<ILoginProps> = props => {
  const submitForm = async (values: ILoginFormValues) => {
    try {
      await Auth.signIn(values.email, values.password);
      props.updateUserStatus({ isAuthenticated: true });
    } catch (e) {
      alert(e.message);
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
  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={submitForm}
        render={LoginForm(formFields, formStatus)}
      />
    </FormContainer>
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

const Login = connect(
  mapStateToProps,
  { updateUserStatus }
)(BaseLogin);

const LoginModal = withRouter(NamedModal("login", <Login />));

export default LoginModal;
