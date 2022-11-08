import type { NextPage } from "next";
import { server } from "../../utils/db/apiConfig";
import { ChangeEvent, useEffect, useState } from "react";

import { IFsFilesData } from "types";

import ImageManager from "@components/ImageManager";
import styles from "@styles/Page.module.scss";
import { wrapper } from "store";
import { setFsFiles } from "store/fsFilesSlice";
import { useRouter } from "next/router";
import { useFsFilesImages } from "@utils/swr";
import { fetchAllImagesSWR, fetchImageUrl } from "@utils/swr/fetchers/fetchImage";

interface IUploadPageProps {
  fsFiles: string[];
}

const Uploads: NextPage<IUploadPageProps> = ({ fsFiles }) => {
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [selectedImagesUrl, setSelectedImagesUrl] = useState<{}[]>([]);
  const [formDataState, setFormDataState] = useState<FormData>(new FormData());

  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // const { user, isLoading, isError } = useFsFilesImages();

  // if (isLoading) return "isLoading...";
  // if (isError) return "Error";

  const refreshData = async () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
    console.log("DATA IS REFRESHING (I supose)");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const successStatus = await fetch(`${server}/api/db/images/add`, {
      method: "POST",
      body: formDataState,
    }).then(res => res.status);

    if (successStatus < 300) {
      refreshData();
    }
    setFormDataState(new FormData());
  };

  useEffect(() => {
    setIsRefreshing(false);

    setImagesUrl(fsFiles);
  }, []);

  ///// HANDLERS /////
  const enableChange = (event: any) => {
    event.target.value = null;
  };

  const handleChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const formData = formDataState;
    let imagesArray: {}[];

    if (selectedFiles) {
      imagesArray = Array.from(selectedFiles).map(file => {
        //// Create same keys for formData and SelectedImages;
        const fileIndexId = "id" + Math.random().toString(16).slice(2);
        const blob = URL.createObjectURL(file);
        formData.append(fileIndexId, file);

        return { fileIndexId: fileIndexId, blob: blob };
      });

      setFormDataState(formData);
      setSelectedImagesUrl(previousImages => previousImages.concat(imagesArray));
    }
  };

  const handleCancelImageUpload = (imageUrl: any) => {
    const formData = formDataState;
    formData.delete(imageUrl.fileIndexId);

    setFormDataState(formData);
    setSelectedImagesUrl(selectedImagesUrl.filter(url => url != imageUrl));
  };

  const handleCancelUpload = () => {
    setFormDataState(new FormData());
    setSelectedImagesUrl([]);
  };

  //////////////////////////////////////
  // const handleDeleteImage = (imageUrl: string) => {};

  /////////////////////////////////////

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>Hello from Uploads</h1>

      <section>
        <h2>Add Images {isRefreshing ? "REFRESHING" : "NOT REFRESHING"}</h2>

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
          <button onClick={handleCancelUpload}>Clear</button>
          <input type="submit" value="Submit" />
        </form>

        <h2>Preview Images</h2>
        <ImageManager urls={selectedImagesUrl} imageCallback={handleCancelImageUpload} />
      </section>

      <section>
        <h2>Images in Storage:</h2>

        <ImageManager urls={imagesUrl} />
      </section>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  const fsFiles = await fetchAllImagesSWR();

  await store.dispatch(setFsFiles(fsFiles)); // Not Using it right now

  return {
    props: {
      fsFiles,
    },
  };
});

// export const getServerSideProps = async () => {
//   const fsFiles = await fetchAllImagesSWR();

//   // await store.dispatch(setFsFiles(fsFiles)); // Not Using it right now

//   return {
//     props: {
//       fsFiles,
//     },
//   };
// };

export default Uploads;
