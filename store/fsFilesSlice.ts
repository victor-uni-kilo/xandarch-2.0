import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "store";
import { SITE_AREA } from "types";

export const fsFilesSlice = createSlice({
  name: "fileList",
  initialState: {
    fsFiles: [],
  },
  reducers: {
    setFsFiles: (state, action) => {
      state.fsFiles = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.fileList.fsFiles) {
        return state;
      }
      state.fsFiles = action.payload.fileList.fsFiles;
    },
  },
});

//EXPORT ACTIONS
export const { setFsFiles } = fsFilesSlice.actions;

//EXPORT SELECTOR
export const selectfileList = (state: AppState) => state.fileList;

export default fsFilesSlice.reducer;
