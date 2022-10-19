import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Project from "models/Project";

const addProjectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  const newProject = await new Project(req.body);

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
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.log("CREATION ERROR", error);
    res.status(400).json(error);
  }
};

export default addProjectHandler;
