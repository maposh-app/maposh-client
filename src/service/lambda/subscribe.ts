import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import Axios, { AxiosError, AxiosResponse } from "axios";
import * as dotenv from "dotenv";
import md5 from "md5";

dotenv.config();

const mailChimpAPI = process.env.REACT_APP_MAILCHIMP_API_KEY || "";
const mailChimpListID = process.env.REACT_APP_MAILCHIMP_LIST_KEY || "";
const mcRegion = process.env.REACT_APP_MAILCHIMP_REGION || "";
const mailChimpURL = `https://${mcRegion}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members`;

export const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const formData = JSON.parse(event.body);
  const params = event.queryStringParameters;
  const email = formData.email_address;
  let errorMessage = null;

  if (!formData) {
    errorMessage = "Please supply the form data";
    console.log(errorMessage);
    callback(errorMessage);
  }

  if (!email) {
    errorMessage = "Please supply the email.";
    console.log(errorMessage);
    callback(errorMessage);
  }

  if (!mailChimpListID) {
    errorMessage = "Please supply the list key.";
    console.log(errorMessage);
    callback(errorMessage);
  }

  const data = {
    email_address: email,
    status: "pending"
  };

  const config = {
    headers: {
      Authorization: `apikey ${mailChimpAPI}`,
      "Content-Type": "application/json"
    }
  };

  const subscriber = JSON.stringify(data);
  console.log("Sending the following data to mailchimp: ", subscriber);

  Axios.get(`${mailChimpURL}/${md5(email)}`, config)
    .then(res => {
      if (res.data.status === "unsubscribed") {
        Axios.patch(
          `${mailChimpURL}/${md5(email)}`,
          { status: "pending" },
          config
        ).then((patchResponse: AxiosResponse) => {
          console.log("Mailchimp body: " + JSON.stringify(patchResponse.data));
          console.log("Status Code: " + patchResponse.status);
          if (patchResponse.status < 300) {
            console.log("Subscribed to the mailing list");
            callback(null, {
              statusCode: 201,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
              },
              body: JSON.stringify({
                status: "saved email",
                params
              })
            });
          } else {
            console.log("Error from mailchimp", patchResponse.data.detail);
            callback(patchResponse.data.detail);
          }
        });
      } else {
        callback(null, {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
          },
          body: "subscribe.errors.userExists"
        });
      }
    })
    .catch(() => {
      Axios.post(mailChimpURL, data, config)
        .then((res: AxiosResponse) => {
          console.log("Mailchimp body: " + JSON.stringify(res.data));
          console.log("Status Code: " + res.status);
          if (res.status < 300) {
            console.log("Subscribed to the mailing list");
            callback(null, {
              statusCode: 201,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
              },
              body: JSON.stringify({
                status: "saved email",
                params
              })
            });
          } else {
            console.log("Error from mailchimp", res.data.detail);
            callback(res.data.detail);
          }
        })
        .catch((err: AxiosError) => {
          if (
            err.response.data.status === 400 &&
            err.response.data.title === "Member Exists"
          ) {
            console.log(err);
            callback(null, {
              statusCode: 400,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
              },
              body: "subscribe.errors.userExists"
            });
          } else {
            callback(err);
          }
        });
    });
};
