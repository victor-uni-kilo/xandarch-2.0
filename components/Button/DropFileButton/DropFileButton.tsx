import React, { FC, MouseEventHandler, useRef, useState } from "react";
import cx from "classnames";

import Button from "@components/Button";
import Typography from "@components/Typography";

import { BASIC_BUTTON_VARIANT, buttonType, buttonVariant, BUTTON_TYPE } from "../types";
import SvgComponent, { ISvgComponentProps } from "@components/SvgComponent/SvgComponent";
import buttonShape from "../../../public/shapes/buttonShape.svg";

import styles from "./DropFileButton.module.scss";
import BasicButton from "../BasicButton/BasicButton";

interface IDropFileButtonProps {
  className?: string;
  icon?: FC<ISvgComponentProps>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  handleChooseFile: any;
}

const DropFileButton: FC<IDropFileButtonProps> = ({ className, icon, handleChooseFile }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => {
    containerRef.current && containerRef.current.classList.add(styles.dragover);
    console.log("onDragEnter");
  };
  const onDragLeave = () => {
    containerRef.current && containerRef.current.classList.remove(styles.dragover);
    console.log("onDragLeave");
  };

  const enableChange = (event: any) => {
    event.target.value = null;
  };

  const stopReload = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleOnChange = (event: any) => {
    stopReload(event);
    handleChooseFile(event, event.currentTarget.files);
  };

  // create function for ondrag image upload
  const handleOnDrop = (event: any) => {
    stopReload(event);
    handleChooseFile(event, event.dataTransfer.files);
  };

  return (
    <div
      ref={containerRef}
      className={styles.dropFileInput}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={stopReload}
      onDrop={handleOnDrop}
    >
      <div className={styles.fileInput}>
        <label htmlFor="images">Upload Images: </label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleOnChange}
          onClick={enableChange}
          ref={fileInputRef}
        />
      </div>
      <BasicButton
        type={BUTTON_TYPE.button}
        variant={BASIC_BUTTON_VARIANT.contained}
        onClick={() => {
          fileInputRef.current && fileInputRef.current.click();
        }}
      >
        <span>Select Images</span>
      </BasicButton>
    </div>
  );
};

export default DropFileButton;
