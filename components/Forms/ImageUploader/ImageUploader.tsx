import BasicButton from "@components/Button/BasicButton/BasicButton";
import DropFileButton from "@components/Button/DropFileButton/DropFileButton";
import { BASIC_BUTTON_VARIANT, BUTTON_TYPE } from "@components/Button/types";
import ImageList from "@components/ImageList/ImageList";
import { server } from "@utils/db/apiConfig";
import { fsFilesFetcher } from "@utils/fetchers";
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { IFileUploadMap, IFsFilesData } from "types";

import styles from "./ImageUploader.module.scss";

const ImageUploader: FC = () => {
  const [selectedImagesData, setSelectedImagesData] = useState<IFileUploadMap[]>([]);
  const [formDataState, setFormDataState] = useState<FormData>(new FormData());

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = (event: ChangeEvent<HTMLInputElement>, files: any) => {
    const selectedFiles = files;
    console.log("selectedFiles", selectedFiles);
    const formData = formDataState;
    let fileMapsArray: IFileUploadMap[];

    if (selectedFiles) {
      fileMapsArray = Array.from(selectedFiles).map((file: any) => {
        const formDataId = "id" + Math.random().toString(16).slice(2);
        const localUrl = URL.createObjectURL(file);
        formData.append(formDataId, file);

        return { formDataId: formDataId, localUrl: localUrl };
      });

      setFormDataState(formData);
      setSelectedImagesData(previousImages => previousImages.concat(fileMapsArray));
    }
  };

  const handleCancelImageUpload = (imageUrl: any) => {
    const formData = formDataState;
    formData.delete(imageUrl.formDataId);

    setFormDataState(formData);
    setSelectedImagesData(selectedImagesData.filter(url => url != imageUrl));
  };

  const handleClearUpload = () => {
    setFormDataState(new FormData());
    setSelectedImagesData([]);
  };

  const handleSubmit = async (event: any) => {
    // event.preventDefault();

    await fetch(`${server}/api/db/images/add`, {
      method: "POST",
      body: formDataState,
    }).then(res => res.json());

    handleClearUpload();
  };

  useEffect(() => {
    console.log("IMAGE UPLOADER DID MOUNT");
  }, []);

  return (
    <>
      <form
        acceptCharset="UTF-8"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className={styles.buttonGroup}>
          <BasicButton
            type={BUTTON_TYPE.button}
            variant={BASIC_BUTTON_VARIANT.outlined}
            onClick={handleClearUpload}
          >
            <span>Clear</span>
          </BasicButton>

          <BasicButton type={BUTTON_TYPE.submit} variant={BASIC_BUTTON_VARIANT.contained}>
            <span>Upload</span>
          </BasicButton>
        </div>
        <div className={styles.imagePreview}>
          <DropFileButton handleChooseFile={handleChooseFile} />
          <ImageList
            type="upload"
            urls={selectedImagesData}
            imageCallback={handleCancelImageUpload}
          />
        </div>
      </form>
    </>
  );
};

export default ImageUploader;
