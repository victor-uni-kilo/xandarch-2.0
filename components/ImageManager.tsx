import React, { FC, useEffect } from "react";
import { IFileUploadMap } from "types";

import styles from "./ImageManager.module.scss";

interface IImagePreviewProps {
  urls: IFileUploadMap[] | string[];
  imageCallback?: any;
}

const ImageManager: FC<IImagePreviewProps> = ({ urls, imageCallback }) => {
  return (
    <div className={styles.managerContainer}>
      {urls &&
        urls.map((imageUrl: any, index: number) => {
          return (
            <div className={styles.imageContainer} key={`image-${index}`}>
              <img src={typeof imageUrl === "string" ? imageUrl : imageUrl.localUrl} alt="#" />
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
