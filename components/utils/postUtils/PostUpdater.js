import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Box, Grid, TextField, withStyles } from "@material-ui/core";
import dynamic from "next/dynamic";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    marginBottom: "3rem",
    "& .MuiToolbar-root": {
      background: theme.palette.background.dark,
    },
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  listWrapper: {
    background: theme.palette.background.default,
    direction: "ltr",
    marginTop: "5rem",
    borderRadius: "2px",
  },
  gridInput: {
    width: "70%",
    maxWidth: "71%",
  },
}));

const InputField = withStyles((theme) => ({
  root: {
    direction: "ltr",
    background: theme.palette.background.light,
    width: "100%",
    borderRadius: "7px",
    marginBottom: "0.5rem",
    "& label.Mui-focused": {
      color: "tomato",
      direction: "ltr",
    },
    "& label": {
      color: theme.palette.background.dark,
      fontWeight: "200",
      direction: "ltr",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        direction: "rtl",

        borderColor: theme.palette.background.dark,
      },
      "&.Mui-focused fieldset": {
        direction: "ltr",

        borderColor: "lightgrey",
      },
      "&.Mui-focused fieldset": {
        direction: "ltr",
        borderColor: theme.palette.background.paper,
      },
    },
  },
}))(TextField);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Editor = dynamic(() => import("./Ckeditor"), {
  ssr: false,
});
export default function PostUpadter({
  data,
  setData,
  db,
  posts,
  setPosts,
  setSnackBarObj,
  snackBarObj,
}) {
  const classes = useStyles();
  console.log(data);
  const editorHandler = (editorData) => {
    let dataObj = data;
    dataObj.body = editorData;
    setData({ ...dataObj });
  };

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    if (data.slug.length && data.body.length > 3) {
      db.collection("posts")
        .doc(data.slug)
        .set({
          body: data.body,
          slug: data.slug,
          title: data.title,
          metaTitle: data.metaTitle,
        })
        .then(() => {
          setPosts([...posts, data]);
          setSnackBarObj({
            toggle: true,
            msg: "Document successfully written!",
          });
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          setSnackBarObj({ toggle: true, msg: "Error writing document" });
        });
    }

    setData(null);
  };
  const dialogClose = () => setData(null);

  return (
    <div>
      <Dialog
        dir="ltr"
        fullScreen
        open={true}
        onClose={dialogClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Box className={classes.title}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setData(null)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Button autoFocus color="inherit" onClick={handleClose}>
              <Typography variant="subtitle1">שמור</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <List className={classes.listWrapper}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid className={classes.gridInput} item xs={12}>
              <ListItem mt={3}>
                <InputField
                  defaultValue={data.title}
                  onChange={inputHandler}
                  name="title"
                  id="outlined-basic"
                  label="Post Title"
                  variant="outlined"
                />
              </ListItem>
            </Grid>
            <Grid className={classes.gridInput} item xs={12}>
              <ListItem>
                <InputField
                  defaultValue={data.slug}
                  onChange={inputHandler}
                  name="slug"
                  id="outlined-basic"
                  label="Post Slug"
                  variant="outlined"
                />
              </ListItem>
            </Grid>
            <Grid className={classes.gridInput} item xs={12}>
              <ListItem>
                <InputField
                  defaultValue={data.metaTitle}
                  onChange={inputHandler}
                  name="metaTitle"
                  id="outlined-basic"
                  label="Post Meta-title"
                  variant="outlined"
                  dir="rtl"
                />
              </ListItem>
            </Grid>
            <Grid className={classes.gridInput} item xs={12}>
              <ListItem>
                <Editor
                  dataBody={data.body}
                  onBeforeLoad={(CKEDITOR) =>
                    (CKEDITOR.disableAutoInline = true)
                  }
                  callback={editorHandler}
                />
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </div>
  );
}
