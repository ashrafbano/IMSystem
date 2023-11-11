import { getDatabase, ref, child, get, set } from "firebase/database";
import { AppDispatch, RootState } from "../store";
import auth from "firebase/auth";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const PHONE_VERIFY_SUCCESS = "PHONE_VERIFY_SUCCESS";
export const PHONE_VERIFY_FAIL = "PHONE_VERIFY_FAIL";
export const PHONE_VERIFY_START = "PHONE_VERIFY_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const CLEAR_AUTH_ERRORS = "CLEAR_AUTH_ERRORS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const checkPhone = (
  onSuccess: () => void,
  dispatch: AppDispatch,
  phone: string,
  login = false
) => {
  const dbRef = ref(getDatabase());
  console.log(phone);
  dispatch({ type: PHONE_VERIFY_START });
  get(child(dbRef, `users/+91${phone}`))
    .then((snapshot) => {
      if ((!snapshot.exists() && !login) || (snapshot.exists() && login)) {
        const user = snapshot.toJSON();
        if (user) {
          if (!user.approved) {
            return dispatch({
              type: PHONE_VERIFY_FAIL,
              payload: login
                ? "This phone is not allowed to sign in, \nUntil admin approves"
                : "This phone is already registered with us, \nplease try to login",
            });
          }
        }

        onSuccess();
      } else {
        dispatch({
          type: PHONE_VERIFY_FAIL,
          payload: login
            ? "This phone is not allowed to sign in, \nOnly students can sign in"
            : "This phone is already registered with us, \nplease try to login",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: PHONE_VERIFY_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    });
};

export const signUp = (
  phone: string,
  name: string,
  yearOfPassing: string,
  branch: string,
  roomNumber: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const dbRef = ref(getDatabase(), `/users/+91${phone}`);
      dispatch({ type: SIGNUP_START });
      set(dbRef, {
        phone,
        name,
        yearOfPassing,
        branch,
        roomNumber,
        approved: false,
      })
        .then((snapshot) => {
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: { phone, name, yearOfPassing, branch, roomNumber },
          });
        })
        .catch(() => {
          dispatch({
            type: SIGNUP_FAIL,
            payload: "Let us debug this, but you need to retry",
          });
        });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const getUser = (
  phone: string | null,
  user: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      if (!phone) {
        return;
      }
      console.log(phone);
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${phone}`))
        .then((snapshot) => {
          if (snapshot.toJSON()?.approved!) {
            const jsonSnapshot = snapshot.toJSON();
            dispatch({
              type: LOGIN_SUCCESS,
              payload: { ...user, ...jsonSnapshot },
            });
            // if (expoToken) {
            //   const expoTokenRef = ref(getDatabase(), `/users/${phone}`);
            //   set(expoTokenRef, {
            //     phone,
            //     name: jsonSnapshot?.name,
            //     yearOfPassing: jsonSnapshot?.yearOfPassing,
            //     branch: jsonSnapshot?.branch,
            //     roomNumber: jsonSnapshot?.roomNumber,
            //     approved: true,
            //   });
            // }
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_FAIL });
    }
  };
};
