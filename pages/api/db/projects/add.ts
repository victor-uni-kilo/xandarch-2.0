import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";

const addProjectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { title, description } = req.body;

  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  try {
    console.log("CREATING PROJECT");
    const project = new Project(req.body);

    project.save();
    // const newProject = await Project.create(project);
    console.log("CREATED PROJECT");

    res.json({ project });
  } catch (error) {
    console.log(error);

    res.json(error);
  }
};

export default addProjectHandler;
