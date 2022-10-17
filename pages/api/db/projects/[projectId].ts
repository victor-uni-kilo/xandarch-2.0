import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";
import ProjectText from "models/ProjectText";
import Category from "models/Category";

const singleProjectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { projectId } = req.query;
  const method = req.method;
  const projectId = req.query.projectId;
  // const { projectId } = req.query;

  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  try {
    let project;
    switch (method) {
      case "GET":
        console.log("FETCHING DOCUMENT");
        project = await Project.findOne({ _id: projectId })
          .lean()
          .populate([
            { path: "projectTextEN", model: ProjectText },
            { path: "projectTextSR", model: ProjectText },
            {
              path: "categories",
              populate: { path: "byService", model: Category },
            },
            {
              path: "categories",
              populate: { path: "byType", model: Category },
            },
            {
              path: "categories",
              populate: { path: "byStatus", model: Category },
            },
          ]);
        // SHOULD POPULATE THE REQUIRED TEXT
        console.log("FETCHED DOCUMENT", project);
        break;

      case "DELETE":
        console.log("FETCHING DOCUMENT");

        project = await Project.findOne({ _id: projectId });

        await ProjectText.deleteOne({ _id: project.projectTextEN });
        await ProjectText.deleteOne({ _id: project.projectTextSR });

        project = await Project.deleteOne({ _id: projectId });

        console.log("DELETING DOCUMENT", project);
        break;

      case "POST":
        console.log("UPDATING PROJECT");
        // SHOULD UPDATE SUB DOCUMENTS AS WELL
        project = await Project.updateOne(
          { _id: projectId },
          {
            ...req.body,
          },
          { runValidators: true },
        );
        console.log("UPDATING PROJECT");
        break;

      default:
        // FIX THIS: Status 405 will still be success
        res.status(405).end(`Method ${method} is not allowed`);
        break;
    }
    return res.status(200).json(project);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default singleProjectHandler;
