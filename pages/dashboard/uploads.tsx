// FRAMEWORK
import type { NextPage } from "next";
import { useState } from "react";
// COMPONENTS
import ImageUploader from "@components/Forms/ImageUploader/ImageUploader";
// UTILS
import useSWR from "swr";

// RTK STORE
import { wrapper } from "store";
// TYPES
import { IFsFilesData, IGetFsFiles } from "types";
// STYLES
import styles from "@styles/Page.module.scss";
import { server } from "@utils/db/apiConfig";
import { fetchFsFiles, fsFilesFetcher } from "@utils/fetchers";
import { setFsFiles } from "store/fsFilesSlice";
import ImageManager from "@components/ImageManager";

interface IUploadPageProps {
  fsFilesSSP: IFsFilesData[];
}

const Uploads: NextPage<IUploadPageProps> = ({ fsFilesSSP }) => {
  // SWR IMPLEMENTATION
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, isValidating, error } = useSWR<IFsFilesData[]>(
    `${server}/api/db/images`,
    fsFilesFetcher,
    // {
    //   initialData: fsFilesSSP,
    // },
  );

  let dbImagePaths: string[] = [];
  // if (!error && !data) setIsLoading(true);
  // if (error) return "Error";

  // 1.compare data
  // 2.append new data > and components...
  // 3.cache
  if (data) {
    console.log("fuu", data);

    dbImagePaths = data.map(file => `/api/db/images/${file._id.toString()}`);
  }

  console.log("Uploads:dbImagePath", dbImagePaths);

  ///////////////////////////////////////////////////////////////////

  // const getBlobsFromData = (prevImageList, nextImageList) => {
  // const dbImagePaths = fsFilesSSP.map(file => `/api/db/images/${file._id.toString()}`);
  // };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>Hello from Uploads:</h1>
      <section>
        <h2>Add Images</h2>
        <ImageUploader />
      </section>

      <section>
        <h2>Images in Storage:</h2>
        <ImageManager urls={dbImagePaths} />
      </section>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  const fsFilesSSP = await fetchFsFiles();

  await store.dispatch(setFsFiles(fsFilesSSP));
  console.log("SSP - store", store);

  return {
    props: {
      fsFilesSSP,
    },
  };
});

export default Uploads;
