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

const authenticationSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    token: token
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
        //   store the token and expiration when logged in
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem(
          "expirirationDate",
          new Date(Date.now() + response.data.expiresIn * 1000)
        );
        dispatch(
          authenticationSuccess(response.data.localId, response.data.idToken)
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authenticationFailed(error));
      });
  };
};

export const logout = () => {
  // remove the tokens when logged out
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirirationDate");
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

export const checkAuthStatus = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirirationDate = new Date(
        localStorage.getItem("expirirationDate")
      );
      if (expirirationDate <= new Date()) dispatch(logout());
      else {
        const userId = localStorage.getItem("userId");
        dispatch(authenticationSuccess(userId, token));
        dispatch(
          checkAuthTimeout(
            (expirirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
