import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions.js";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import {
  firestore,
  convertColledctionsSnapshotToMap
} from "../../firebase/firebase.util";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// react-router-domによってmatch, location, historyが渡されている
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoading: false
  //   };
  // }
  // 上記を省略して下記のように記述できる
  state = {
    isLoading: true
  };

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    // collectionRef.onSnapshot(async snapshot => {
    //   const collectionMap = await convertColledctionsSnapshotToMap(snapshot);
    //   updateCollections(collectionMap);
    //   this.setState({ isLoading: false });
    // });
    // 上記はfirestoreに保存しているcollectionsをsubscribeするコードだが、より実務で使用する可能性が高い下記のパターンに変更
    collectionRef.get().then(snapshot => {
      const collectionMap = convertColledctionsSnapshotToMap(snapshot);
      updateCollections(collectionMap);
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => {
            // 遷移先のコンポーネントにpropsを渡す必要がある場合は、renderを使うらしい。
            // ここでどんな感じでpropsが渡されるかが、いまいちピンときていない
            return (
              <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />
            );
          }}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
