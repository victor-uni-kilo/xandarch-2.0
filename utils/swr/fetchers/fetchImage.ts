import { IFsFilesData } from "types";
import { server } from "../../db/apiConfig";

export const fetchImageUrl = async (id: string): Promise<string> => {
  const imageUrl = await fetch(`${server}/api/db/images/${id}`, {
    method: "GET",
  })
    .then(res => res.blob())
    .then(imageBlob => URL.createObjectURL(imageBlob));
  return imageUrl;
};

export const fetchAllImagesSWR = async (): Promise<string[]> => {
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
// Call the API
// fetch('https://jsonplaceholder.typicode.com/posts/5').then(function (response) {
// 	if (response.ok) {
// 		return response.json();
// 	} else {
// 		return Promise.reject(response);
// 	}
// }).then(function (data) {

// 	// Store the post data to a variable
// 	post = data;

// 	// Fetch another API
// 	return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);

// }).then(function (response) {
// 	if (response.ok) {
// 		return response.json();
// 	} else {
// 		return Promise.reject(response);
// 	}
// }).then(function (userData) {
// 	console.log(post, userData);
// }).catch(function (error) {
// 	console.warn(error);
// });
