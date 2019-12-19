import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selector.js";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Collection from "./collection.component";

// NOTE: ここの記述方法
const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state)
});

// const CollectionContainer = connect(mapStateToProps)(WithSpinner(Collection));
// 上記をcomposeを使用して書き換え
const CollectionContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Collection);

export default CollectionContainer;
