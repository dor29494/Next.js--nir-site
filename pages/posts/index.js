import fire from "../../components/firebaseConfig";
let db = fire.firestore();
import Link from "next/link";
import { Button, Grid, Typography } from "@material-ui/core";

export default function index({ posts }) {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">כל הכתבות</Typography>
        </Grid>
        {posts.map((post, i) => (
          <Grid item xs={8}>
            <Link as={`/posts/${post.slug}`} href={`/posts/${post.slug}`}>
              <Button>{post.title}</Button>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export async function getStaticProps() {
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
      posts: posts || null,
    },
  };
}
