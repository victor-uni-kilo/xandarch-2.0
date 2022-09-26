import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Category from "models/Category";

const categoriesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  try {
    console.log("FETCHING DOCUMENTs");
    const allCategories = await Category.find();
    console.log("FETCHED DOCUMENTs", allCategories);

    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default categoriesHandler;
