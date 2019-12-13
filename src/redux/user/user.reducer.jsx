import { UserActionTypes } from "./user.type";

const INITIAL_STATE = {
  currentUser: null
};

// memo: 初期値を渡す理由がピンときていない
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
