import "../styles/global.css";
import { CssBaseline, Grid, Box, Container } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import theme from "../components/utils/style/theme";
import About from "../components/view/About";
import Header from "../components/view/Header";
import MiniHeader from "../components/view/MiniHeader";
import { AuthProvider } from "../AuthProvider";
import RTL from "../components/utils/Rtl";

const useStyles = makeStyles((theme) => ({
  pages: {},
  about: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  headerWrapper: {
    width: "calc(100% + 24px)",
  },
  appContainer: {
    marginTop: "1rem",
    paddingRight: 0,
  },
}));

export default function App({ Component, pageProps }) {
  const classes = useStyles();
  const muTheme = useTheme();
  const matches = useMediaQuery(muTheme.breakpoints.up("md"));

  return (
    <>
      <RTL>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box className={classes.headerWrapper}>
            {matches ? <Header /> : <MiniHeader />}
          </Box>
          <Container maxWidth="lg" className={classes.appContainer}>
            <Grid
              container
              justify="center"
              wrap="wrap"
              direction="row"
              spacing={3}
            >
              <Grid
                item
                xs={12}
                sm={3}
                justify="center"
                alignItems="center"
                className={classes.about}
              >
                <About />
              </Grid>
              <Grid item xs={12} sm={9} className={classes.pages}>
                <Component {...pageProps} />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </AuthProvider>
      </RTL>
    </>
  );
}
