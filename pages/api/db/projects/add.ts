import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";
import ProjectText from "models/ProjectText";
import { Types } from "mongoose";

const addProjectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  const projectTextEN = await new ProjectText(req.body.projectTextEN);
  const projectTextSR = await new ProjectText(req.body.projectTextSR);
  const newProject = await new Project(req.body);

  //reset newProject language based text;
  newProject.projectTextEN = null;
  newProject.projectTextSR = null;

  console.log("newProjectAfterDeletion", newProject);

  let errorList = [];

  try {
    await projectTextEN.validate();
  } catch (error) {
    errorList.push(error);
  }

  try {
    await projectTextSR.validate();
  } catch (error) {
    errorList.push(error);
  }

  try {
    if (errorList.length === 0) {
      projectTextEN.save();
      projectTextSR.save();
      newProject.projectTextEN = projectTextEN._id;
      newProject.projectTextSR = projectTextSR._id;
    }

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    errorList.unshift(error);
    res.status(400).json(errorList);
  }
};

export default addProjectHandler;
