import connectToMongo from "@utils/connectDB";
import mongoose from "mongoose";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

import middleware from "@middleware/index";
import nextConnect from "next-connect";

const addImageHandler = nextConnect<NextApiRequest, NextApiResponse>();
addImageHandler.use(middleware);

addImageHandler.post(async (req: any, res: any) => {
  const files = req.files;
  const body = req.body;

  console.log("CONNECTING TO MONGO");
  await connectToMongo();
  console.log("CONNECTED TO MONGO");

  const connection = mongoose.connection;

  const bucket = new mongoose.mongo.GridFSBucket(connection.db);

  console.log("FILES", files);

  try {
    Object.keys(files).forEach(key => {
      fs.createReadStream(files[key].filepath)
        .pipe(bucket.openUploadStream(files[key].originalFilename))
        .on("error", function (error) {
          console.log("onError");
          res.status(500).send(error);
        })
        .on("finish", function () {
          console.log("done!");
          process.exit(0);
        });
    });

    res.status(200).json(files);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default addImageHandler;
