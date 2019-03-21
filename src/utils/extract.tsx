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

export const hexToRGBA = (hex: string, alpha: number) => {
  hex = hex.charAt(0) === "#" ? hex.substring(1, 7) : hex;

  if (hex.length !== 6) {
    alert("Invalid length of the input hex value!");
    return;
  }
  if (/[0-9a-f]{6}/i.test(hex) !== true) {
    alert("Invalid digits in the input hex value!");
    return;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b, alpha * 255];
};
