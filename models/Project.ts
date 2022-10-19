import mongoose from "mongoose";
import { IProjectSchema } from "types";
import validators from "./validators";
import uniqueValidator from "mongoose-unique-validator";

/// UNFORTUNATE ADDITIONAL SCHEMAS
const titleSchema = new mongoose.Schema({
  en: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Title can't be shorter than 2 characters"],
    maxLength: [32, "Title can't be longer than 32 characters"],
    validate: [validators.noSpecialChars, validators.noEmptyString],
  },
  sr: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Title can't be shorter than 2 characters"],
    maxLength: [32, "Title can't be longer than 32 characters"],
    validate: [validators.noSpecialChars, validators.noEmptyString],
  },
});

const captionSchema = new mongoose.Schema({
  en: {
    type: String,
    required: true,
    validate: validators.noSpecialChars,
  },
  sr: {
    type: String,
    required: true,
    validate: validators.noSpecialChars,
  },
});

const descriptionSchema = new mongoose.Schema({
  en: {
    type: String,
    required: true,
    validate: validators.noSpecialChars,
  },
  sr: {
    type: String,
    required: true,
    validate: validators.noSpecialChars,
  },
});

/// MAIN SCHEMA for MODEL CREATION
const projectSchema = new mongoose.Schema<IProjectSchema>({
  title: { type: titleSchema },
  caption: { type: captionSchema },
  description: { type: descriptionSchema },
  area: {
    type: Number,
  },
  projectDate: {
    type: Date,
  },
  completionDate: {
    type: Date,
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    validate: validators.noDuplicates,
  },
  // coverImage: {
  //   type: mongoose.Types.ObjectId,
  // },
});

projectSchema.plugin(uniqueValidator, { message: "Error, expected {PATH} to be unique." });

const Project = mongoose.models.Project || mongoose.model<IProjectSchema>("Project", projectSchema);

export default Project;
