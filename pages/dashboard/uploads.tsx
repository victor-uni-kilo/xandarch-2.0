// FRAMEWORK
import type { NextPage } from "next";
import { server } from "../../utils/db/apiConfig";
import { useEffect, useMemo, useState } from "react";
// COMPONENTS
import ImageManager from "@components/ImageManager";
import ImageUploader from "@components/Forms/ImageUploader/ImageUploader";
// UTILS
import useSWR from "swr";

// RTK STORE
import { wrapper } from "store";
import { setFsFiles } from "store/fsFilesSlice";
// TYPES
import { IFsFilesData, IGetFsFiles } from "types";
// STYLES
import styles from "@styles/Page.module.scss";
import { fetchFsFiles, fsFilesFetcher } from "@utils/fetchers";

interface IUploadPageProps {
  fsFilesSSP: IFsFilesData[];
}

const Uploads: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, isValidating, error } = useSWR<IFsFilesData[]>(
    `${server}/api/db/images`,
    fsFilesFetcher,
  );

  let dbImagePaths: string[] = [];
  // if (!error && !data) setIsLoading(true);
  // if (error) return "Error";

  // 1.compare data
  // 2.append new data > and components...
  // 3.cache
  if (data) {
    console.log("fuu", data);

    // dbImagePaths = data.map(file => `/api/db/images/${file._id.toString()}`);

    //// HOW TO APPEND?
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //// ONE WAY OF PERSISTING IMAGE DATA
  // useEffect(() => {
  //   window.localStorage.setItem("UPLOAD_PAGE_STATE", JSON.stringify(dbImagePaths));
  // }, [data]);

  // useEffect(() => {
  //   const localStorageData = window.localStorage.getItem("UPLOAD_PAGE_STATE");
  //   if (localStorageData !== null) dbImagePaths = JSON.parse(localStorageData);
  // }, []);

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  // const handleDeleteImage = (imageUrl: string) => {};

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>Hello from Uploads</h1>
      <section>
        <ImageUploader />
      </section>

      <section>
        <h2>Images in Storage:</h2>
        <ImageManager urls={dbImagePaths} />
      </section>
    </div>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
//   const fsFilesSSP = await fetchFsFiles();

//   await store.dispatch(setFsFiles(fsFilesSSP));

//   return {
//     props: {
//       fsFilesSSP,
//     },
//   };
// });

export default Uploads;
