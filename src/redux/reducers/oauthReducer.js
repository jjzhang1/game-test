const initialState = {
  bind_credit_twitter: 0,
  follow_credit_twitter: 0,
  bind_credit_discord: 0,
  follow_credit_discord: 0,
  signInPoints: 0,
};

function oauthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_OAUTH_INFO":
      return {
        ...state,
        ...payload,
      };
    case "SET_SIGNIN_POINTS":
      return {
        ...state,
        signInPoints: payload.signInPoints,
      };
    default:
      return state;
  }
}

export default oauthReducer;
