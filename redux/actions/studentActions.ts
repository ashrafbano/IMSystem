import { AnyAction } from "redux";
import { RootState, ThunkAction } from "../store";
import { child, get, getDatabase, ref, set } from "firebase/database";

export const GET_STUDENT_START = "GET_STUDENT_START";
export const GET_STUDENT_SUCCESS = "GET_STUDENT_SUCCESS";
export const GET_STUDENT_FAIL = "GET_STUDENT_FAIL";

export const SET_STUDENT_STATUS_START = "SET_STUDENT_STATUS_START";
export const SET_STUDENT_STATUS__SUCCESS = "SET_STUDENT_STATUS__SUCCESS";
export const SET_STUDENT_STATUS__FAIL = "SET_STUDENT_STATUS__FAIL";

export const CLEAR_STUDENT_STATE = "CLEAR_STUDENT_STATE";

export const getStudent = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: GET_STUDENT_START });
      const dbRef = ref(getDatabase(), `/users`);
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      const studentsArray = [];
      for (const key in userData) {
        if (!userData[key].adminApproval)
          studentsArray.push({
            ...userData[key],
            id: key,
          });
      }
      dispatch({
        type: GET_STUDENT_SUCCESS,
        payload: studentsArray.filter((s) => !s.approved),
      });
    } catch (error) {
      dispatch({
        type: GET_STUDENT_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const setStatus = (
  phone: string,
  status: "APPROVED" | "REJECTED"
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_STUDENT_STATUS_START, payload: phone });
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `users/${phone}`));
      const user = snapshot.toJSON();
      if (!user) {
        return;
      }
      const setDbRef = ref(getDatabase(), `/users/${phone}`);
      await set(setDbRef, {
        phone,
        name: user.name,
        yearOfPassing: user.yearOfPassing,
        branch: user.branch,
        roomNumber: user.roomNumber,
        approved: status === "APPROVED",
        adminApproval: true,
      });
      dispatch({ type: SET_STUDENT_STATUS__SUCCESS, payload: phone });
    } catch (error) {
      dispatch({ type: SET_STUDENT_STATUS__FAIL, payload: error });
    }
  };
};
