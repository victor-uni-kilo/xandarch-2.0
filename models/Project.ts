import mongoose from "mongoose";
import { IProjectSchema } from "types";
import validators from "./validators";

const projectSchema = new mongoose.Schema<IProjectSchema>({
  projectTextEN: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectText",
    required: [true, "Text in English is not saved"],
  },
  projectTextSR: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectText",
    required: [true, "Text in Serbian is not saved"],
  },
  area: {
    type: Number,
    required: true,
  },

  projectDate: {
    type: Date,
  },

  completionDate: {
    type: Date,
  },

  categories: {
    byService: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      validate: validators.noDuplicates,
    },
    byType: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      validate: validators.noDuplicates,
    },
    byStatus: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      validate: validators.noDuplicates,
    },
  },
  // coverImage: {
  //   type: mongoose.Types.ObjectId,
  // },
});

const Project = mongoose.models.Project || mongoose.model<IProjectSchema>("Project", projectSchema);
// const Projekti = mongoose.models.Project || mongoose.model<IProject>("Projekti", projectSchema);

export default Project;
