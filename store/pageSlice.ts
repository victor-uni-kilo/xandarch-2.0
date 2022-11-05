import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "store";
import { SITE_AREA } from "types";

export const PageSlice = createSlice({
  name: "page",
  initialState: {
    pageTitle: null,
    localeKey: "en",
    siteArea: SITE_AREA.presentation,
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
    setLocaleKey: (state, action) => {
      state.localeKey = action.payload;
    },
    setSiteArea: (state, action) => {
      state.siteArea = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // handle client side state override
      if (!action.payload.page.pageTitle) {
        return state;
      }
      state.pageTitle = action.payload.page.pageTitle;
    },
  },
});

//EXPORT ACTIONS
export const { setPageTitle, setLocaleKey, setSiteArea } = PageSlice.actions;

//EXPORT SELECTOR
export const selectPage = (state: AppState) => state.page;

export default PageSlice.reducer;
