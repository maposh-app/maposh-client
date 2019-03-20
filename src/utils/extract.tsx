import { Auth } from "aws-amplify";

export const getWindowHeight: () => number = () => {
  if (window.innerHeight && document.documentElement.clientHeight) {
    return Math.min(window.innerHeight, document.documentElement.clientHeight);
  }
  const root = document.getElementById("root");
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    (root ? root.clientHeight : 0)
  );
};

export const getWindowWidth: () => number = () => {
  if (window.innerWidth && document.documentElement.clientWidth) {
    return Math.min(window.innerWidth, document.documentElement.clientWidth);
  }
  const root = document.getElementById("root");
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    (root ? root.clientWidth : 0)
  );
};

// https://stackoverflow.com/questions/38377675/parsing-url-with-js
export const getQuerystring = (name: string, url = window.location.href) => {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
