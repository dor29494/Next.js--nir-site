import { useRouter } from "next/router";
import fire from "../../components/firebaseConfig";
import {
  Container,
  Typography,
  Paper,
  IconButton,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import { ImageGallery } from "../../components/utils/imageUtils/imageGallery";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
let db = fire.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },

  galleryImg: {
    borderRadius: "17px",
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
    background: theme.palette.background.default,
  },
}));

export default function Contact() {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <Layout>
        <Grid container direction="column" justify="space-between" mt={5}>
          <Grid item xs={12}>
            <Typography variant="h1" align="center" className={classes.title}>
              צרו קשר
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="sm" className={classes.articleContainer}>
              <Typography align="center" varaint="p">
                צרו איתי קשר באחת הפלטפורמות הבאות <br/>
                מבטיח לחזור בהקדם!
              </Typography>
            </Container>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>

            <a target="_blank" href="http://api.whatsapp.com/send?phone=+972523282947">
            <IconButton>
              <WhatsAppIcon />
            </IconButton>
              </a>
            <a target="__blank" href="https://www.facebook.com/profile.php?id=100063562833113">
            <IconButton>
              <FacebookIcon />
            </IconButton>
            </a>
            <a target="__blank" href="https://www.instagram.com/ohananir">
            <IconButton>
              <InstagramIcon />
            </IconButton>
              </a>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
