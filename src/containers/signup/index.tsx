import { Auth } from "aws-amplify";
import { Formik } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { generateForm, IFormFields, IFormStatus } from "../../components/form";
import { FormContainer } from "../../components/form/form.css";
import { NamedModal } from "../../components/modal";
import { MaposhState } from "../../service/store";
import { updateUserStatus } from "../../service/store/system/actions";
import { ISystemState } from "../../service/store/system/types";

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
  system: ISystemState;
  updateUserStatus: typeof updateUserStatus;
}

const BaseSignup: React.FC<ISignupProps> = props => {
  const [isUserNew, setIsUserNew] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const checkIfUserIsNew = async () => {
    const newUser = await Auth.signUp(email, password);
    setIsUserNew(newUser !== null);
  };

  const submitSignupForm = async (values: ISignupFormValues) => {
    setEmail(values.email);
    setPassword(values.password);
    checkIfUserIsNew();
  };

  const { t } = useTranslation();

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

  return (
    <FormContainer>
      <Formik
        initialValues={signupFormInitialValues}
        validationSchema={signupSchema}
        onSubmit={submitSignupForm}
        render={generateForm(signupFormFields, signupFormStatus)}
      />
    </FormContainer>
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

const Signup = connect(
  mapStateToProps,
  { updateUserStatus }
)(BaseSignup);

const SignupModal = withRouter(NamedModal("signup", <Signup />));

export default SignupModal;
