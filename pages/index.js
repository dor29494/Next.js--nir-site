import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";

import { useAuth } from "../AuthProvider";
const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(3),
  },
  articleContainer: {
    paddingRight: 0,
    marginRight: 0,
    ".&MuiContainer-root": {
      paddingRight: 0,
      marginRight: 0,
    },
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "42px",
    },
  },
  titleHolder: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Home({ ssrWorking, randomPage }) {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <>
      {ssrWorking ? (
        <Layout home randomPage={randomPage}>
          <Head>
            <title>{siteTitle}</title>
          </Head>

          <Container maxWidth="md" className={classes.articleContainer}>
            <Typography variant="h1" className={classes.title} mr={2}>
              מי אני?
            </Typography>
            <Typography component="div">
              שמי ניר אוחנה, קוסם ליום הולדת ואומן על-חושי למעלה מ-15 שנה (אפשר
              לומר שמבחינת שנות ניסיון בתחום, יכולתי ללמד את הארי פוטר איזה קסם
              או שניים). את המשיכה שלי לעולם הקסמים גיליתי עוד בנעוריי. בהתחלה
              הופעתי בעיקר במוסדות חינוך, ואת השירות הצבאי העברתי כקוסם הצבאי
              הראשי של חיל החינוך (כן, יש דבר כזה. אפילו בצבא צריכים קצת קסם).{" "}
              <br />
              עם הזמן בניתי מופע ייחודי, שרץ כבר שנים, אבל לובש בכל פעם צורה
              שונה ומתאים עצמו לקהל היעד. תוכלו לפגוש אותי בבתי מלון מובילים
              בארץ, במסיבות, בימי הולדת ובאירועים, לגדולים ולקטנים. וכולם תמיד
              יושבים מרותקים עד שלפעמים קשה להבחין מי ההורים ומי הילדים (זאת
              אומרת, רק קוסמים יכולים). אז יש אירועים רגילים, ויש אירועים
              שמתובלים בהומור ומאתגרים את החושים. <br />
              אם חיפשתם קוסם ליום ההולדת, לברית, לבר המצווה, או לאירוע למבוגרים,
              לחברות ולעסקים – הגעתם לכתובת הנכונה. עבורי, הקשר האישי אתכם מתחיל
              כבר בשיחת הטלפון הראשונה, כי חשוב שכל אירוע יתאים לבעליו. אז קודם
              כל צרו קשר - ויחד נבחר את הכובע המתאים עבורכם.
            </Typography>
            <Typography variant="h5" component="div" mt={4}>
              חמישה טיפים לקוסם המתחיל מקוריות
              <Typography component="p">
                • מקוריות - כמה פעמים אפשר לשלוף שפן מתוך כובע? הטריק הזה מזמן
                מיצה את עצמו. כל פנטזיה מטורפת יכולה להפוך למציאות אם רק נותנים
                לה את הטוויסט הנכון.
                <br />
                • חוש הומור - מופע טוב הוא מופע מצחיק וסוחף. הומור שנון מתחיל
                כבר משלב כתיבת המופע, אבל קוסם טוב הוא גם מי שמאלתר טוב ולא נצמד
                רק למה שמוכן מראש.
                <br />
                • סבלנות - גם מי שנולד עם קסם בין האצבעות, צריך לעבוד קשה עד
                שהוא לומד לתפעל את היכולת הזו. אף אחד לא נהיה מומחה ביום אחד,
                אבל הסבלנות וההשקעה תמיד משתלמות.
                <br />
                • חיבור לקהל - מומלץ להתאים את התוכן לקהל הייעודי של כל מופע,
                ותמיד לשאול-מה הערך המוסף של מה שבחרתי
                <br />
                • אסתטיקה ונקיון - קוסם מבולגן ומפוזר הוא קצת כמו ליצן. אבל קוסם
                אמיתי ומקצועי דואג לשמור על סביבת עבודה "מתוקתקת" ונעימה לעין,
                זה הרבה יותר מרשים..
                <br />
              </Typography>
            </Typography>
          </Container>
        </Layout>
      ) : (
        <h2>SSR not working</h2>
      )}
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: { ssrWorking: true, randomPage: Math.floor(Math.random() * 95) + 1 },
  };
}
