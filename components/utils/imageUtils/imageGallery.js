import { useState, useEffect } from "react";
import React from "react";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

export const ImageGallery = ({ data, classes }) => {
  const [imagesArr, setImagesArr] = useState([]);

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
        {imagesArr.map((image,key) => (
            <a href={image.src} target="__blank">
          <ImageListItem key={key}>
            <img
              className={classes.galleryImg}
              srcSet={`${image.src}?w=248&fit=crop&auto=format 1x,
          ${image.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
