import mongoose, { Types } from "mongoose";
import validators from "./validators";
import uniqueValidator from "mongoose-unique-validator";
import { IProjectTextSchema } from "types";

const projectTextSchema = new mongoose.Schema<IProjectTextSchema>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Title can't be shorter than 2 characters"],
    maxLength: [32, "Title can't be longer than 32 characters"],
    validate: [validators.noSpecialChars, validators.noEmptyString],
  },
  caption: {
    type: String,
    required: true,
    validate: validators.noSpecialChars,
  },
  description: {
    type: String,
    required: true,
    validate: validators.noSpecialChars,
  },
});

projectTextSchema.plugin(uniqueValidator, { message: "Error, expected {PATH} to be unique." });

const ProjectText =
  mongoose.models.ProjectText ||
  mongoose.model<IProjectTextSchema>("ProjectText", projectTextSchema);

export default ProjectText;
