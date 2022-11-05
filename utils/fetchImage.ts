import { server } from "./apiConfig";

const fetchImage = async (id: string) => {
  const imageBlob = await fetch(`${server}/api/db/images/${id}`).then(res => res.blob());
  const imageObjectURL = URL.createObjectURL(imageBlob);
  return imageObjectURL;
};

export default fetchImage;
