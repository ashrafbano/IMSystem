import { AnyAction } from "redux";
import {
  CLEAR_AUTH_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  PHONE_VERIFY_FAIL,
  PHONE_VERIFY_START,
  PHONE_VERIFY_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from "../actions/authActions";

const initialState = {
  loading: false,
  error: null,
  user: null,
  signUpSuccess: false,
};

export const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case PHONE_VERIFY_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PHONE_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case PHONE_VERIFY_FAIL:
      return {
        ...state,
        loading: false,
        error: {
          message: action.payload,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return initialState;
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
        user: null,
        signUpSuccess: false,
      };
    case SIGNUP_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        signUpSuccess: true,
      };
    default:
      return state;
  }
};
