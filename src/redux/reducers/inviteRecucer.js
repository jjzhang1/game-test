const initialState = {
  total_credit: 0,
  total_invite_count: 0,
  success_invite_count: 0,
  self_code: "",
  parent_code: "",
};

function inviteReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {
    case "SET_INVITE_POINTS":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export default inviteReducer;
