import Typography from "typography";
import config from "../../config";

const theme: { [setting: string]: string } = config.theme;
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
    a: { color: theme.colorLink, textDecoration: "none" }
  })
});

export default Typographer;
