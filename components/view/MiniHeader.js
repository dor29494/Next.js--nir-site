import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { makeStyles,useTheme} from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  SwipeableDrawer,
  Divider,
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import { miniAppBarTitles, miniAppBarUrls } from "../utils/titleNamesIndex";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiDrawer-paper": {
      background: "blue",
    },
  },
  appBar: {
    background: theme.palette.background.dark,
  },
  drawer: {
    height: "42%",
  },
  menuButton: {
    marginRight: "1px",
  },
  title: {
    flexGrow: 1,
  },
  drawerText: {
    textAlign: "initial",
  },
  listWrapper: {
    height: "100%",
    background: theme.palette.background.paper,
  },
  button: {
    marginRight: "13px",
    fontFamily: "Varela Round",
  },
}));

const MiniHeader = () => {
  const classes = useStyles();
  const [drawerBoolean, setDrawerBoolean] = useState(false);
  const theme = useTheme()
  const openDrawer = () => {
    console.log(drawerBoolean)
    setDrawerBoolean(!drawerBoolean)};
  const list = (anchor) => (
    <Box
      className={classes.listWrapper}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer( false)}
    >
    <Box>
    <IconButton onClick={ openDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
    </Box>
    <Divider />
      <List>
        {miniAppBarTitles.map((text, index) => (
          <Link
          key={index}
            href={
              text === "ראשי"
                ? miniAppBarUrls[0]
                : `/posts/${miniAppBarUrls[index]}`
            }
          >
            <ListItem button key={text}>
              <ListItemText primary={text} className={classes.drawerText} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
    setDrawerBoolean(open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" className={classes.title}>
          <Link href="/">
            ניר הקוסם
          </Link>
          </Typography>
          <Link href="/contact">
          <Button color="inherit" className={classes.button}>
            צור קשר
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        className={classes.drawer}
        anchor={"right"}
        open={drawerBoolean}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
};

export default MiniHeader;
