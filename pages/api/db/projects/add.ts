import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";

const addProjectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  const newProject = await new Project(req.body);

  try {
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.log("CREATION ERROR", error);
    res.status(400).json(error);
  }
};

export default addProjectHandler;
