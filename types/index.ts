import { ProjectionElementType, Types } from "mongoose";
import { Dispatch, SetStateAction } from "react";

export type MongooseObjectId = Types.ObjectId;

export enum SITE_AREA {
  presentation = "presentation",
  cms = "cms",
}

export type siteAreaEnum = `${SITE_AREA}`;

export interface IBilingualObject {
  en: string;
  sr: string;
}

export interface IPagesMap {
  text: IBilingualObject;
  href: string;
}

export interface IDashboardPagesMap {
  text: string;
  href: string;
}

export enum LOCALE {
  en = "en",
  sr = "sr",
}

export type localeEnum = `${LOCALE}`;

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
  title: IBilingualObject;
  caption: IBilingualObject;
  description: IBilingualObject;
  area: number;
  projectDate: Date;
  completionDate: Date;
  categories: MongooseObjectId[];
  projectImages: MongooseObjectId[];
  heroImage: MongooseObjectId;
}

export interface ICategorySchema {
  text: {
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
  title: IBilingualObject;
  caption: IBilingualObject;
  description: IBilingualObject;
  area?: number | null;
  projectDate?: Date | null;
  completionDate?: Date | null;
  // doubleCheckTHIS
  categories?: ICategory[];
  projectImages?: IImage[];
  heroImage?: IImage | null;
}

export interface IImage {
  _id: MongooseObjectId;
  alt?: string;
  filename?: string;
  // caption: string;
}

export interface ICategories {
  [CATEGORY_TYPE.byService]: ICategory[];
  [CATEGORY_TYPE.byType]: ICategory[];
  [CATEGORY_TYPE.byStatus]: ICategory[];
}
//////////////////////////////////////////////
//???????????????????????????????????????????
export interface IFsFilesData {
  _id: MongooseObjectId;
  length: number;
  chunkSize: number;
  uploadDate: Date;
  filename: string;
}
//////////////////////////////////////////////

//CONTEXT TYPES
export interface IPageStaticProps {
  projectTitle: string;
}

export type FormContext = [IProjectData, Dispatch<SetStateAction<IProjectData>>] | null;

export interface ILayoutState {
  dynamicPageTitle: IBilingualObject | null;
  localeKey: localeEnum;
  siteArea: siteAreaEnum;
}

export type LayoutContext = [ILayoutState, Dispatch<SetStateAction<ILayoutState>>];

/////////////////////////

export interface IFileUploadMap {
  formDataId: string;
  localUrl: string;
}

///SWR///////////////////////

export interface IGetFsFiles {
  success: boolean;
  fsFiles: IFsFilesData[];
}
