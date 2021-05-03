import { useRouter } from "next/router";
import fire from "../../components/firebaseConfig";
import { Container, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import { ImageGallery } from "../../components/utils/imageUtils/imageGallery";
let db = fire.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  galleryImg: {
    borderRadius: "17px",
    maxHeight: "225px",
    border: "1px solid black",
  },
  appBar: {
    position: "relative",
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "42px",
    },
  },
  image: {
    minHeight: "400px",
    objectFit: "cover",
    ". &image-gallery-slide": {
      objectFit: "cover",
    },
  },
  thumbnailImage: {
    maxWidth: "70px",
  },
  galleryPaper: {
    maxWidth: "700px",
    minHeight: "250px",
    background: theme.palette.secondary.main,
  },
}));

export default function Gallery({ galleryData, loading }) {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;
  const galleryDescription = `- ניר הקוסם - אלבום תמונות ${galleryData.title} - ניר קוסם ליום הולדת בכל חלקי הארץ הופעתו מרשימה מצחיקה מהנה ובוודאי שמקצועית באתר זה תוכלו להתרשם הן מהגלריה והן מהתכנים גלישה מהנה`
 

  return (
    <>
      <Layout article title={`ניר הקוסם - אלבום תמונות - ${galleryData.title}`} description={galleryDescription}>
        {loading ? (
          <Container direction="rtl" className={classes.root}>
            <Typography variant="h1" className={classes.title} color="primary.main">
              {galleryData && galleryData.title}
            </Typography>
            <Paper className={classes.galleryPaper}>
              <ImageGallery data={galleryData} classes={classes} />
            </Paper>
          </Container>
        ) : (
          <h1>There is nothing to show...</h1>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const galleryData = await db
    .collection("gallery")
    .doc(query.slug)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      if (!doc.exists) {
        console.log("no such document!");
        return {
          redirect: {
            destination: "/gallery",
            loading: false,
            permanent: false,
          },
        };
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
  return {
    props: {
      loading: true,
      galleryData: galleryData || null,
    },
  };
}

{
  /* //   <h1>{galleryData && galleryData.title}</h1>
          //   <Box className={classes.root}>
          //     <GridList cols={3} className={classes.gridList}>
          //       {galleryData.images.map((tile, key) => (
          //         <GridListTile key={key}>
          //           <img src={tile.src} alt={tile.alt} />
          //         </GridListTile>
          //       ))}
          //     </GridList>
          //   </Box> */
}
