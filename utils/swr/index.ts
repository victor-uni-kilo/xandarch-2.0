import useSWR from "swr";
import { fetchAllImagesSWR } from "./fetchers/fetchImage";

export const useFsFilesImages = () => {
  const { data, error } = useSWR(`/api/db/images/`, fetchAllImagesSWR);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
