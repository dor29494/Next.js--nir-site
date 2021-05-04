import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
  },
  postsTab: {
    "&.MuiTab-root": {
      color: theme.palette.background.light,
      background: theme.palette.background.dark,
      marginLeft: "-33px",
      borderRadius: "25px",
      opacity: (value) => (value === 0 ? 1 : 0.5),
      zIndex: (value) => (value === 0 ? 1 : 0),
      [theme.breakpoints.down("md")]: {
        minWidth: "120px",
      },
    },
  },
  imagesTab: {
    "&.MuiTab-root": {
      marginLeft: "-33px",
      color: theme.palette.background.light,
      background: theme.palette.background.dark,
      borderRadius: "25px",
      opacity: (value) => (value === 1 ? 1 : 0.5),
      zIndex: (value) => (value === 1 ? 1 : 0),
      [theme.breakpoints.down("md")]: {
        minWidth: "120px",
      },
    },
  },
  buttonBox: {
    position: "relative",
    padding: "1rem",
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function SwitchTabs({ postList, imageList }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const classes = useStyles(value);
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Box className={classes.buttonBox}>
          <Tab
            label="פוסטים"
            {...a11yProps(0)}
            className={classes.postsTab}
            onClick={() => setValue(0)}
          />
          <Tab
            label="תמונות"
            {...a11yProps(1)}
            className={classes.imagesTab}
            onClick={() => setValue(1)}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <SwipeableViews
          axis={theme.direction === "ltr" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {postList}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {imageList}
          </TabPanel>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
}
