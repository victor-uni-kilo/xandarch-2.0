import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";
import ProjectText from "models/ProjectText";

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

  let newProjectError;

  try {
    if (errorList.length === 0) {
      newProject.projectTextEN = projectTextEN._id;
      newProject.projectTextSR = projectTextSR._id;
    }

    await newProject.validate();
  } catch (error) {
    newProjectError = error;
  }

  // CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES //
  // CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES //
  // CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES //
  // CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES //
  // CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES CHECK CATEGORIES //

  // NEED IMAGES IDS
  // ^^^ THIS REQUIRES NextApiRequestCUSTOM to allow re.file

  //   let imageIds = [];
  //   if (req.files || req.files !== undefin`ed) {
  //     const files = req.files;
  //     files.forEach((file: { size: number; id: any }) => {
  //       if (file.size > 5000000) {
  //         // deleteImage(file.id);
  //         console.log("IMAGE IS TO BIG", file.id);

  //         return res.status(400).send("File may NOT exceed 5mb."); // NOT PRINTING LAST CHARACTER / we need this as a flash message
  //       }
  //       imageIds.push(file.id);
  //     });
  //   }

  // NEED CTATEGORIES IDS

  try {
    if (!newProjectError) {
      projectTextEN.save();
      projectTextSR.save();
    }
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    const errors = errorList.length > 0 ? errorList : error;
    console.log("CREATION ERROR", errors);
    res.status(400).json(errors);
  }
};

export default addProjectHandler;
