import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jacket: 3,
  womens: 4,
  mens: 5
};

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collection
);

// 渡される引数によって返却したい結果が変化する場合の書き方 -> HOCを使う
export const selectCollection = collectionUrlParam =>
  createSelector([selectShopCollections], collections =>
    collections.find(
      collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  );
