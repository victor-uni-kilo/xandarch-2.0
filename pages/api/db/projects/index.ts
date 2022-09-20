import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";

const projectsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("CONNECTING TO MONGO DB");
    await connectToMongo();
    console.log("CONNECTED TO MONGO DB");

    console.log("FETCHING DOCUMENTs");
    const allProjects = await Project.find();
    console.log("FETCHED DOCUMENTs", allProjects);

    return res.status(200).json(allProjects);
  } catch (error) {
    return res.json(error);
  }
};

export default projectsHandler;
