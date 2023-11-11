import { AnyAction } from "redux";
import { RootState, ThunkAction } from "../store";
import { get, getDatabase, ref, set } from "firebase/database";

export const MAINTENANCE_REQUEST_START = "MAINTENANCE_REQUEST_START";
export const MAINTENANCE_REQUEST_SUCCESS = "MAINTENANCE_REQUEST_SUCCESS";
export const MAINTENANCE_REQUEST_FAIL = "MAINTENANCE_REQUEST_FAIL";

export const GET_MAINTENANCE_REQUESTS_START = "GET_MAINTENANCE_REQUESTS_START";
export const GET_MAINTENANCE_REQUESTS_SUCCESS =
  "GET_MAINTENANCE_REQUESTS_SUCCESS";
export const GET_MAINTENANCE_REQUESTS_FAIL = "GET_MAINTENANCE_REQUESTS_FAIL";

export const GET_ADMIN_MAINTENANCE_REQUEST_START =
  "GET_ADMIN_MAINTENANCE_REQUEST_START";
export const GET_ADMIN_MAINTENANCE_REQUEST_SUCCESS =
  "GET_ADMIN_MAINTENANCE_REQUEST_SUCCESS";
export const GET_ADMIN_MAINTENANCE_REQUEST_FAIL =
  "GET_ADMIN_MAINTENANCE_REQUEST_FAIL";

export const SET_ADMIN_MAINTENANCE_REQUEST_START =
  "SET_ADMIN_MAINTENANCE_REQUEST_START";
export const SET_ADMIN_MAINTENANCE_REQUEST_SUCCESS =
  "SET_ADMIN_MAINTENANCE_REQUEST_SUCCESS";
export const SET_ADMIN_MAINTENANCE_REQUEST_FAIL =
  "SET_ADMIN_MAINTENANCE_REQUEST_FAIL";

export const CLEAR_MAINTENANCE_REQUEST_STATE =
  "CLEAR_MAINTENANCE_REQUEST_STATE";

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

export const submitMaintenanceRequest = (
  issue: string,
  issueDescription: string,
  roomNumber: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: MAINTENANCE_REQUEST_START });

      const user = getState().auth.user;
      const dbRef = ref(getDatabase(), `/maintenanceRequests/${user.phone}`);

      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();

      const maintenanceRequests = userData || [];

      const newMaintenanceRequest = {
        issue,
        issueDescription,
        roomNumber,
        status: "CREATED",
        name: user.name,
        phone: user.phone,
        id: generateUniqueString(20, user.phone),
        createdDate: new Date().toDateString(),
      };

      maintenanceRequests.push(newMaintenanceRequest);
      set(dbRef, { ...maintenanceRequests })
        .then((snapshot) => {
          dispatch({ type: MAINTENANCE_REQUEST_SUCCESS });
        })
        .catch(() => {
          dispatch({
            type: MAINTENANCE_REQUEST_FAIL,
            payload: "Let us debug this, but you need to retry",
          });
        });
    } catch (error) {
      dispatch({
        type: MAINTENANCE_REQUEST_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const getMaintenanceRequests = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: GET_MAINTENANCE_REQUESTS_START });
      const user = getState().auth.user;
      const dbRef = ref(getDatabase(), `/maintenanceRequests/${user.phone}`);
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      dispatch({ type: GET_MAINTENANCE_REQUESTS_SUCCESS, payload: userData });
    } catch (error) {
      dispatch({
        type: GET_MAINTENANCE_REQUESTS_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const getAdminMaintenanceRequests = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      const dbRef = ref(getDatabase(), `/maintenanceRequests`);
      dispatch({ type: GET_ADMIN_MAINTENANCE_REQUEST_START });
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      const adminMaintenanceRequests = Object.keys(userData).reduce(
        (acc, key) => {
          const arr = acc;
          arr.push(...userData[key]);
          return arr;
        },
        []
      );
      dispatch({
        type: GET_ADMIN_MAINTENANCE_REQUEST_SUCCESS,
        payload: adminMaintenanceRequests,
      });
    } catch (error) {
      dispatch({
        type: GET_ADMIN_MAINTENANCE_REQUEST_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const setMaintenanceRequest = (
  maintenanceRequest: any,
  status: "CREATED" | "APPROVED" | "REJECTED"
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      const dbRef = ref(
        getDatabase(),
        `/maintenanceRequests/${maintenanceRequest.phone}`
      );
      dispatch({
        type: SET_ADMIN_MAINTENANCE_REQUEST_START,
        payload: maintenanceRequest.id,
      });
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      let maintenanceRequests = userData || [];

      const newmaintenanceRequest = {
        ...maintenanceRequest,
        status,
        approved: status === "APPROVED",
        adminApproved: true,
      };
      maintenanceRequests = maintenanceRequests.filter(
        (request: any) => request.id !== maintenanceRequest.id
      );
      maintenanceRequests.push(newmaintenanceRequest);
      set(dbRef, { ...maintenanceRequests })
        .then((snapshot) => {
          dispatch({
            type: SET_ADMIN_MAINTENANCE_REQUEST_SUCCESS,
            payload: maintenanceRequest.id,
          });
          dispatch(getMaintenanceRequests());
        })
        .catch(() => {
          dispatch({
            type: SET_ADMIN_MAINTENANCE_REQUEST_FAIL,
            payload: "Let us debug this, but you need to retry",
          });
        });
    } catch (error) {
      dispatch({
        type: SET_ADMIN_MAINTENANCE_REQUEST_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};
