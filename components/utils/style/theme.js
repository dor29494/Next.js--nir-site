import { createMuiTheme } from '@material-ui/core/styles';




// Create a theme instance.
const theme = createMuiTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: '#878683',
    },
    secondary: {
      main: '#12232E',
    },
    appBar: {
      main: "#12232E"
    },
    error: {
      main: "#f00",
    },
    background: {
      light: "#FCFCFC",
      gallery: "#663399",
      default: '#cddcf2',
      paper: "#EEFBFB",
      sideNavBar: "#bebebe",
      dark: "#12232E",
    },
    textField: {
      main: "#C2C1C0"
    },
    buttons: {
      backOffice: "#f18957"
    },
    icons: {
      hover: '#878683',
      main: "#203647"
    }
  },
  typography:{
      h1: {
        marginBottom: "20px",
        fontSize: "30px",
        fontFamily: "Rubik",
      },
      subtitle1:{
        fontSize: "20px",
        fontFamily: "Rubik",
      },
      subtitle2:{
        fontFamily: "Rubik",
        color: "white",
      },
      body1:{
        fontSize: "16px",
        fontFamily: 'Assistant'
      }

  }
});

export default theme;
