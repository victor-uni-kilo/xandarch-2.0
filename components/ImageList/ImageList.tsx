import BasicButton from "@components/Button/BasicButton/BasicButton";
import { BASIC_BUTTON_VARIANT, BUTTON_TYPE } from "@components/Button/types";
import Image from "next/image";
import React, { FC } from "react";
import { IFileUploadMap } from "types";

import styles from "./ImageList.module.scss";

export enum IMAGE_LIST_TYPE {
  upload = "upload",
  display = "display",
}

export type imageListType = `${IMAGE_LIST_TYPE}`;

interface IImagePreviewProps {
  type: imageListType;
  urls: IFileUploadMap[] | string[];
  imageCallback?: any;
}

const ImageList: FC<IImagePreviewProps> = ({ type, urls, imageCallback }) => {
  return (
    <div className={styles.managerContainer}>
      {urls &&
        urls.map((imageUrl: any, index: number) => {
          const source = type === IMAGE_LIST_TYPE.upload ? imageUrl.localUrl : imageUrl;
          if (index <= 7)
            return (
              <div className={styles.imageContainer} key={`image-${index}`}>
                {type === IMAGE_LIST_TYPE.upload && <div></div>}

                <Image className={styles.imageItem} src={source} alt="#" layout="fill" />
                {imageCallback && (
                  <BasicButton
                    type={BUTTON_TYPE.button}
                    variant={BASIC_BUTTON_VARIANT.contained}
                    onClick={() => imageCallback(imageUrl)}
                  >
                    <span>{type === IMAGE_LIST_TYPE.upload ? "Cancel" : "Delete"}</span>
                  </BasicButton>
                )}
              </div>
            );
        })}
    </div>
  );
};

export default ImageList;
