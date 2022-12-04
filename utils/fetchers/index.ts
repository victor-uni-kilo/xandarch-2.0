import { IFsFilesData } from "types";
import { server } from "../db/apiConfig";

export const fetchImageUrl = async (id: string): Promise<string> => {
  const imageUrl = await fetch(`${server}/api/db/images/${id}`, {
    method: "GET",
  })
    .then(res => res.blob())
    .then(imageBlob => URL.createObjectURL(imageBlob));
  return imageUrl;
};

////////
export const fetchFsFiles = async (): Promise<IFsFilesData[]> => {
  const fsFiles = await fetch(`${server}/api/db/images`, {
    method: "GET",
  }).then(res => res.json());
  return fsFiles;
};

export const fetchAllImageUrls = async (): Promise<string[]> => {
  const fsImageUrls = await fetch(`${server}/api/db/images`, {
    method: "GET",
  })
    .then(res => res.json())
    .then((data: IFsFilesData[]) => {
      const imageUrls: Promise<string>[] = data.map(entry => {
        return fetchImageUrl(entry._id.toString());
      });
      return Promise.all(imageUrls);
    });
  return fsImageUrls;
};

//////// SWR FETCHERS
export const fsFilesFetcher = (url: string) =>
  fetch(url, { method: "GET" }).then(res => res.json());
