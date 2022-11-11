import ImageManager from "@components/ImageManager";
import { server } from "@utils/db/apiConfig";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { IFileUploadMap } from "types";

const ImageUploader: FC = () => {
  const [selectedImagesData, setSelectedImagesData] = useState<IFileUploadMap[]>([]);
  const [formDataState, setFormDataState] = useState<FormData>(new FormData());

  const enableChange = (event: any) => {
    event.target.value = null;
  };

  const handleChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const formData = formDataState;
    let fileMapsArray: IFileUploadMap[];

    if (selectedFiles) {
      fileMapsArray = Array.from(selectedFiles).map(file => {
        //// Create same keys for formData and SelectedImages;
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
      <h2>Add Images</h2>
      <form
        acceptCharset="UTF-8"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="images">Upload Images: </label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/png image/jpeg image/gif image/webp"
            onChange={handleChooseFile}
            onClick={enableChange}
          />
        </div>
        <button onClick={handleClearUpload}>Clear</button>
        <input type="submit" value="Submit" />
      </form>

      <h2>Preview Images</h2>
      <ImageManager urls={selectedImagesData} imageCallback={handleCancelImageUpload} />
    </>
  );
};

export default ImageUploader;
