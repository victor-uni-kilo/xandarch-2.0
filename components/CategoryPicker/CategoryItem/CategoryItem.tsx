import { Types } from "mongoose";
import { ProjectFormContext } from "pages/dashboard/projects/new";
import { FC, useContext, useState } from "react";
import { ICategory } from "types";
import cx from "classnames";

import styles from "./CategoryItem.module.scss";

interface ICategoryItemProps {
  categoryObject: ICategory;
}

const CategoryItem: FC<ICategoryItemProps> = ({ categoryObject }) => {
  const [formState, setFormState] = useContext<any>(ProjectFormContext);
  const [isSelected, setIsSelected] = useState(false);

  const handleAdd = (id: Types.ObjectId) => {
    console.log("ADDING TO PROJECT", id);
    const formStateCategories = [...formState.categories];

    let newStateArray: ICategory[];

    if (isSelected === false) {
      newStateArray = [...formStateCategories, { _id: id }];
    } else {
      newStateArray = formStateCategories.filter(item => item._id !== id);
    }

    setFormState({ ...formState, categories: newStateArray });
    setIsSelected(!isSelected);
  };

  const toggleActiveClass = { [styles.active]: isSelected };

  return (
    <li className={cx(styles.categoryItem, toggleActiveClass)}>
      <span>
        {`${categoryObject.category.en} / ${categoryObject.category.sr}`}
        <button type="button" onClick={() => handleAdd(categoryObject._id)}>
          add/remove
        </button>
      </span>
    </li>

    // <button type="button" onClick={toggleSelect}>
  );
};
export default CategoryItem;
