import * as actionTypes from "../actions/actions";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: action.authData.localId,
        token: action.authData.token,
        loading: false
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        userId: null,
        loading: false,
        token: null,
        error: action.error
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        error: null,
        userId: null,
        loading: false
      };
    default:
      return state;
  }
};
