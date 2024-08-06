import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import walletReducer from "./reducers/walletReducer";
import userReducer from "./reducers/userReducer";
import oauthReducer from "./reducers/oauthReducer";
import inviteReducer from "./reducers/inviteRecucer";
import menuReducer from "./reducers/menuReducer";

const makeStore = () =>
  configureStore({
    reducer: {
      wallet: walletReducer,
      userInfo: userReducer,
      oauth: oauthReducer,
      invite: inviteReducer,
      menu: menuReducer,
    },
  });

export const store = createWrapper(makeStore);
export const wrapper = createWrapper(makeStore, { debug: true });
