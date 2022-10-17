import React, { FC, useContext, useRef, useState } from "react";
import cx from "classnames";
import { CATEGORY_TYPE, ICategories, ICategory } from "types";
import styles from "./CategoryPicker.module.scss";
import { Types } from "mongoose";
import { ProjectFormContext } from "pages/dashboard/projects/new";
import CategoryItem from "./CategoryItem/CategoryItem";

interface ICategoryPickerProps {
  allCategories: ICategory[];
}

const CategoryPicker: FC<ICategoryPickerProps> = ({ allCategories }) => {
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
          console.log("Invalid Category Type");
          break;
      }
    });
  };

  sortCategories(allCategories);

  console.log("sortedCategories", sortedCategories);

  return (
    <div>
      <h3>Hello from All Categories Component</h3>
      {Object.keys(sortedCategories).map(key => {
        console.log("keyOF TS", sortedCategories[key as keyof ICategories]);

        return (
          <div key={key}>
            <h3>{key}</h3>
            {sortedCategories[key as keyof ICategories].map((item, index) => (
              <CategoryItem key={`${key}-${index}`} formStateNode={key} categoryObject={item} />
            ))}
            <p>Create Category</p>
          </div>
        );
      })}
      {/* <div className="listContainer">
        {this.state.byService && (
          <ul>
            {this.state.byService.map((category, index) => {
              return (
                <li key={`byService-${index}`}>
                  <div className="categoryTab">
                    <span>{`${category.categoryEN}/${category.categorySR}`}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="listContainer"></div>
      <div className="listContainer"></div>
      <p>{this.state.byService[0].categoryEN}</p> */}
    </div>
  );
};

export default CategoryPicker;
