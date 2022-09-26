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

export interface IProjectSchema {
  projectTextEN: Types.ObjectId;
  projectTextSR: Types.ObjectId;
  area: number;
  projectDate: Date;
  completionDate: Date;
  categories: {
    byService: Types.ObjectId[];
    byType: Types.ObjectId[];
    byStatus: Types.ObjectId[];
  };
}

export interface IProjectTextSchema {
  _id: Types.ObjectId;
  title: string;
  caption: string;
  description: string;
}

export interface ICategoryScheme {
  categoryEN: string;
  categorySR: string;
  type: CATEGORY_TYPE;
}

export interface IProject {
  _id: Types.ObjectId;
  projectTextEN: IProjectTextSchema;
  projectTextSR: IProjectTextSchema;
  area: number;
  projectDate: Date;
  completionDate: Date;
  categories: {
    byService: Types.ObjectId[];
    byType: Types.ObjectId[];
    byStatus: Types.ObjectId[];
  };
}
