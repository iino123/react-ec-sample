import React from "react";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.style.scss";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapStateToDispatch = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = state => ({
  // itemCountはstateが変化した時(userなど関係ないものなどでも)、再計算される->パフォーマンスに問題あり。
  itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapStateToDispatch)(CartIcon);
