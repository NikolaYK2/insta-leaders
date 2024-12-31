import {
  Action,
  combineSlices,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { instaLeadersApi } from "@/appRoot/services/instaLeadersApi";
import { appSlice } from "@/appRoot/app.slice";
import { createPostReducer } from "@/features/userHub/model/createSlice/createSlice";
import { postsReducer } from "@/features/userHub/model/postsSlice/postsSlice";

const makeStore = () =>
  configureStore({
    reducer: combineSlices({
      [instaLeadersApi.reducerPath]: instaLeadersApi.reducer,
      alert: appSlice,
      create: createPostReducer,
      posts: postsReducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(instaLeadersApi.middleware),

    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export const wrapper = createWrapper<AppStore>(makeStore);
