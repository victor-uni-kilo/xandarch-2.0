import type { NextPage } from "next";
import { server } from "../../utils/apiConfig";
import { useEffect, useState } from "react";

import styles from "@styles/Page.module.scss";

const Uploads: NextPage<any> = ({ fsFiles }) => {
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  const fetchImage = async (id: string) => {
    const imageBlob = await fetch(`${server}/api/db/images/${id}`).then(res => res.blob());
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
  };

  const imageIds = fsFiles.map((file: any) => fetchImage(file._id));

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();

  //   // console.log(JSON.stringify(XYZ));

  //   const postURL = `${server}/api/db/images/add`; //Our previously set up route in the backend
  //   fetch(postURL, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/from-data",
  //     },
  //     body: JSON.stringify(imagesState.body),
  //   }).then(res => {
  //     console.log(res.json());
  //   });
  // };

  useEffect(() => {
    Promise.all(imageIds).then(blobs => {
      setImagesUrl(blobs);
    });
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>Hello from Uploads</h1>
      <h2>Show Existing Images</h2>
      {imagesUrl &&
        imagesUrl.map((imageUrl, index) => {
          return (
            <div key={`image-${index}`}>
              <img height="100px" width="auto" src={imageUrl} alt="icons" />
            </div>
          );
        })}
      <h2>Add Images</h2>
      <form
        acceptCharset="UTF-8"
        method="POST"
        encType="multipart/form-data"
        // onSubmit={handleSubmit}
      >
        {/* <ImagePicker context={ProjectFormContext} /> ?????????*/}
        <input type="submit" value="Submit" />
      </form>
      <h2>Show Existing Images</h2>
    </div>
  );
};

export default Uploads;

export async function getServerSideProps() {
  const fsFiles = await fetch(`${server}/api/db/images`, {
    method: "GET",
  }).then(response => response.json());

  try {
    return {
      props: {
        fsFiles,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        notFound: true,
      },
    };
  }
}
