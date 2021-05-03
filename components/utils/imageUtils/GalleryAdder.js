import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import fire from "../../firebaseConfig";
let db = fire.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
const InputField = withStyles((theme) => ({
  root: {
    width: "70%",
    margin: "auto",
    "& label.Mui-focused": {
      color: "tomato",
    },
    "& label": {
      color: "tan",
      fontWeight: "200",
    },
    "& .MuiOutlinedInput-root": {
      color: theme.palette.secondary.main,
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
}))(TextField);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  ".    &MuiDialogContent-dividers": {},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function GalleryAdder({
  open,
  setOpen,
  setSnackBarObj,
  images,
  setImages,
}) {
  const [input, setInput] = useState({ slug: "", title: "" });
  const classes = useStyles();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  console.log(input);
  const submitHandler = () => {
    const inputClone = { ...input };
    if (input.title.length > 3 && input.title.length < 16) {
      const gallerySlug = inputClone.slug
      const galleryTitle = inputClone.title;
      db.collection("gallery")
        .doc(gallerySlug)
        .set({
          title: galleryTitle,
          slug: gallerySlug,
          images: [],
        })
        .then(() => {
          setImages([
            ...images,
            { slug: gallerySlug, images: [], title: galleryTitle },
          ]);
          setSnackBarObj({
            toggle: true,
            msg: "Gallery successfully written!",
          });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          setSnackBarObj({ toggle: true, msg: "Error adding gallery" });
        });
    }
    setOpen(false);
  };

  return (
    <>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="body"
      >
        <MuiDialogTitle
          disableTypography
          id="customized-dialog-title"
          className={classes.root}
        >
          <Typography variant="h2" color="secondary.main" align="center">
            Add a new Gallery
          </Typography>

          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Typography
                varaint="h3"
                color="primary.main"
                fontSize={22}
                align="center"
                gutterBottom
              >
                Choose your new gallery title
              </Typography>
              <Divider color="grey" light={true} flexItem />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              mt={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <InputField
                gutterBottom
                label="Your Slug Name"
                id="outlined-margin-normal"
                name="slug"
                onChange={inputHandler}
              ></InputField>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              mt={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <InputField
                gutterBottom
                name="title"
                label="Your Gallery Name"
                id="outlined-margin-normal"
                onChange={inputHandler}
              ></InputField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={submitHandler} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
