import React from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";

import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import { setCurrentUser } from "./redux/user/user.actions";

import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  // TODO: なぜこれはletをつけないのか? -> class内なのでつける必要がない?
  unsubscribeFromAuth = null;

  componentDidMount() {
    // TODO: 確認 下記の定数宣言を1つ上の階層でしたらエラーとなるがなぜ...
    const { setCurrentUser } = this.props;

    // const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // NOTE: referenceからは直接データを参照できない
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
        // TODO:確認 個人的には下記のように記述しても良いと思うが、上記のようにonSnapshot()を使ってdocumentの変更をリッスンする必要はあるのか？
        // const snapShot = await userRef.get();
        // const data = snapShot.data();
        // setCurrentUser(
        //   {
        //     id: snapShot.id,
        //     ...data
        //   },
        //   () => console.log(this.state)
        // );
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  // TODO: 確認 → componentがマウントされていない時のメモリリークを引き起こすのを防ぐためらしい
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          ></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
