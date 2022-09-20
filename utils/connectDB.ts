import mongoose from "mongoose";

const connectToMongo = async () => {
  const uri = encodeURI(process.env.MONGODB_URI!);
  console.log("USERNAME", process.env.USERNAME!);
  console.log("MONGODB_URI", uri);

  try {
    mongoose.connect(uri);
  } catch (error) {
    console.log("DBerror", error);
  }
};

export default connectToMongo;
