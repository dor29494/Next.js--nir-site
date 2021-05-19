import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  IconButton,
  Typography,
  Slide,
  Box,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import dynamic from "next/dynamic";
import ImageUplodaer from "./ImageUploader";

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const DialogTitle = withStyles((theme) => ({
  root: {
    padding: 0,
  },
  ".&MuiDialogTitle-root": {
    padding: 0,
  },
}))(MuiDialogTitle);
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  ".    &MuiDialogContent-dividers": {},
}))(MuiDialogContent);

const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "tomato",
    },
    "& label": {
      color: "tan",
      fontWeight: "200",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "tan",
      },
      "&.Mui-focused fieldset": {
        borderColor: "tan",
      },
      "&.Mui-focused fieldset": {
        borderColor: "tan",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  closeButton: {
    color: theme.palette.background.sideNavBar,
    position: "absolute",
    top: 0,
    right: 0,
  },
  SaveButtonDiv: {
    padding: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  dialogTitle: {
    display: "flex",
    padding: "1rem",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  textField: {
    width: "70%",
    margin: "auto",
    color: "white",
    ".&outlined-basic": {
      color: "white",
    },
    ". &fieldset:": {
      border: "1px solid green",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ImageUpdater({
  data,
  setData,
  setSnackBarObj,
  gallerySlug,
  imageIndex,
  index,
  setGallerySlug,
  galleryTitle,
  db,
  images,
  setImages,
}) {
  const classes = useStyles();
  const [imageUploadUrl, setImageUploadUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    if (validURL(data.src) && gallerySlug !== null && data.alt.length > 3) {
      if (imageIndex !== null) {
        const galleryToReplace = { ...images[index] };
        galleryToReplace.images[imageIndex] = data;
        const imagesCollectionsClone = [...images];
        imagesCollectionsClone[index] = galleryToReplace;
        db.collection("gallery")
          .doc(gallerySlug)
          .set(galleryToReplace)
          .then(() => {
            setImages([...imagesCollectionsClone]);
            setSnackBarObj({
              toggle: true,
              msg: "Document successfully written!",
            });
            setData(null);
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            setSnackBarObj({ toggle: true, msg: "Error writing document" });
          });
      } else {
        const galleryToReplace = { ...images[index] };
        galleryToReplace.images.push(data);
        const imagesCollectionsClone = [...images];
        imagesCollectionsClone[index] = galleryToReplace;
        db.collection("gallery")
          .doc(gallerySlug)
          .set(galleryToReplace)
          .then(() => {
            setImages([...imagesCollectionsClone]);
            setSnackBarObj({
              toggle: true,
              msg: "Document successfully written!",
            });
            setData(null);
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            setSnackBarObj({ toggle: true, msg: "Error writing document" });
          });
      }
    }
    if (!validURL(data.src)) {
      return setErrorMsg("Your image src is not expected");
    }
    if (data.alt.length < 3) {
      return setErrorMsg("Your alt most have at least 3 characters");
    }
  };
  const dialogClose = () => setData(null);
  return (
    <>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={true}
        onClose={dialogClose}
        scroll="body"
      >
        <DialogTitle disableTypography id="customized-dialog-title">
          <Box className={classes.dialogTitle}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={() => setData(null)}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h2"
              color="secondary.main"
              fontSize={36}
              align="center"
            >
              {`הוסף תמונות ל-${galleryTitle}`}
            </Typography>
          </Box>
        </DialogTitle>
        <Divider color="grey" light={true} flexItem />
        <DialogContent dividers>
          <Grid container alignItems="center" justifyContent="center">
            <Box style={{ color: "red" }}>{errorMsg}</Box>
            <Grid
              item
              xs={12}
              md={12}
              mt={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <InputField
                className={classes.textField}
                defaultValue={data.src}
                value={imageUploadUrl && imageUploadUrl}
                onChange={inputHandler}
                name="src"
                id="outlined-basic"
                label="Image src"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              mt={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <InputField
                className={classes.textField}
                defaultValue={data.alt}
                onChange={inputHandler}
                name="alt"
                id="outlined-basic"
                label="Image alt"
                variant="outlined"
              />
            </Grid>

            {!validURL(imageUploadUrl) && (
              <Grid
                item
                xs={12}
                md={12}
                mt={3}
                container
                justifyContent="center"
                alignItems="center"
              >
                <ImageUplodaer
                  data={data}
                  setData={setData}
                  setImageUploadUrl={setImageUploadUrl}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <Divider />
        <Box component="div" className={classes.SaveButtonDiv}>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
///////
