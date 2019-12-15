import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.util";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCartHidden } from "../../redux/cart/cart.selectors.js";
import { selectCurrentUser } from "../../redux/user/user.selectors.js";

import "./header.style.scss";

import {
  HeaderContainner,
  LogoCantainer,
  OptionsContainer,
  OptionDiv,
  OptionLink
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainner>
    <LogoCantainer to="/">
      <Logo className="logo"></Logo>
    </LogoCantainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/contacts">CONTACTS</OptionLink>
      {currentUser ? (
        <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
      ) : (
        <Link to="/signin">SIGN IN</Link>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? <CartDropdown /> : null}
  </HeaderContainner>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
