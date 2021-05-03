import { AppBar, Toolbar, Button, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { appBarTitles, appBarUrls } from "../utils/titleNamesIndex";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.appBar.main,
  },
  appBarTabs: {
    color: "white",
   "&.MuiTab-root":{
     opacity: 1
   },
    "& .MuiTab-wrapper": { fontFamily: "Varela Round" , opacity: 1,},
  },
  appBarLinks: {
    textDecoration: "none",
    "&.a:-webkit-any-link": {
      textDecoration: "none",
    },
  },
  appBarTitle: {
    "& .MuiTab-wrapper": { fontSize: "24px", fontFamily: "Varela Round" },
    "&.MuiTab-root":{
      opacity: 1
    },
  },

  tabsContainer: {
    "& .MuiTabs-flexContainer": {
      minHeight: "100%",
    },
  },
  BoxRoot: {
    display: "flex",
    flexDirection: "row",
    "& .MuiBox-root": {
      background: "green",
      display: "flex",
    },
  },
  button: {
    fontSize: "12px",
    fontFamily: "Varela Round",
  },
}));

const Header = () => {
  const classes = useStyles();
  console.log("header");
  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Tabs className={classes.tabsContainer} value={0}>
            <Link href="/">
              <Tab className={classes.appBarTitle} label="ניר הקוסם" />
            </Link>
            <Link
              className={classes.appBarLinks}
              key={"gallery"}
              href={`/gallery/`}
            >
              <Tab className={classes.appBarTabs} label="גלריה" />
            </Link>
            {appBarTitles.map((tab, key) => (
              <Link
                className={classes.appBarLinks}
                key={key}
                href={`/posts/${appBarUrls[key]}`}
              >
                <Tab className={classes.appBarTabs} label={tab} />
              </Link>
            ))}
          </Tabs>
          <Link
            className={classes.appBarLinks}
            key={"contact"}
            href={"/posts/contact"}
          >
            <Button color="inherit" className={classes.button}>
              צור קשר
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
