import Link from "next/link";
import React, { FC, useState } from "react";
import cx from "classnames";
import { CATEGORY_TYPE } from "types";
import styles from "./AllCategories.module.scss";
import { server } from "@utils/apiConfig";

interface IAllCategories {}

const AllCategories: FC<any> = ({ categories }) => {
  return (
    <div className={styles.wrapper}>
      {categories &&
        categories.map((category: any, index: number) => {
          if (category.type === CATEGORY_TYPE.byService) {
            <div>
              byService
              <div className={styles.categoryContainer}>
                <p>{category.categoryEN}</p>
                <p>{category.categorySR}</p>
              </div>
            </div>;
          }
        })}

      <div>byType</div>
      <div>byStatus</div>
    </div>
  );
};

export default AllCategories;

export async function getServerSideProps() {
  const categories: JSON = await fetch(`${server}/api/db/categories/add`, {
    method: "GET",
  }).then(response => response.json());

  console.log("Alo kategoriz? ", categories);

  try {
    return {
      props: {
        categories,
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
