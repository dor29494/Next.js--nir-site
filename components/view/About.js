import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import React, { useState } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import YoutubeEmbed from "../utils/style/YoutubeEmbed";
import Link from "next/link"

const customersImg = [
  {
    src:
      "http://www.nir-o.com/images/consumers/0c44536a-eeb3-49d6-8411-df9442f22b72.jpg",
    alt: "תמרס",
  },
  {
    src:
      "http://www.nir-o.com/images/consumers/f12e1074-d2c1-445a-8248-58a0f5a7759c.jpg",
    alt: "012 smile",
  },
  {
    src:
      "http://www.nir-o.com/images/consumers/600028c7-1f76-4f2e-ab4e-2dc46605570e.jpg",
    alt: "הופ",
  },
  {
    src:
      "http://www.nir-o.com/images/consumers/f0aaae07-d523-41ff-9a2f-a8cdb6c1b3a6.jpg",
    alt: "מלון דן",
  },
];

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
    border: "2px solid red",
  },
  title: {
    width: "100%",
  },

  paper: {
    padding: "1rem",
    display: "flex",
    background: theme.palette.background.paper,
    flexWrap: "nowrap",
    justifyContent: "center",
  
  },
  paperWrapper: {
    height: "100%",
    flexWrap: "wrap",
    order: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
  paperGridContainer: {
    display: "flex",
    margin: 0,
  },

  videoHolder: {},

  avatar: {
    width: "100%",
    borderRadius: "10%",
    maxWidth: "300px",
    height: "auto",
    [theme.breakpoints.up("md")]: {
      alignSelf: "center",
    },
  },
  button: {
    width: "100%",
    color: theme.palette.icons.main,
    borderColor: "black",
    "&.MuiButton-root": {
      "&:hover": {
        background: theme.palette.background.dark,
        color: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  socialButtons: {
    fontSize: "30px",
    color: theme.palette.icons.main,
    "&:hover": {
      color: theme.palette.background.dark,
    },
  },
  avatarWrapper: {
    justifyContent: "center",
    paddingLeft: 0,
  },
  socialWrapper: {
    justifyContent: "center",
  },
  iconButton: {
    opacity: 0.7,
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
    "&.MuiButtonBase-root": {
      "&:hover": {
        opacity: 1,
        background: theme.palette.background.paper,
      },
    },
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.paper} elevation={4}>
        <Grid
          container
          className={classes.paperGridContainer}
          direction="row"
          justify="center"
        >
          <Grid
            item
            justify="center"
            align="center"
            xs={12}
            className={classes.avatarWrapper}
            
          >
            <Box mb={1}>
              <Avatar
                className={classes.avatar}
                alt="ניר הקוסם"
                src="https://res.cloudinary.com/dscloud/image/upload/v1619960472/nir-gallery/p6wvyokyivoxpa4nn54g.jpg"
              ></Avatar>
            </Box>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Grid
              container
              justify="center"
              align="center"
              className={classes.socialWrapper}
            >
              <Grid item xs={4} md={3} justify="center" align="center">
                <a target="__blank" href="https://www.facebook.com/profile.php?id=100063562833113">
                <IconButton className={classes.iconButton}>
                  <FacebookIcon className={classes.socialButtons} />
                </IconButton>
                </a>
              </Grid>
              <Grid item xs={4} md={3} justify="center" align="center">
                <a target="__blank" href="https://www.instagram.com/ohananir">
                <IconButton className={classes.iconButton}>
                  <InstagramIcon className={classes.socialButtons} />
                </IconButton>
                </a>
              </Grid>
              <Grid item xs={4} md={3} justify="center" align="center">
              <a target="_blank" href="http://api.whatsapp.com/send?phone=+972523282947">
                <IconButton className={classes.iconButton}>
                  <WhatsAppIcon className={classes.socialButtons} />
                </IconButton>
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box mb={3} mt={1}>
              <a href="tel:+972-54-233-0463">
              <Button
                variant="outlined"
                className={classes.button}
                fullWidth={true}
                endIcon={<PhoneIcon />}
                ></Button>
                </a>
            </Box>
          </Grid>
          <Grid item xs={12} className={classes.videoHolder}>
            <YoutubeEmbed youtubeId="KO5NWI5GZ4Q" classes />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default About;
