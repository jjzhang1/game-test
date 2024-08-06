const initialState = {
  address: null,
  network: null,
  isConnected: false,
  userName: "",
  userAvatar:
    "https://bucket-pubwv4.s3.ap-southeast-1.amazonaws.com/profile-icons/a31.png",
};

function walletReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {
    case "SET_WALLET_INFO":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export default walletReducer;
