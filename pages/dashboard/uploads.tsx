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
import ImageList from "@components/ImageList/ImageList";
import HeadlineDivider from "@components/Divider/HeadlineDivider/HeadlineDivider";
import Typography from "@components/Typography";

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
    // TODO Make Sort function which takes any array and sort chronologicaly (latest, oldest)
    const sortedImagePaths = data.sort(
      (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
    );
    console.log("sortedImages", sortedImagePaths);
    dbImagePaths = sortedImagePaths.map(file => `/api/db/images/${file._id.toString()}`);
  }

  console.log("Uploads:dbImagePath", dbImagePaths);

  ///////////////////////////////////////////////////////////////////

  // const getBlobsFromData = (prevImageList, nextImageList) => {
  // const dbImagePaths = fsFilesSSP.map(file => `/api/db/images/${file._id.toString()}`);
  // };

  return (
    <div className={styles.pageWrapper}>
      <h1>IMAGE UPLOADS</h1>
      <section>
        <HeadlineDivider />
        <Typography elementTag="h2">UPLOAD IMAGES</Typography>
        <ImageUploader />
      </section>

      <section>
        <HeadlineDivider></HeadlineDivider>
        <Typography elementTag="h2">IMAGES IN STORAGE</Typography>
        <ImageList type="display" urls={dbImagePaths} />
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
