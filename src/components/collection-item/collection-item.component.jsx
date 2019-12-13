import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

import "./collection-item.style.scss";
import CustonButton from "../custom-button/custom-button.component";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      {/* NOTE:
        onClickにaddItem(item)を渡すと関数の「実行」を意味するためエラーとなる
        今回のように引数のある関数は特に注意が必要
        */}
      <CustonButton inverted onClick={() => addItem(item)}>
        Add to Cart
      </CustonButton>
    </div>
  );
};
const mapStateToDispatch = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null, mapStateToDispatch)(CollectionItem);
