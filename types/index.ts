import { Types } from "mongoose";

export type MongooseObjectId = Types.ObjectId;

export interface IPagesMap {
  text: string;
  href: string;
}

export enum LOCALE {
  en = "en-US",
  sr = "sr-RS",
}

export type languageEnum = keyof typeof LOCALE;

export enum CATEGORY_TYPE {
  byService = "byService",
  byType = "byType",
  byStatus = "byStatus",
}

export type categoryType = `${CATEGORY_TYPE}`;

// PROJECT SCHEMAS FOR MONGOOSE
export interface IProjectSchema {
  title: {
    en: string;
    sr: string;
  };
  caption: {
    en: string;
    sr: string;
  };
  description: {
    en: string;
    sr: string;
  };
  area: number;
  projectDate: Date;
  completionDate: Date;
  categories: MongooseObjectId[];
}

export interface ICategorySchema {
  category: {
    en: string;
    sr: string;
  };
  type: categoryType;
}

// MONGOOSE ADDS IDs so...

export interface IProject extends IProjectSchema {
  _id: MongooseObjectId;
}

export interface ICategory extends ICategorySchema {
  _id: MongooseObjectId;
}

//TYPES FOR FRONTEND
export interface IProjectData {
  _id?: MongooseObjectId; //decision pending
  title: {
    en: string;
    sr: string;
  };
  caption: {
    en: string;
    sr: string;
  };
  description: {
    en: string;
    sr: string;
  };
  area: number | null;
  projectDate: Date | null;
  completionDate: Date | null;
  categories: ICategory[];
}

export interface ICategories {
  [CATEGORY_TYPE.byService]: ICategory[];
  [CATEGORY_TYPE.byType]: ICategory[];
  [CATEGORY_TYPE.byStatus]: ICategory[];
}
