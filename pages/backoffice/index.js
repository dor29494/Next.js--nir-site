import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { firebase } from "../../public/app";
import { firebaseAdmin } from "../../firebaseAdmin";
import EditIcon from "@material-ui/icons/Edit";
import {
  Box,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";
import PostUpadter from "../../components/utils/postUtils/PostUpdater";
import fire from "../../components/firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";
import PostList from "../../components/view/PostList";
import Imagelist from "../../components/view/Imagelist";
import SwitchTabs from "../../components/view/SwitchTabs";
let db = fire.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function BackOffice({ posts, images }) {
  const classes = useStyles();
  const [allPosts, setAllPosts] = useState(posts);
  const [allImages, setAllImages] = useState(images);

  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <SwitchTabs
        postList={<PostList posts={allPosts} setPosts={setAllPosts} />}
        imageList={<Imagelist images={allImages} setImages={setAllImages} />}
      />
    </Box>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    // the user is authenticated!
    const { uid, email } = token;

    // FETCH STUFF HERE!! 🚀
    // fething posts

    //images fethcing
    const imgArr = [];
    const images = await db
      .collection("gallery")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          imgArr.push(doc.data());
          console.log("image loaded");
        });
        return imgArr;
      })
      .catch((error) => {
        console.log("Error", error);
      });

    // post fethcing
    const postArr = [];
    const posts = await db
      .collection("posts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          postArr.push(doc.data());
        });
        return postArr;
      })
      .catch((error) => {
        console.log("Error", error);
      });
    return {
      props: {
        message: `Your email is ${email} and your UID is ${uid}.`,
        posts: postArr,
        images: imgArr,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
};
