export const SET_WALLET_INFO = "SET_WALLET_INFO";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_OAUTH_INFO = "SET_OAUTH_INFO";
export const SET_SIGNIN_POINTS = "SET_SIGNIN_POINTS";
export const SET_INVITE_POINTS = "SET_INVITE_POINTS";
export const SET_MENU_INFO = "SET_MENU_INFO";

export const setWalletInfo = (address, network, isConnected) => ({
  type: SET_WALLET_INFO,
  payload: { address, network, isConnected },
});

export const setUserInfo = (payload) => ({
  type: SET_USER_INFO,
  payload: { ...payload },
});

export const setOauthInfo = (payload) => ({
  type: SET_OAUTH_INFO,
  payload: { ...payload },
});

export const setSignPoints = (payload) => ({
  type: SET_SIGNIN_POINTS,
  payload: { ...payload },
});

export const setInviteInfo = (payload) => ({
  type: SET_INVITE_POINTS,
  payload: { ...payload },
});

export const setMenuInfo = (payload) => ({
  type: SET_MENU_INFO,
  payload: { ...payload },
});
