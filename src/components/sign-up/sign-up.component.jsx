import React, { useState } from "react";
import { connect } from "react-redux";

import { emailSignUpStart } from "../../redux/user/user.actions.js";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-up.style.scss";

const SignUp = ({ emailSignUpStart }) => {
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password don't match ");
      return;
    }
    emailSignUpStart(email, password, displayName);
    // NOTE: 元々はサインアップ完了後にstateを初期化していたが、
    // 現在はサインアップ後に別ページに遷移するためstateの初期化は必要ない。
    // (次回サインアップページに訪れた場合はconstructorによってstateの初期化処理が走るため)
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({
      ...userCredentials,
      [name]: value
    });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have account</h2>
      <span>Sign up with your email and passwrod</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="display name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="confirmPassword"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign up</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  emailSignUpStart: (email, password, displayName) =>
    dispatch(emailSignUpStart({ email, password, displayName }))
});

export default connect(null, mapDispatchToProps)(SignUp);
