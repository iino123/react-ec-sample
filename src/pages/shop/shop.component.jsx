import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fectchCollectionStartAsync } from "../../redux/shop/shop.actions.js";

import { createStructuredSelector } from "reselect";
import {
  selectIsCollectionsFetching,
  selectIsCollectionsLoaded
} from "../../redux/shop/shop.selector.js";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// react-router-domによってmatch, location, historyが渡されている
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    console.log(123);
    const { fectchCollectionStartAsync } = this.props;
    fectchCollectionStartAsync();
  }

  render() {
    const {
      match,
      selectIsCollectionsFetching,
    } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => {
            // 遷移先のコンポーネントにpropsを渡す必要がある場合は、renderを使うらしい。
            // ここでどんな感じでpropsが渡されるかが、いまいちピンときていない
            return (
              <CollectionOverviewWithSpinner
                isLoading={selectIsCollectionsFetching}
                {...props}
              />
            );
          }}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={selectIsCollectionsFetching}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectIsCollectionsFetching: selectIsCollectionsFetching,
  selectIsCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fectchCollectionStartAsync: () => dispatch(fectchCollectionStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
