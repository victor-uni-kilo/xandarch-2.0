import mongoose, { Types } from "mongoose";

export interface IProject {
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
const projectSchema = new mongoose.Schema<IProject>({
  projectTextEN: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectTextEN",
    required: [true, "Text in English is not saved"],
  },
  projectTextSR: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectTextSR",
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
    byService: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "serviceCategory",
      },
    ],
    byType: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeCategory",
      },
    ],
    byStatus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "statusCategory",
      },
    ],
  },
  // coverImage: {
  //   type: mongoose.Types.ObjectId,
  // },
});

const Project = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
// const Projekti = mongoose.models.Project || mongoose.model<IProject>("Projekti", projectSchema);

export default Project;
