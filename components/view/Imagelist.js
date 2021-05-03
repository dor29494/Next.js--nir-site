import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Snackbar,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import fire from "../firebaseConfig";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ImageUpdater from "../utils/imageUtils/ImageUpdater";
import ImageDeleteDialog from "../utils/imageUtils/ImageDeleteDialog";
import GalleryAdder from "../utils/imageUtils/GalleryAdder";
import Image from "next/image";

let db = fire.firestore();
const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl",
    backgroundColor: theme.palette.background.dark,
    maxWidth: "800px",
    marginBottom: "2rem",
  },
  allGalleryButtons: {
    color: theme.palette.background.paper,
  },
  titleHolder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listTitle: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "10px",
    },
  },
  LinesButtons: {
    color: theme.palette.background.paper,
  },

  listItemBox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "nowrap",
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-around",
    },
    listIconsHolder: {
      display: "flex",
      flexGrow: 1,
    },
  },
}));

const Imagelist = ({ images, setImages }) => {
  const classes = useStyles();
  const [imageUpdate, setImageUpdate] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [gallerySlug, setGallerySlug] = useState(null);
  const [galleryTitle, setGalleryTitle] = useState(null);
  const [galleryToAdd, setGalleryToAdd] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [snackBarObj, setSnackBarObj] = useState({ toggle: false, msg: null });

  return (
    <>
      <Box>
        <Grid container direction="ltr">
          <Grid item xs={12}>
            {images.map(
              (gallery, key) =>
                gallery && (
                  <List component="ul" className={classes.root} key={key}>
                    <Box className={classes.titleHolder}>
                      <Typography fontSize="20px" variant="subtitle2" order={3}>
                        {gallery.title}
                      </Typography>
                      <IconButton
                        className={classes.allGalleryButtons}
                        style={{ order: 2 }}
                        onClick={() => {
                          setImageUpdate({
                            src: "",
                            alt: "",
                          });
                          setGallerySlug(gallery.slug);
                          setGalleryTitle(gallery.title);
                          setCurrentIndex(key);
                        }}
                      >
                        <AddAPhotoIcon />
                      </IconButton>
                      <IconButton
                        className={classes.allGalleryButtons}
                        style={{ transform: "rotateZ(270deg)" }}
                        onClick={() => {
                          setGalleryToAdd(true);
                          setGallerySlug(gallery.slug);
                          setGalleryTitle(gallery.title);
                          setCurrentIndex(key);
                        }}
                      >
                        <AddPhotoAlternateIcon />
                      </IconButton>
                      <IconButton
                        className={classes.allGalleryButtons}
                        style={{ order: -1 }}
                        onClick={() => {
                          setGallerySlug(gallery.slug);
                          setImageToDelete(null);
                          setDeleteDialog(!deleteDialog);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    {gallery.images.map((img, idx) => (
                      <>
                        <ListItem>
                          <Box className={classes.listItemBox}>
                            <Box className={classes.listIconsHolder}>
                              <IconButton
                                className={classes.LinesButtons}
                                onClick={() => {
                                  setGallerySlug(gallery.slug);
                                  setGalleryTitle(gallery.title);
                                  setCurrentIndex(key);
                                  setImageUpdate(img);
                                  setImageIndex(idx);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                className={classes.LinesButtons}
                                onClick={() => {
                                  setGallerySlug(gallery.slug);
                                  setGalleryTitle(gallery.title);
                                  setCurrentIndex(key);
                                  setImageToDelete(img);
                                  setImageIndex(idx);
                                  setDeleteDialog(!deleteDialog);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                            <a target="_blank" href={img.src}>
                              <Typography
                                variant="subtitle2"
                                fontSize={15}
                                className={classes.listTitle}
                              >
                                {img.src}
                              </Typography>
                            </a>
                            {img.src && (
                              <Box>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  width={45}
                                  height={45}
                                />
                              </Box>
                            )}
                          </Box>
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                  </List>
                )
            )}
            <Snackbar
              autoHideDuration={4000}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={snackBarObj.toggle}
              onClose={() => setSnackBarObj({ ...snackBarObj, toggle: false })}
              message={`${snackBarObj.msg}`}
            ></Snackbar>
            <ImageDeleteDialog
              open={deleteDialog}
              setOpen={setDeleteDialog}
              images={images}
              setImages={setImages}
              db={db}
              currentImage={imageToDelete}
              arrIndex={currentIndex}
              gallerySlug={gallerySlug}
              setSnackBarObj={setSnackBarObj}
            />
            {galleryToAdd && (
              <GalleryAdder
                images={images}
                setImages={setImages}
                open={galleryToAdd}
                setOpen={setGalleryToAdd}
                setSnackBarObj={setSnackBarObj}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      {imageUpdate !== null && (
        <ImageUpdater
          data={imageUpdate}
          open={imageUpdate}
          setData={setImageUpdate}
          gallerySlug={gallerySlug}
          db={db}
          images={images}
          galleryTitle={galleryTitle}
          setGalleryTitle={setGalleryTitle}
          setImages={setImages}
          setGallerySlug={setGallerySlug}
          index={currentIndex}
          imageIndex={imageIndex}
          setSnackBarObj={setSnackBarObj}
        />
      )}
    </>
  );
};

export default Imagelist;
