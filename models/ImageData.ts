import mongoose from "mongoose";
import validators from "./validators";
import uniqueValidator from "mongoose-unique-validator";
import { CATEGORY_TYPE, IImageDataSchema } from "types";

const imageDataSchema = new mongoose.Schema<IImageDataSchema>({
  refId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  alt: {
    en: {
      type: String,
      required: true,
      minlength: [2, "Keyword can't be shorter than 2 characters"],
      maxLength: [32, "Keyword can't be longer than 16 characters"],
      validate: [validators.noSpecialChars, validators.noEmptyString],
    },
    sr: {
      type: String,
      required: true,
      minlength: [2, "Keyword can't be shorter than 2 characters"],
      maxLength: [32, "Keyword can't be longer than 16 characters"],
      validate: [validators.noSpecialChars, validators.noEmptyString],
    },
  },
});

imageDataSchema.plugin(uniqueValidator, { message: "Error, expected {PATH} to be unique." });

const ImageData =
  mongoose.models.Category || mongoose.model<IImageDataSchema>("ImageData", imageDataSchema);

export default ImageData;
