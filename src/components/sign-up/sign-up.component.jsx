import React from "react";
import { connect } from "react-redux";

import { emailSignUpStart } from "../../redux/user/user.actions.js";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-up.style.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("password don't match ");
      return;
    }
    const { emailSignUpStart } = this.props;
    emailSignUpStart(email, password, displayName);
    // NOTE: 元々はサインアップ完了後にstateを初期化していたが、
    // 現在はサインアップ後に別ページに遷移するためstateの初期化は必要ない。
    // (次回サインアップページに訪れた場合はconstructorによってstateの初期化処理が走るため)
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have account</h2>
        <span>Sign up with your email and passwrod</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="display name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="confirmPassword"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign up</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  emailSignUpStart: (email, password, displayName) =>
    dispatch(emailSignUpStart({ email, password, displayName }))
});

export default connect(null, mapDispatchToProps)(SignUp);
