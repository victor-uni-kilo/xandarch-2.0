import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Category from "models/Project";

const categoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("CONNECTING TO MONGO DB");
    await connectToMongo();
    console.log("CONNECTED TO MONGO DB");

    console.log("FETCHING DOCUMENTs");
    const allCategories = await Category.find();
    console.log("FETCHED DOCUMENTs", allCategories);

    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default categoryHandler;
