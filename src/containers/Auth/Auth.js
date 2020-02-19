import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store/actions/index";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";

const firebaseErrorMessages = [
  "EMAIL_NOT_FOUND",
  "Looks like you haven't registered",
  "INVALID_PASSWORD",
  "Wrong Credentials",
  "EMAIL_EXISTS",
  "A user with the same email exists. Try to login?",
  "TOO_MANY_ATTEMPTS_TRY_LATER",
  "Looks like something is wrong. Try later"
];

export class Auth extends Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    isSignup: true
  };

  onChangeHandler = event => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  };

  onSwitchSingup = () => {
    this.setState({ ...this.state, isSignup: !this.state.isSignup });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.authenticate(
      this.state.user.email,
      this.state.user.password,
      this.state.isSignup
    );
  };

  render() {
    let error = null;

    if (this.props.error) {
      error =
        firebaseErrorMessages[
          firebaseErrorMessages.indexOf(
            this.props.error.response.data.error.message
          ) + 1
        ];
      error = (
        <p style={{ color: "red", marginTop: "10px", display: "block" }}>
          {error}
        </p>
      );
    }

    return (
      <div>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className={classes.Auth}>
            {error}
            <h1>{this.state.isSignup ? "Register" : "Login"}</h1>
            <Input
              inputtype="input"
              changed={this.onChangeHandler}
              label="Email"
              type="email"
              name="email"
            />
            <Input
              inputtype="input"
              changed={this.onChangeHandler}
              label="Password"
              type="password"
              minLength={6}
              name="password"
            />
            <Button buttonType="Success" clicked={this.onSubmitHandler}>
              Submit
            </Button>
            <Button buttonType="Danger" clicked={this.onSwitchSingup}>
              Switch to {this.state.isSignup ? "Sign in" : "Sign up"}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (email, password, isSignup) =>
      dispatch(authenticate(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
