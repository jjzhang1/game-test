const initialState = {
  display_name: "",
  avatar:
    "https://bucket-pubwv4.s3.ap-southeast-1.amazonaws.com/profile-icons/a31.png",
  balance_email: "",
  balance_id: "",
  discord_id: "",
  discord_name: "",
  is_bind_discord: false,
  is_bind_twitter: false,
  is_follow_discord: false,
  is_follow_twitter: false,
  twitter_id: "",
  twitter_name: "",
  current_rank: 0,
};

function walletReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_USER_INFO":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export default walletReducer;
