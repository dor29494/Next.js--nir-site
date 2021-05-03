import fire from "../../components/firebaseConfig";
let db = fire.firestore();
import Link from "next/link";
import Layout from "../../components/layout";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.gallery,
    [theme.breakpoints.up("md")]: {
      margin: "3px",
      maxWidth: 345,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "70%",
      margin: "auto",
    },
  },
  button:{
    color: theme.palette.background.paper,
    fontSize: "16px",
    fontFamily: "Assistant"
  },
}));

export default function index({ images }) {
  const classes = useStyles();

  return (
    <>
    <Layout article title={"ניר הקוסם | גלריות"}>
      <Grid container mt={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h1">כל הגלריות</Typography>
        </Grid>
        {images.map((gallery, i) => (
          <Grid item xs={12} md={4} classes={classes.galleryGridItem} mb={2}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={gallery.images[0].src}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom fontSize="24px" variant="subtitle2" component="h2">
                    {gallery.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link href={`/gallery/${gallery.slug}`}>
                  <Button className={classes.button}>
                    לצפייה
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Layout>
    </>
  );
}

export async function getStaticProps({ query }) {
  const imageArr = [];
  const images = await db
    .collection("gallery")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        imageArr.push(doc.data());
      });
      return imageArr;
    })
    .catch((error) => {
      console.log("Error", error);
    });
  return {
    props: {
      images: images || null,
    },
  };
}
