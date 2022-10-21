import { ProjectionElementType, Types } from "mongoose";
import { Dispatch, SetStateAction } from "react";

export type MongooseObjectId = Types.ObjectId;

export enum SITE_AREA {
  presentation = "presentation",
  cms = "cms",
}

export interface IPagesMap {
  text: string;
  href: string;
}

export enum LOCALE {
  en = "en-US",
  sr = "sr-RS",
}

export type languageEnum = keyof typeof LOCALE;

export enum MYME_TYPE {
  jpeg = "image/jpeg", // | "image/jpg"?
  png = "image/png",
  bmp = "image/bmp",
  svg = "image/svg+xml", // maybe NOT
}

export type mimeType = `${MYME_TYPE}`;

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
  projectImages: MongooseObjectId[];
  heroImage: MongooseObjectId;
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
  caption?: {
    en: string;
    sr: string;
  };
  description?: {
    en: string;
    sr: string;
  };
  area?: number | null;
  projectDate?: Date | null;
  completionDate?: Date | null;
  // doubleCheckTHIS
  categories?: ICategory[];
  projectImages?: IImage[];
  heroImage?: IImage | null;
}

export interface ICategories {
  [CATEGORY_TYPE.byService]: ICategory[];
  [CATEGORY_TYPE.byType]: ICategory[];
  [CATEGORY_TYPE.byStatus]: ICategory[];
}
//////////////////////////////////////////////
//???????????????????????????????????????????
export interface IImage {
  _id?: MongooseObjectId;
  name: string;
  alt: string;
  file: MongooseObjectId; //reference to the image
  // mimetype: MIMEenumTYPE
}
//////////////////////////////////////////////

//CONTEXT TYPES
export interface IPageStaticProps {
  projectTitle: string;
}

export type FormContext = [IProjectData, Dispatch<SetStateAction<IProjectData>>] | null;
export type PageTitle = string;
export type LayoutContext = [PageTitle, Dispatch<SetStateAction<PageTitle>>] | null;
