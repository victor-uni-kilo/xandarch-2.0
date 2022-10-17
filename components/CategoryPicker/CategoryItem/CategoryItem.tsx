import { Types } from "mongoose";
import { ProjectFormContext } from "pages/dashboard/projects/new";
import { FC, useContext, useState } from "react";
import { ICategories, ICategory } from "types";
import cx from "classnames";

import styles from "./CategoryItem.module.scss";

interface ICategoryItemProps {
  formStateNode: string;
  categoryObject: ICategory;
}

const CategoryItem: FC<ICategoryItemProps> = ({ formStateNode, categoryObject }) => {
  const [formState, setFormState] = useContext<any>(ProjectFormContext);
  const [isSelected, setIsSelected] = useState(false);

  const handleAdd = (key: string, id: Types.ObjectId) => {
    console.log("ADDING TO PROJECT", key, id);

    // const formStateNodeArray = formState.categories[formStateNode as keyof ICategories];
    const formStateNodeArray = [...formState.categories[formStateNode as keyof ICategories]];

    console.log("formStateNodeArray", formStateNodeArray);

    let newStateArray: ICategory[];

    if (isSelected === false) {
      newStateArray = [...formStateNodeArray, { _id: id }];
    } else if (isSelected === true) {
      newStateArray = formStateNodeArray.filter(item => item._id !== id);
    } else {
      newStateArray = [];
    }

    setFormState({
      ...formState,
      categories: {
        [formStateNode]: newStateArray,
      },
    });

    setIsSelected(!isSelected);
  };

  const toggleActiveClass = { [styles.active]: isSelected };

  return (
    <li className={cx(styles.categoryItem, toggleActiveClass)}>
      <span>
        {`${categoryObject.categoryEN} / ${categoryObject.categorySR}`}
        <button type="button" onClick={() => handleAdd(formStateNode, categoryObject._id)}>
          add/remove
        </button>
      </span>
    </li>

    // <button type="button" onClick={toggleSelect}>
  );
};
export default CategoryItem;
