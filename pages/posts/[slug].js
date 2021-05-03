import { useRouter } from "next/router";
import Link from "next/link";
import fire from "../../components/firebaseConfig";
import { useEffect } from "react";
import { Box, Container, Divider, Typography } from "@material-ui/core";
let db = fire.firestore();
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  articleContainer: {
    paddingRight: 0,
    marginRight: 0,
    ". &MuiContainer-root": {
      paddingRight: 0,
    },
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "42px",
    },
  },
}));
export default function Post({ post }) {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;
  console.log(router)
  // get post from posts!
  useEffect(() => {
    const checkingPost = post;
    if (post.redirect) {
      router.push(post.redirect.destination);
    }
  }, []);

  return !post.redirect ? (
    <>
      <Layout article objTitle={post.metaTitle} title={`ניר הקוסם | ${post.title}`} url={router.asPath}>
        <Head>
          <meta property="og:type" content="article" />
          {post.metaTitle && (
            <meta property="article:section" content={post.metaTitle} />
          )}
          <meta property="article:tag" content={post.title} />
          {post.publishTime && (
            <meta
              property="article:published_time"
              content={post.publishTime}
            />
          )}
          {post.modifyTime && (
            <meta property="article:modified_time" content={post.modifyTime} />
          )}
          <meta name="article:author" content="ניר הקוסם" />
          <meta name="author" content="ניר הקוסם" />
          <meta
            property="article:author"
            content="https://www.facebook.com/pages/%D7%A0%D7%99%D7%A8-%D7%94%D7%A7%D7%95%D7%A1%D7%9D/456380045342"
          />
        </Head>
        <Typography variant="h1" className={classes.title}>
          {post.title}
        </Typography>
        <Container maxWidth="lg" className={classes.articleContainer}>
          <Typography
            component="div"
            variant="body1"
            dangerouslySetInnerHTML={{ __html:  post.body  }}
          ></Typography>
        </Container>
      </Layout>
    </>
  ) : (
    <div>No Post found</div>
  );
}

export async function getServerSideProps({ res, query }) {
  const post = await db
    .collection("posts")
    .doc(query.slug)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      if (!doc.exists) {
        console.log("no such document!");
        res.setHeader("location", "/posts");
        res.statusCode = 302;
        res.end();
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
  return {
    props: {
      post: post || null,
    },
  };
}
