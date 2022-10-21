import type { NextPage } from "next";
import { server } from "../../utils/apiConfig";
import { useState, createContext, SetStateAction, Dispatch } from "react";
import styles from "@styles/Uploads.module.scss";
import ProjectTextFields from "@components/Forms/ProjectTextFields/ProjectTextFormFields";
import { FormContext, IProjectData } from "types";
import CategoryPicker from "@components/CategoryPicker/CategoryPicker";
import ImagePicker from "@components/Forms/ImagePicker/ImagePicker";
import { Head } from "next/document";

const Uploads: NextPage<any> = ({ existingImages, existingCategories }) => {
  const [imagesState, setImageState] = useState(existingImages);
  // const [imagesState, setImageState] = useState(existingImages);

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
    <>
      <div className={styles.pageContent}>
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
    </>
  );
};

export default Uploads;

export async function getServerSideProps() {
  const [imagesRes, categoriesRes] = await Promise.all([
    fetch(`${server}/api/db/images`, {
      method: "GET",
    }),
    fetch(`${server}/api/db/categories`, {
      method: "GET",
    }),
  ]);

  const [existingImages, existingCategories] = await Promise.all([
    imagesRes.json(),
    categoriesRes.json(),
  ]);

  // const existingImages: JSON = await fetch(`${server}/api/db/images`, {
  //   method: "GET",
  // }).then(response => response.json());

  try {
    return {
      props: {
        existingImages,
        existingCategories,
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
