// import { BSONType, ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface IProject {
  title: string;
  caption: string;
  description: string;
  area: number;
  projectDate: Date;
  categories: string[];
}

const validators = {
  noEmptyString: {
    validator: (v: string) => {
      return Promise.resolve(v !== " ");
    },
    message: `Please, no empty strings.`,
  },
  noSpecialChars: {
    validator: (v: string) => {
      return Promise.resolve(/^(a-z|A-Z|0-9)*[^`#$%^&*+()<>']*$/g.test(v));
    },
    message: `Please, no special characters.`,
  },
};

const projectSchema = new mongoose.Schema<IProject>({
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

  area: {
    type: Number,
    required: true,
  },

  projectDate: {
    type: Date,
  },

  // HOW TO ADD VALIDATORS FOR ARRAY OF STRINGS
  // HOW TO ADD CATEGORIES ONE BY ONE - separate route?
  // categories: {
  //   type: Array,
  //   required: false,
  // },

  // coverImage: {
  //   type: mongoose.Types.ObjectId,
  // },
});

const Project = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
