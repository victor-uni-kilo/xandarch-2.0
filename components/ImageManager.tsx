import fetchImage from "@utils/fetchImage";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectfileList } from "store/fsFilesSlice";

import styles from "./ImageManager.module.scss";

interface IImagePreviewProps {
  urls: {}[] | [];
  imageCallback?: any;
}

const ImageManager: FC<IImagePreviewProps> = ({ urls, imageCallback }) => {
  return (
    <div className={styles.managerContainer}>
      {urls &&
        urls.map((imageUrl: any, index: number) => {
          return (
            <div className={styles.imageContainer} key={`image-${index}`}>
              <img src={typeof imageUrl === "string" ? imageUrl : imageUrl.blob} alt="#" />
              <button
                className={styles.tempButton}
                type="button"
                onClick={() => imageCallback(imageUrl)}
              >
                Remove
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default ImageManager;
