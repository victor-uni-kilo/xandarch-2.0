import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";

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
        project = await Project.findOne({ _id: projectId });
        console.log("FETCHED DOCUMENT", project);
        break;
      case "DELETE":
        console.log("FETCHING DOCUMENT");
        project = await Project.deleteOne({ _id: projectId });
        console.log("DELETING DOCUMENT", project);
        break;
      case "POST":
        const { title, description } = req.body;

        console.log("What do I GET:", req.body);

        console.log("UPDATING PROJECT");
        project = await Project.updateOne(
          { _id: projectId },
          {
            ...req.body,
          },
          { runValidators: true },
        );
        console.log("UPDATING PROJECT");
        // Update Project
        break;
      default:
        res.status(405).end(`Method ${method} is not allowed`);
        break;
    }
    return res.status(200).json(project);
  } catch (error) {
    return res.json(error);
  }
};

export default singleProjectHandler;
