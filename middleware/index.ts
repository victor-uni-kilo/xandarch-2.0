import nextConnect from "next-connect";
import multipartFormParser from "@middleware/multipartFormParser";
import uploadImage from "./uploadImage";

const middleware = nextConnect();

middleware.use(multipartFormParser);
// middleware.use(uploadImage);

export default middleware;
