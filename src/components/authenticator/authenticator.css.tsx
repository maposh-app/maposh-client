import config from "../../config";

const NavBar = {
  position: "relative",
  border: "1px solid transparent",
  borderColor: "#e7e7e7"
};

const NavRight = {
  textAlign: "right"
};

const Nav = {
  margin: "7.5px"
};

const NavItem = {
  display: "inline-block",
  padding: "10px 5px",
  lineHeight: "20px"
};

const NavButton = {
  display: "inline-block",
  padding: "6px 12px",
  marginTop: "8px",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "1.42857143",
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  touchAction: "manipulation",
  cursor: "pointer",
  userSelect: "none",
  backgroundImage: "none",
  border: "1px solid transparent",
  borderRadius: "4px",
  color: "#333",
  backgroundColor: config.theme.colorVisitedLink,
  borderColor: "#ccc"
};

const FormContainer = {
  textAlign: "center"
};

const FormSection = {
  textAlign: "left",
  display: "inline-block",
  padding: 0
};

const ErrorSection = {
  marginBottom: "20px",
  color: "#fff",
  backgroundColor: "#f0ad4e",
  border: "1px solid #eea236",
  borderRadius: "4px",
  textAlign: "left"
};

const SectionHeader = {
  backgroundColor: `${config.theme.colorPrimary}`,
  padding: "10px 15px",
  borderTopLeftRadius: "3px",
  borderTopRightRadius: "3px",
  textAlign: "center"
};

const SectionFooter = {
  padding: "10px 15px",
  borderTopLeftRadius: "3px",
  borderTopRightRadius: "3px"
};

const SectionBody = {
  padding: "15px"
};

const FormRow = {
  marginBottom: "15px"
};

export const ActionRow = {
  marginBottom: "15px"
};

export const Input = {
  display: "block",
  width: "100%",
  height: "34px",
  padding: "6px 12px",
  fontSize: "14px",
  lineHeight: "1.42857143",
  color: "#555",
  backgroundColor: "#fff",
  backgroundImage: "none",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "inset 0 1px 1px rgba(0,0,0,.075)",
  boxSizing: "border-box",
  transition: "border-color ease-in-out .15s,box-shadow ease-in-out .15s"
};

export const Button = {
  borderRadius: config.theme.elementBorderRadius,
  display: "inline-block",
  padding: "6px 12px",
  marginBottom: "0",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "1.42857143",
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  touchAction: "manipulation",
  cursor: "pointer",
  userSelect: "none",
  backgroundImage: "none",
  border: "1px solid transparent",
  color: "#333",
  backgroundColor: "#fff",
  borderColor: "#ccc"
};

export const SignInButton = {
  position: "relative",
  padding: "6px 12px 6px 44px",
  fontSize: "14px",
  textAlign: "left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "block",
  width: "100%",
  marginTop: "2px",
  "#google_signin_btn": {
    color: "#fff",
    backgroundColor: "#dd4b39",
    borderColor: "rgba(0,0,0,0.2)"
  },
  "#facebook_signin_btn": {
    color: "#fff",
    backgroundColor: "#3b5998",
    borderColor: "rgba(0,0,0,0.2)"
  }
};

export const Space = {
  display: "inline-block",
  width: "20px"
};

export const A = {
  color: "#007bff",
  cursor: "pointer"
};

export const Pre = {
  overflow: "auto",
  fontFamily: `Menlo,
                Monaco,
                Consolas,
                "Courier New",
                monospace`,
  display: "block",
  padding: "9.5px",
  margin: "0 0 10px",
  fontSize: "13px",
  lineHeight: "1.42857143",
  color: "#333",
  wordBreak: "break-all",
  wordWrap: "break-word",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "4px"
};

export const Col1 = {
  display: "inline-block",
  width: "8.33333333%"
};

export const Col2 = {
  display: "inline-block",
  width: "16.66666667%"
};

export const Col3 = {
  display: "inline-block",
  width: "25%"
};

export const Col4 = {
  display: "inline-block",
  width: "33.33333333%"
};

export const Col5 = {
  display: "inline-block",
  width: "41.66666667%"
};

export const Col6 = {
  display: "inline-block",
  width: "50%"
};

export const Col7 = {
  display: "inline-block",
  width: "58.33333333%"
};

export const Col8 = {
  display: "inline-block",
  width: "66.66666667%"
};

export const Col9 = {
  display: "inline-block",
  width: "75%"
};

export const Col10 = {
  display: "inline-block",
  width: "83.33333333%"
};

export const Col11 = {
  display: "inline-block",
  width: "91.66666667%"
};

export const Col12 = {
  display: "inline-block",
  width: "100%"
};

export const Hidden = {
  display: "none"
};

const AuthenticatorTheme = {
  navBar: NavBar,
  nav: Nav,
  navRight: NavRight,
  navItem: NavItem,
  navButton: NavButton,

  formContainer: FormContainer,
  formSection: FormSection,
  errorSection: ErrorSection,
  sectionHeader: SectionHeader,
  sectionBody: SectionBody,
  sectionFooter: SectionFooter,

  formRow: FormRow,
  actionRow: ActionRow,

  space: Space,

  signInButton: SignInButton,

  input: Input,
  button: Button,
  a: A,
  pre: Pre,

  col1: Col1,
  col2: Col2,
  col3: Col3,
  col4: Col4,
  col5: Col5,
  col6: Col6,
  col7: Col7,
  col8: Col8,
  col9: Col9,
  col10: Col10,
  col11: Col11,
  col12: Col12,

  hidden: Hidden
};

export default AuthenticatorTheme;
