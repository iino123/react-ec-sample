import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertColledctionsSnapshotToMap
} from "../../firebase/firebase.util";

export const fetchCollectionsStart = collections => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// この関数の中で3つのaction(FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_FAILURE)を呼ぶ
export const fectchCollectionStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");

    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertColledctionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => {
        dispatch(fetchCollectionsFailure(error.message));
      });
  };
};
