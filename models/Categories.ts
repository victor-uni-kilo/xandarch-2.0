import mongoose, { Types } from "mongoose";
import validators from "./validators";
import uniqueValidator from "mongoose-unique-validator";

export interface ICategory {
  categoryEN: string;
  categorySR: string;
}
const categorySchema = new mongoose.Schema<ICategory>({
  categoryEN: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Keyword can't be shorter than 2 characters"],
    maxLength: [16, "Keyword can't be longer than 16 characters"],
    validate: [validators.noSpecialChars, validators.noEmptyString],
  },
  categorySR: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Keyword can't be shorter than 2 characters"],
    maxLength: [16, "Keyword can't be longer than 16 characters"],
    validate: [validators.noSpecialChars, validators.noEmptyString],
  },
});
categorySchema.plugin(uniqueValidator, { message: "Error, expected {PATH} to be unique." });

export const serviceCategory =
  mongoose.models.serviceCategory || mongoose.model<ICategory>("serviceCategory", categorySchema);
export const typeCategory =
  mongoose.models.typeCategory || mongoose.model<ICategory>("typeCategory", categorySchema);
export const statusCategory =
  mongoose.models.statusCategory || mongoose.model<ICategory>("statusCategory", categorySchema);
