import * as actionTypes from "./actions";

import axios from "axios";

const startAuthentication = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authenticationFailed = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

const authenticationSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authenticate = (email, password, isSingUp) => {
  return dispatch => {
    dispatch(startAuthentication());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUCvn1lAGC5byqn9qZ0D9S4Mmn923Ukfc";
    if (!isSingUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUCvn1lAGC5byqn9qZ0D9S4Mmn923Ukfc";
    }
    axios
      .post(url, { email, password, returnSecureToken: true })
      .then(response => {
        console.log(response);
        dispatch(authenticationSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authenticationFailed(error));
      });
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

const checkAuthTimeout = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
};
