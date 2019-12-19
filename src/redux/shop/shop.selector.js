import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// memo: shop-dataをDataNomalizarionした結果、shop.collectionがArrayでは無くHashになったため、mapなどの関数を使えなくなった
// -> iterateできるようにarrayに変換するためのものが以下
export const selectShopCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

// 渡される引数によって返却したい結果が変化する場合の書き方 -> HOCを使う
export const selectCollection = collectionUrlParam =>
  createSelector([selectShopCollections], collections =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectIsCollectionsFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => shop.collections
);
