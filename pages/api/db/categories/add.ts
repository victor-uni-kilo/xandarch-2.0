import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/db/connectDB";
import Category from "models/Category";

const addCategoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  const category = await new Category(req.body);

  try {
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default addCategoryHandler;
