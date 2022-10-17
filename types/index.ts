import { Types } from "mongoose";

export interface IPagesMap {
  text: string;
  href: string;
}

export enum LOCALE {
  en = "en-US",
  sr = "sr-RS",
}

export enum CATEGORY_TYPE {
  byService = "byService",
  byType = "byType",
  byStatus = "byStatus",
}

//TYPES FOR FORMS
export interface IProjectForm {
  projectTextEN: IProjectTextSchema;
  projectTextSR: IProjectTextSchema;
  area: number | null;
  projectDate: Date | null;
  completionDate: Date | null;
  categories: ICategories;
}

export interface ICategoriesForm {
  [CATEGORY_TYPE.byService]: ICategorySchema[];
  [CATEGORY_TYPE.byType]: ICategorySchema[];
  [CATEGORY_TYPE.byStatus]: ICategorySchema[];
}

// PROJECT SCHEMAS FOR MONGOOSE
export interface IProjectSchema {
  projectTextEN: Types.ObjectId;
  projectTextSR: Types.ObjectId;
  area: number;
  projectDate: Date;
  completionDate: Date;
  categories: {
    [CATEGORY_TYPE.byService]: Types.ObjectId[];
    [CATEGORY_TYPE.byType]: Types.ObjectId[];
    [CATEGORY_TYPE.byStatus]: Types.ObjectId[];
  };
}

export interface IProjectTextSchema {
  title: string;
  caption: string;
  description: string;
}

export interface ICategorySchema {
  categoryEN: string;
  categorySR: string;
  type: string;
}

// MONGOOSE ADDS IDs so...
export interface IProject {
  _id: Types.ObjectId;
  projectTextEN: IProjectText;
  projectTextSR: IProjectText;
  area: number | null;
  projectDate: Date | null;
  completionDate: Date | null;
  categories: ICategories;
}

export interface ICategories {
  [CATEGORY_TYPE.byService]: ICategory[];
  [CATEGORY_TYPE.byType]: ICategory[];
  [CATEGORY_TYPE.byStatus]: ICategory[];
}

export interface IProjectText extends IProjectTextSchema {
  _id: Types.ObjectId;
}

export interface ICategory extends ICategorySchema {
  _id: Types.ObjectId;
}
