import Head from "next/head";
export const siteTitle =
  "ניר הקוסם | קוסם ליום הולדת | הפעלת ימי הולדת | יום הולדת לילדים | אטראקציה לאירוע | מסיבות ברית בריתה";
const homeDescription =
  "ניר הקוסם | קוסם ליום הולדת | הפעלת ימי הולדת | יום הולדת לילדים | אטראקציה לאירוע | מסיבות ברית בריתה - ניר- קוסם ליום הולדת בכל חלקי הארץ הופעתו מרשימה מצחיקה מהנה ובוודאי שמקצועית באתר זה תוכלו להתרשם הן מהגלריה והן מהתכנים גלישה מהנה";
const siteURL = "http://localhost:3000";
const homeKeyWords =
  "קוסם, קוסם למבוגרים, קוסם לילדים, קוסם לאירועים, אמן אשליה,ניר הקוסם, bhr veuxo,";
export default function Layout({
  children,
  home,
  article,
  url,
  title,
  description,
  keywords,
  objTitle,
}) {
  return (
    <>
      <Head>
        <title>{title ? title : siteTitle}</title>
        <meta
          name="description"
          content={description ? description : homeDescription}
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:site_name" content="ניר הקוסם" />
        <meta property="og:locale" content="he_IL" />
        <meta name="og:title" content={article ? title : siteTitle} />
        <meta name="keywords" content={article ? keywords : homeKeyWords} />
        <meta name="og:url" content={url ? `${siteURL}${url}` : siteURL} />
        <meta
          name="og:description"
          content={
            "ניר- קוסם ליום הולדת בכל חלקי הארץ הופעתו מרשימה מצחיקה מהנה ובוודאי שמקצועית באתר זה תוכלו להתרשם הן מהגלריה והן מהתכנים גלישה מהנה"
          }
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dscloud/image/upload/v1619960472/nir-gallery/p6wvyokyivoxpa4nn54g.jpg"
        />
        <meta name="og:type" content="website" />
      </Head>

      <main>{children}</main>
    </>
  );
}
