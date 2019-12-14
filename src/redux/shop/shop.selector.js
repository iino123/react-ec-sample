import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collection
);

// memo: shop-dataをDataNomalizarionした結果、shop.collectionがArrayでは無くHashになったため、mapなどの関数を使えなくなった
// -> iterateできるようにarrayに変換するためのものが以下
export const selectShopCollectionsForPreview = createSelector(
  [selectShopCollections],
  collection => Object.keys(collection).map(key => collection[key])
);

// 渡される引数によって返却したい結果が変化する場合の書き方 -> HOCを使う
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectShopCollections],
    collections => collections[collectionUrlParam]
  );
