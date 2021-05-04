import { useState, useEffect } from "react";
import React from "react";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  galleryImg: {
    borderRadius: "17px",
    maxHeight: "190px",
    minHeight: "180px",
    border: "1px solid black",
  },
  imageListItem: {
    "&.MuiImageListItem-root": {
      minHeight: "100%",
    },
  },
}));

export const ImageGallery = ({ data }) => {
  const [imagesArr, setImagesArr] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    if (data.images.length > 0) {
      setImagesArr(
        data.images.map((imgObj, key) => ({
          src: imgObj.src,
          alt: imgObj.alt,
        }))
      );
    }
  }, []);
  return (
    <>
      <ImageList>
        {imagesArr.map((image, key) => (
          <a href={image.src} target="__blank">
            <ImageListItem key={key} className={classes.imageListItem}>
              <img
                className={classes.galleryImg}
                srcSet={image.src}
                onError={() => "https://i.ibb.co/S7GGh4L/alt-img.png"}
                alt={image.alt}
                loading="lazy"
              />
            </ImageListItem>
          </a>
        ))}
      </ImageList>
    </>
  );
};
