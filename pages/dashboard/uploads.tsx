import type { NextPage } from "next";
import { server } from "../../utils/apiConfig";
import { useState } from "react";

import styles from "@styles/Page.module.scss";

const Uploads: NextPage<any> = ({ existingImages }) => {
  const [imagesState, setImageState] = useState(existingImages);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // console.log(JSON.stringify(XYZ));

    const postURL = `${server}/api/db/images/add`; //Our previously set up route in the backend
    fetch(postURL, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/from-data",
      },
      body: JSON.stringify(imagesState.body),
    }).then(res => {
      console.log(res.json());
    });
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>Hello from Uploads</h1>
      <h2>Show Existing Images</h2>
      {/* existingImages... */}
      <h2>Add Images</h2>
      <form
        acceptCharset="UTF-8"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        {/* <ImagePicker context={ProjectFormContext} /> ?????????*/}
        <input type="submit" value="Submit" />
      </form>
      <h2>Show Existing Images</h2>
    </div>
  );
};

export default Uploads;

// export async function getServerSideProps() {
//   const existingImages = await fetch(`${server}/api/db/images`, {
//     method: "GET",
//   }).then(response => response.json());

//   try {
//     return {
//       props: {
//         existingImages,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         notFound: true,
//       },
//     };
//   }
// }
