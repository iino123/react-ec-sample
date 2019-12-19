import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fectchCollectionStartAsync } from "../../redux/shop/shop.actions.js";

import CollectionOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionContainer from "../collection/collection.container";

// react-router-domによってmatch, location, historyが渡されている
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fectchCollectionStartAsync } = this.props;
    fectchCollectionStartAsync();
  }

  render() {
    const { match } = this.props;
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
  }
}

const mapDispatchToProps = dispatch => ({
  fectchCollectionStartAsync: () => dispatch(fectchCollectionStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);
