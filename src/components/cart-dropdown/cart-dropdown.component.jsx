import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../redux/cart/cart.selectors";

import { toggleCartHidden } from "../../redux/cart/cart.actions.js";

import "./cart-dropdown.style.scss";

// NOTE:HOCを使ってreact-routerのwithRouterでラップされたコンポーネントはpropsのattributeとしてhistoryを受けとることができるようになる。
// NOTE:connectの第2引数にmapDispatchToPropsを渡さなくてもコンポーネントにdispatch関数自体が渡されているという性質を利用している(他のコンポーネントとは異なる書き方)
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

// reselectのcreateStructuredSelectを使わない書き方
const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
