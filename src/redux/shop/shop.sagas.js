import { all, takeLatest, call, put } from "redux-saga/effects";

import {
  firestore,
  convertColledctionsSnapshotToMap
} from "../../firebase/firebase.util";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapShot = yield collectionRef.get();
    // TODO: なぜapiと通信しない処理(非同期ではない処理)に対して、yieldを使うのか確認
    // callはyieldを付けてメソッドを実行する際に使う。第二引数は、第一引数の関数に渡す引数
    const collectionsMap = yield call(
      convertColledctionsSnapshotToMap,
      snapShot
    );

    // putで他のアクションを呼ぶ(redux-thunkの場合はdispatch)
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

// takeEvery(action名, 実行される非同期処理のジェネレータ関数)
export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export default function* shopSaga() {
  yield all([call(fetchCollectionsStart)]);
}
