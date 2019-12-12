import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";

import { auth, createUserProfileDocument } from "./firebase/firebase.util";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  // TODO: なぜこれはletをつけないのか? -> class内なのでつける必要がない?
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // NOTE: referenceからは直接データを参照できない
        userRef.onSnapshot(snapShot => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            },
            // NOTE: setState()の直後に実行したい関数は第2引数として渡す
            () => console.log(this.state)
          );
        });
        // 個人的には下記のように記述しても良いと思うが、上記のようにonSnapshot()を使ってdocumentの変更をリッスンする必要はあるのか？
        // const snapShot = await userRef.get();
        // const data = snapShot.data();
        // this.setState(
        //   {
        //     currentUser: {
        //       id: snapShot.id,
        //       ...data
        //     }
        //   },
        //   () => console.log(this.state)
        // );
      } else {
        this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
