import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions.js";

import CollectionOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionContainer from "../collection/collection.container";

// react-router-domによってmatch, location, historyが渡されている
const ShopPage = ({ match, fetchCollectionsStart }) => {
  // 親コンポーネントが再度レンダーされた場合は、このコンポーネントも再度レンダーされる。
  // その際にfetchCollectionsStartを再度呼びだすことになりパフォーマンスに影響する。
  // 上記のような事態を防ぐために第2引数に値の配列を渡すことができる。(この値は依存関係と考えることができる)
  // 前回から依存関係の更新されると、副作用(useEffecy内の関数)は再度実行される。
  // 従って、このコンポーネントが親コンポーネントの更新による再レンダリングされた場合も依存関係が変わっていない場合は副作用は再実行されない。
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionContainer}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
