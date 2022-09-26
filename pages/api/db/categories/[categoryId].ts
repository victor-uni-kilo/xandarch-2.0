import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import Category from "models/Category";

const singleCategoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { categoryId } = req.query;
  const method = req.method;
  const categoryId = req.query.categoryId;
  // const { categoryId } = req.query;

  console.log("CONNECTING TO MONGO DB");
  await connectToMongo();
  console.log("CONNECTED TO MONGO DB");

  try {
    let category;
    switch (method) {
      case "GET":
        console.log("FETCHING DOCUMENT");
        category = await Category.findOne({ _id: categoryId });
        // SHOULD POPULATE THE REQUIRED TEXT
        console.log("FETCHED DOCUMENT", category);
        break;
      case "DELETE":
        // SHOULD DELETE ALL RELATED SUBDOCUMENTS
        console.log("FETCHING DOCUMENT");
        category = await Category.deleteOne({ _id: categoryId });
        console.log("DELETING DOCUMENT", category);
        break;
      case "POST":
        console.log("UPDATING CATEGORY");
        // SHOULD UPDATE SUB DOCUMENTS AS WELL
        category = await Category.updateOne(
          { _id: categoryId },
          {
            ...req.body,
          },
          { runValidators: true },
        );
        console.log("UPDATING CATEGORY");
        // Update Category
        break;
      default:
        // FIX THIS: Status 405 will still be success
        res.status(405).end(`Method ${method} is not allowed`);
        break;
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default singleCategoryHandler;
