import { all, call, takeLatest, put } from "redux-saga/effects";

import UserActionTypes from "../user/user.type";
import { clearCart } from "../cart/cart.actions";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* onClearCart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export default function* cartSaga() {
  yield all([call(onClearCart)]);
}
