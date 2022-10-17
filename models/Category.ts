import mongoose from "mongoose";
import validators from "./validators";
import uniqueValidator from "mongoose-unique-validator";
import { CATEGORY_TYPE, ICategorySchema } from "types";

const categorySchema = new mongoose.Schema<ICategorySchema>({
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
  type: {
    type: String,
    enum: CATEGORY_TYPE,
    required: true,
  },
});
categorySchema.plugin(uniqueValidator, { message: "Error, expected {PATH} to be unique." });

const Category =
  mongoose.models.Category || mongoose.model<ICategorySchema>("Category", categorySchema);

export default Category;
