import mongoose from "mongoose";
import validators from "./validators";
import uniqueValidator from "mongoose-unique-validator";
import { CATEGORY_TYPE, ICategoryScheme } from "types";

const categorySchema = new mongoose.Schema<ICategoryScheme>({
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
    // enum: CATEGORY_TYPE,
    required: true,
  },
});
categorySchema.plugin(uniqueValidator, { message: "Error, expected {PATH} to be unique." });

// export const serviceCategory =
//   mongoose.models.serviceCategory ||
//   mongoose.model<ICategoryScheme>("serviceCategory", categorySchema);
// export const typeCategory =
//   mongoose.models.typeCategory || mongoose.model<ICategoryScheme>("typeCategory", categorySchema);
// export const statusCategory =
//   mongoose.models.statusCategory ||
//   mongoose.model<ICategoryScheme>("statusCategory", categorySchema);

export default mongoose.models.Category ||
  mongoose.model<ICategoryScheme>("Category", categorySchema);
