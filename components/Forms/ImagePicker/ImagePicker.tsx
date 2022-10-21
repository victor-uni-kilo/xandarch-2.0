import { ProjectFormContext } from "pages/dashboard/projects/new";
import { Context, FC, useContext, useState } from "react";
import { FormContext, languageEnum } from "types";

import styles from "./ImagePicker.module.scss";

interface IImagePickerProps {
  context: Context<FormContext>; // not versatile enough
}

const ImagePicker: FC<IImagePickerProps> = ({ context }) => {
  const [contextState, setContextState] = useContext<any>(context);

  const [filesState, setFilesState] = useState<File[] | null>(null); //useModel
  const [imagesArrayState, setImagesArrayState] = useState<string[] | null>(null); //useModel

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      console.log(filesArray);
      setFilesState(filesArray);

      const imagesArray = filesArray.map(file => {
        return URL.createObjectURL(file);
      });

      setImagesArrayState(imagesArray);
    }
  };

  const handleRemove = (image: string) => {
    if (imagesArrayState) {
      setImagesArrayState(imagesArrayState.filter(e => e !== image));
      URL.revokeObjectURL(image);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="file">Image Upload:</label>
        <input
          className={styles.fileInput}
          type="file"
          name="images"
          value=""
          multiple
          onChange={event => handleFileChange(event)}
        />
      </div>

      <div className={styles.previewImages}>
        {imagesArrayState &&
          imagesArrayState.map((image, index) => {
            //previewImageComponent with aditional inputMAYBE?
            return (
              <div key={`image=${index}`}>
                <img src={image}></img>
                <button type="button" onClick={() => handleRemove(image)}>
                  Remove Image
                </button>
                <button type="button">Set As Hero</button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ImagePicker;
