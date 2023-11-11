import { AnyAction } from "redux";
import { RootState, ThunkAction } from "../store";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { HolidayRequest } from "../../types/holidayRequest";

export const HOLIDAY_REQUEST_START = "HOLIDAY_REQUEST_START";
export const HOLIDAY_REQUEST_SUCCESS = "HOLIDAY_REQUEST_SUCCESS";
export const HOLIDAY_REQUEST_FAIL = "HOLIDAY_REQUEST_FAIL";

export const GET_HOLIDAY_REQUEST_START = "GET_HOLIDAY_REQUEST_START";
export const GET_HOLIDAY_REQUEST_SUCCESS = "GET_HOLIDAY_REQUEST_SUCCESS";
export const GET_HOLIDAY_REQUEST_FAIL = "GET_HOLIDAY_REQUEST_FAIL";

export const GET_PREVIOUS_HOLIDAY_REQUEST_START =
  "GET_PREVIOUS_HOLIDAY_REQUEST_START";
export const GET_PREVIOUS_HOLIDAY_REQUEST_SUCCESS =
  "GET_PREVIOUS_HOLIDAY_REQUEST_SUCCESS";
export const GET_PREVIOUS_HOLIDAY_REQUEST_FAIL =
  "GET_PREVIOUS_HOLIDAY_REQUEST_FAIL";

export const GET_ADMIN_HOLIDAY_REQUEST_START =
  "GET_ADMIN_HOLIDAY_REQUEST_START";
export const GET_ADMIN_HOLIDAY_REQUEST_SUCCESS =
  "GET_ADMIN_HOLIDAY_REQUEST_SUCCESS";
export const GET_ADMIN_HOLIDAY_REQUEST_FAIL = "GET_ADMIN_HOLIDAY_REQUEST_FAIL";

export const GET_ADMIN_APPROVED_HOLIDAY_REQUEST_START =
  "GET_ADMIN_APPROVED_HOLIDAY_REQUEST_START";
export const GET_ADMIN_APPROVED_HOLIDAY_REQUEST_SUCCESS =
  "GET_ADMIN_APPROVED_HOLIDAY_REQUEST_SUCCESS";
export const GET_ADMIN_APPROVED_HOLIDAY_REQUEST_FAIL =
  "GET_ADMIN_APPROVED_HOLIDAY_REQUEST_FAIL";

export const SET_ADMIN_HOLIDAY_REQUEST_START =
  "SET_ADMIN_HOLIDAY_REQUEST_START";
export const SET_ADMIN_HOLIDAY_REQUEST_SUCCESS =
  "SET_ADMIN_HOLIDAY_REQUEST_SUCCESS";
export const SET_ADMIN_HOLIDAY_REQUEST_FAIL = "SET_ADMIN_HOLIDAY_REQUEST_FAIL";

export const CLEAR_HOLIDAY_REQUEST_STATE = "CLEAR_HOLIDAY_REQUEST_STATE";
export const CLEAR_PREVIOUS_HOLIDAY_REQUEST_STATE =
  "CLEAR_PREVIOUS_HOLIDAY_REQUEST_STATE";

function generateUniqueString(length: number = 15, phone: string) {
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?${phone}`;
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

async function sendPushNotification(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };
  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error);
  }
}

export const submitHolidayRequest = (
  phone: string,
  reason: string,
  noOfDays: number,
  startDate: Date,
  endDate: Date
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      const dbRef = ref(getDatabase(), `/holidayRequests/${user.phone}`);
      dispatch({ type: HOLIDAY_REQUEST_START });
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      const userRef = ref(getDatabase());
      let adminToken = "";
      const snapshot = await get(child(userRef, `users/+917093916628`));
      const holidayRequests = userData || [];
      const newHolidayRequest = {
        phone,
        reason,
        noOfDays,
        status: "CREATED",
        name: user.name,
        userPhone: user.phone,
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        id: generateUniqueString(20, user.phone),
        adminToken,
        createdDate: new Date().toDateString(),
        branch: user.branch,
        roomNumber: user.roomNumber,
      };

      holidayRequests.push(newHolidayRequest);
      set(dbRef, { ...holidayRequests })
        .then((snapshot) => {
          dispatch({ type: HOLIDAY_REQUEST_SUCCESS });
          // sendPushNotification(adminToken);
        })
        .catch(() => {
          dispatch({
            type: HOLIDAY_REQUEST_FAIL,
            payload: "Let us debug this, but you need to retry",
          });
        });
    } catch (error) {
      dispatch({
        type: HOLIDAY_REQUEST_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const getHolidayRequests = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      const dbRef = ref(getDatabase(), `/holidayRequests/${user.phone}`);
      dispatch({ type: GET_HOLIDAY_REQUEST_START });
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      dispatch({ type: GET_HOLIDAY_REQUEST_SUCCESS, payload: userData });
    } catch (error) {
      dispatch({
        type: GET_HOLIDAY_REQUEST_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const getPreviousHolidayRequests = (
  phone: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: GET_PREVIOUS_HOLIDAY_REQUEST_START });
      const dbRef = ref(getDatabase(), `/holidayRequests/${phone}`);
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      dispatch({
        type: GET_PREVIOUS_HOLIDAY_REQUEST_SUCCESS,
        payload: userData,
      });
    } catch (error) {
      dispatch({
        type: GET_PREVIOUS_HOLIDAY_REQUEST_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const setHolidayRequest = (
  holidayRequest: HolidayRequest,
  status: "CREATED" | "APPROVED" | "REJECTED"
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      const dbRef = ref(
        getDatabase(),
        `/holidayRequests/${holidayRequest.userPhone}`
      );
      dispatch({
        type: SET_ADMIN_HOLIDAY_REQUEST_START,
        payload: holidayRequest.id,
      });
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      let holidayRequests = userData || [];

      const newHolidayRequest = {
        ...holidayRequest,
        status,
        approved: status === "APPROVED",
        adminApproved: true,
      };
      holidayRequests = holidayRequests.filter(
        (request: HolidayRequest) => request.id !== holidayRequest.id
      );
      holidayRequests.push(newHolidayRequest);
      set(dbRef, { ...holidayRequests })
        .then((snapshot) => {
          dispatch({
            type: SET_ADMIN_HOLIDAY_REQUEST_SUCCESS,
            payload: holidayRequest.id,
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: SET_ADMIN_HOLIDAY_REQUEST_FAIL,
            payload: "Let us debug this, but you need to retry",
          });
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_ADMIN_HOLIDAY_REQUEST_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const getAdminHolidayRequests = (
  getApprovedRequests: boolean = false
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      const dbRef = ref(getDatabase(), `/holidayRequests`);
      dispatch({ type: GET_ADMIN_HOLIDAY_REQUEST_START });
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      const adminRequests = Object.keys(userData).reduce((acc, key) => {
        const arr = acc;
        arr.push(...userData[key]);
        return arr;
      }, []);
      dispatch({
        type: GET_ADMIN_HOLIDAY_REQUEST_SUCCESS,
        payload: getApprovedRequests
          ? adminRequests.filter(
              (holidyRequest: HolidayRequest) => holidyRequest.approved
            )
          : adminRequests.filter(
              (holidyRequest: HolidayRequest) => !holidyRequest.adminApproved
            ),
      });
    } catch (error) {
      dispatch({
        type: GET_ADMIN_HOLIDAY_REQUEST_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const getAdminApprovedHolidayRequests = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      const dbRef = ref(getDatabase(), `/holidayRequests`);
      dispatch({ type: GET_ADMIN_APPROVED_HOLIDAY_REQUEST_START });
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      const adminRequests = Object.keys(userData).reduce((acc, key) => {
        const arr = acc;
        arr.push(...userData[key]);
        return arr;
      }, []);
      dispatch({
        type: GET_ADMIN_APPROVED_HOLIDAY_REQUEST_SUCCESS,
        payload: adminRequests.filter(
          (holidyRequest: HolidayRequest) => holidyRequest.approved
        ),
      });
    } catch (error) {
      dispatch({
        type: GET_ADMIN_APPROVED_HOLIDAY_REQUEST_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};
