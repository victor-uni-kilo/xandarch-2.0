import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Action } from "redux";
import pageReducer from "./pageSlice";
import fileListReducer from "./fsFilesSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      page: pageReducer,
      fileList: fileListReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
