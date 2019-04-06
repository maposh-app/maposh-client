import axios from "axios";
import { Formik, FormikActions } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {
  generateFormContent,
  IFormFields,
  IFormStatus
} from "../../components/form";
import { FormContainer, FormContent } from "../../components/form/form.css";
import { LandingPrompt } from "./landing.css";

interface ISubscribeFormValues {
  email: string;
}

const initialValues: ISubscribeFormValues = {
  email: ""
};

const Subscribe: React.FC = props => {
  const { t } = useTranslation();

  const formFields: IFormFields[] = t("subscribe.form", {
    returnObjects: true
  });
  const formStatus: IFormStatus = t("subscribe.status", {
    returnObjects: true
  });

  const subscriptionSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("subscribe.errors.emailIsValid"))
      .required(t("subscribe.errors.email"))
  });

  const submitForm = (
    values: ISubscribeFormValues,
    actions: FormikActions<ISubscribeFormValues>
  ) => {
    const data = {
      body: {
        email_address: values.email,
        status: "subscribed"
      }
    };
    const mailchimpURL = "/.netlify/functions/subscribe";
    axios
      .post(mailchimpURL, data)
      .then(res => {
        window.setTimeout(() => actions.resetForm(), 1000);
      })
      .catch(err => {
        actions.setErrors({ email: JSON.stringify(err.response.data) });
        actions.setSubmitting(false);
      });
  };
  return (
    <>
      <LandingPrompt>{t("subscribe.prompt")}</LandingPrompt>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={subscriptionSchema}
          onSubmit={submitForm}
          validateOnBlur={true}
          validateOnChange={true}
          render={formikProps => (
            <FormContent onSubmit={formikProps.handleSubmit}>
              {generateFormContent<ISubscribeFormValues>(
                formFields,
                formStatus,
                formikProps
              )}
            </FormContent>
          )}
        />
      </FormContainer>
    </>
  );
};
export default Subscribe;
