import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import fire from "../../firebaseConfig";

let db = fire.firestore();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialogSlide({open,setOpen,slug,setPosts,posts,snackBarObj,setSnackBarObj}) {
    const handleAgreeToDelete = () => {
        db.collection("posts").doc(slug).delete().then(() => {
            setPosts(posts.filter((post)=> post.slug !== slug))
            setSnackBarObj({toggle: true,msg: "Document successfully deleted!"})
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
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
        <DialogTitle id="alert-dialog-slide-title">{"האם ברצונך למחוק פריט זה לצמיתות?"}</DialogTitle>
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