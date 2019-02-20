import Typography from "typography";
import { colorLink } from "../constants/theme";

const Typographer = new Typography({
  baseFontSize: "20px",
  scaleRatio: 1.1,
  bodyFontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol"
  ],
  overrideStyles: (fonts, options, styles) => ({
    a: { color: colorLink, textDecoration: "none" }
  })
});

export default Typographer;
