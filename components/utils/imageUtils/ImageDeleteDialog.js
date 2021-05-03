import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import fire from "../../firebaseConfig";

let db = fire.firestore();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageDeleteDialog({
  open,
  setOpen,
  images,
  setImages,
  currentImage,
  arrIndex,
  setSnackBarObj,
  gallerySlug,
}) {
  console.log([...images]);
  const handleAgreeToDelete = () => {
    if(currentImage !== null){
      const galleryToReplace = { ...images[arrIndex] };
      console.log(galleryToReplace.images);
      galleryToReplace.images = galleryToReplace.images.filter(
        (img) => img.src !== currentImage.src
      );
      const imagesCollectionsClone = [...images];
      imagesCollectionsClone[arrIndex] = galleryToReplace;
      console.log(imagesCollectionsClone);
      db.collection("gallery")
        .doc(gallerySlug)
        .set(galleryToReplace)
        .then(() => {
          setImages([...imagesCollectionsClone]);
            setSnackBarObj({
              toggle: true,
              msg: "Image successfully deleted!",
            });
          console.log("Image successfully deleted!");
        })
        .catch((error) => {
          console.error("Error deleting image: ", error);
            setSnackBarObj({ toggle: true, msg: "Error deleting image" });
        });
      setOpen(false);
    }
    else{
      const imagesCollectionsClone = [...images].filter(gallery => gallery.slug !== gallerySlug)
      console.log(imagesCollectionsClone)
      db.collection("gallery")
      .doc(gallerySlug)
      .delete()
      .then(() => {
        setImages([...imagesCollectionsClone]);
          setSnackBarObj({
            toggle: true,
            msg: "Gallery successfully deleted!",
          });
        console.log("Gallery successfully deleted!");
      })
      .catch((error) => {
        console.error("Error Deleting Gallery: ", error);
          setSnackBarObj({ toggle: true, msg: "Error Deleting Gallery" });
      });
    }
    setOpen(false);
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"האם ברצונך למחוק פריט זה לצמיתות?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            לא מסכים
          </Button>
          <Button onClick={handleAgreeToDelete} color="primary">
            מסכים
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
