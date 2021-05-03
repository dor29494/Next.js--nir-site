import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  Box,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Snackbar,
  Typography,
} from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import PostUpadter from "../utils/postUtils/PostUpdater";
import { makeStyles } from "@material-ui/core/styles";
import fire from "../firebaseConfig";
import DeleteDialogSlide from "../utils/postUtils/PostDeleteDialog";

let db = fire.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.dark,
    direction: "ltr"
  },
  wrapper:{
    direction: "ltr",
  },
  slugTitle: {
    textAlign: "start",
  },
  buttons:{
    color: theme.palette.background.paper
  },
  addButton:{
    color: theme.palette.background.dark,
    fontSize: "20px",
  },
}));

const PostList = ({ posts, setPosts }) => {
  const classes = useStyles();
  const [postUpdate, setPostUpdate] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [slugChoosen, setSlugChoosen] = useState("");
  const [snackBarObj, setSnackBarObj] = useState({ toggle: false, msg: null });
  const metaSiteTitle = "ניר הקוסם |";

  const initalDeletePost = (dialog, slug) => {
    setDeleteDialog(dialog);
    setSlugChoosen(slug);
  };
  return (
    <>
      <Box className={classes.wrapper}>
        <IconButton
        className={classes.addButton}
          onClick={() =>
            setPostUpdate({
              title: "",
              slug: "",
              body: "",
              metaTitle: metaSiteTitle,
            })
          }
        >
          <PostAddIcon fontSize="large" />
        </IconButton>
     
      <List component="ul" className={classes.root}>
        {posts &&
          posts.map((post, key) => (
            <>
              <ListItem key={key} role={undefined} dense>
                <Grid container alignItems="center">
                  <Grid item xs={8} sm={9} md={10}>
                    <Typography
                      variant="subtitle2"
                      className={classes.slugTitle}
                    >
                      {`כותרת העמוד: ${post.title}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={3} md={2}>
                    <IconButton className={classes.buttons} onClick={() => setPostUpdate(post)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                    className={classes.buttons}
                      onClick={() => initalDeletePost(!deleteDialog, post.slug)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                  <Snackbar
                    autoHideDuration={4000}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={snackBarObj.toggle}
                    onClose={() =>
                      setSnackBarObj({ ...snackBarObj, toggle: false })
                    }
                    message={`${snackBarObj.msg}`}
                  ></Snackbar>
                </Grid>
              </ListItem>
              <Divider />
            </>
          ))}
        <DeleteDialogSlide
          open={deleteDialog}
          setOpen={setDeleteDialog}
          posts={posts}
          slug={slugChoosen}
          setPosts={setPosts}
          setSnackBarObj={setSnackBarObj}
          snackBarObj={snackBarObj}
        />
      </List>
      {postUpdate !== null && (
        <PostUpadter
          data={postUpdate}
          setData={setPostUpdate}
          posts={posts}
          setPosts={setPosts}
          db={db}
          setSnackBarObj={setSnackBarObj}
          snackBarObj={snackBarObj}
        />
      )}
     </Box>
    </>
  );
};

export default PostList;
