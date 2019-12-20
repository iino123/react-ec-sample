import UserActionTypes from "./user.type";

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const emailSignUpStart = userInput => ({
  type: UserActionTypes.EMAIL_SIGN_UP_START,
  payload: userInput
});

export const emailSignUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.EMAIL_SIGN_UP_SUCCESS,
  payload: { user, additionalData }
});

export const emailSignUpFailure = error => ({
  type: UserActionTypes.EMAIL_SIGN_UP_FAILURE,
  payload: error
});
