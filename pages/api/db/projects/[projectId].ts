import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";

const singleProjectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  const projectId = req.query.projectId;
  console.log("projectIdSIngle", projectId);

  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  try {
    let project;
    switch (method) {
      case "GET":
        console.log("FETCHING DOCUMENT");
        project = await Project.findOne({ _id: projectId });
        // .populate("categories");

        console.log("FETCHED DOCUMENT", project);
        break;

      case "DELETE":
        console.log("FETCHING DOCUMENT");

        //TO WORK WITH IMAGES
        // project = await Project.findOne({ _id: projectId });

        project = await Project.deleteOne({ _id: projectId });

        console.log("DELETING DOCUMENT", project);
        break;

      case "POST":
        console.log("UPDATING PROJECT");
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
