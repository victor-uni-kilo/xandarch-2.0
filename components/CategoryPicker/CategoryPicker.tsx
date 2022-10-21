import React, { FC, useContext, useRef, useState } from "react";
import cx from "classnames";
import { CATEGORY_TYPE, ICategories, ICategory } from "types";
import styles from "./CategoryPicker.module.scss";
import CategoryItem from "./CategoryItem/CategoryItem";

interface ICategoryPickerProps {
  existingCategories: ICategory[];
}

const CategoryPicker: FC<ICategoryPickerProps> = ({ existingCategories }) => {
  // DOMPONENT MOUNTS CHECKING ADDED AND SETTING ACTIVE OR INACTIVE BUTTON STATE
  let sortedCategories: ICategories = {
    byService: [],
    byType: [],
    byStatus: [],
  };

  const sortCategories = (categories: ICategory[]) => {
    categories.forEach(category => {
      switch (category.type) {
        case CATEGORY_TYPE.byService:
          sortedCategories.byService.push(category);
          break;
        case CATEGORY_TYPE.byType:
          sortedCategories.byType.push(category);
          break;
        case CATEGORY_TYPE.byStatus:
          sortedCategories.byStatus.push(category);
          break;
        default:
          sortedCategories;
          break;
      }
    });
  };

  sortCategories(existingCategories);

  return (
    <div>
      <h3>Hello from All Categories Component</h3>
      {Object.keys(sortedCategories).map(key => {
        return (
          <div key={key}>
            <h3>{key}</h3>
            {sortedCategories[key as keyof ICategories].map((item, index) => (
              <CategoryItem key={`category-${index}`} categoryObject={item} />
            ))}
            <p>(Add New Category)</p>
            createcomponent
            {/* <h2>Add Categories</h2>
          <label htmlFor="english">Title:</label>
          <input
            type="text"
            name="english"
            // onChange={event => handleInput(event)}
          />
          <label htmlFor="serbian">Title:</label>
          <input
            type="text"
            name="serbian"
            // onChange={event => handleInput(event)}
          />
          <label htmlFor="categoryType">Title:</label>
          <input
            type="select"
            name="categoryType"
            // onChange={event => handleInput(event)}
          /> */}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPicker;
