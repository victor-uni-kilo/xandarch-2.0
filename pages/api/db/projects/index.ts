import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";
import Category from "models/Category";

const projectsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  try {
    console.log("FETCHING DOCUMENTs");
    const allProjects = await Project.find({});
    // .populate([{ path: "category", model: Category }]);
    // THIS NEEDS TO WORK FOR ALL FOUND ITEMS

    console.log("FETCHED DOCUMENTs", allProjects);

    return res.status(200).json(allProjects);
  } catch (error) {
    console.log("allerrors", error);
    return res.status(400).json(error);
  }
};

export default projectsHandler;
