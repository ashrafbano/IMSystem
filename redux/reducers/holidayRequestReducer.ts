import { AnyAction } from "redux";
import {
  CLEAR_HOLIDAY_REQUEST_STATE,
  CLEAR_PREVIOUS_HOLIDAY_REQUEST_STATE,
  GET_ADMIN_APPROVED_HOLIDAY_REQUEST_FAIL,
  GET_ADMIN_APPROVED_HOLIDAY_REQUEST_START,
  GET_ADMIN_APPROVED_HOLIDAY_REQUEST_SUCCESS,
  GET_ADMIN_HOLIDAY_REQUEST_FAIL,
  GET_ADMIN_HOLIDAY_REQUEST_START,
  GET_ADMIN_HOLIDAY_REQUEST_SUCCESS,
  GET_HOLIDAY_REQUEST_START,
  GET_HOLIDAY_REQUEST_SUCCESS,
  GET_PREVIOUS_HOLIDAY_REQUEST_FAIL,
  GET_PREVIOUS_HOLIDAY_REQUEST_START,
  GET_PREVIOUS_HOLIDAY_REQUEST_SUCCESS,
  HOLIDAY_REQUEST_FAIL,
  HOLIDAY_REQUEST_START,
  HOLIDAY_REQUEST_SUCCESS,
  SET_ADMIN_HOLIDAY_REQUEST_FAIL,
  SET_ADMIN_HOLIDAY_REQUEST_START,
  SET_ADMIN_HOLIDAY_REQUEST_SUCCESS,
} from "../actions/holidayRequestActions";
import { HolidayRequest } from "../../types/holidayRequest";

const initalState = {
  loading: false,
  holidayRequestFail: false,
  holidayRequestSuccess: false,
  getHolidayLoading: false,
  getHolidayFail: false,
  holidayRequests: [],
  getAdminHolidayRequestsLoading: false,
  getAdminHolidayRequestsError: false,
  adminHolidayRequests: [],
  getAdminHolidayRequestsSuccess: false,
  setAdminHolidayRequestsLoading: false,
  setAdminHolidayRequestsSuccess: false,
  setAdminHolidayRequestsFail: false,
  setAdminHolidayRequestId: "",
  previousHolidayRequestsLoading: false,
  previousHolidayRequestsSuccess: false,
  previousHolidayRequestsFail: false,
  previousHolidayRequests: [],
  getAdminApprovedHolidayRequestsLoading: false,
  getAdminApprovedHolidayRequestsError: false,
  getAdminApprovedHolidayRequestsSuccess: false,
  adminApprovedHolidayRequests: [],
};

export const holidayRequest = (state = initalState, action: AnyAction) => {
  switch (action.type) {
    case HOLIDAY_REQUEST_START:
      return {
        ...state,
        loading: true,
        holidayRequestFail: false,
        holidayRequestSuccess: false,
      };
    case HOLIDAY_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        holidayRequestFail: true,
        holidayRequestSuccess: false,
      };
    case HOLIDAY_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        holidayRequestFail: false,
        holidayRequestSuccess: true,
      };
    case CLEAR_HOLIDAY_REQUEST_STATE:
      return {
        ...state,
        loading: false,
        holidayRequestFail: false,
        holidayRequestSuccess: false,
        setAdminHolidayRequestsLoading: false,
        setAdminHolidayRequestsSuccess: false,
        setAdminHolidayRequestsFail: false,
        setAdminHolidayRequestId: "",
      };
    case GET_HOLIDAY_REQUEST_START:
      return {
        ...state,
        getHolidayLoading: true,
        getHolidayFail: false,
      };
    case GET_HOLIDAY_REQUEST_SUCCESS:
      return {
        ...state,
        getHolidayLoading: false,
        getHolidayFail: false,
        holidayRequests: action.payload,
      };
    case GET_HOLIDAY_REQUEST_START:
      return {
        ...state,
        getHolidayLoading: false,
        getHolidayFail: true,
      };
    case SET_ADMIN_HOLIDAY_REQUEST_START:
      return {
        ...state,
        setAdminHolidayRequestsLoading: true,
        setAdminHolidayRequestsSuccess: false,
        setAdminHolidayRequestsFail: false,
        setAdminHolidayRequestId: action.payload,
      };
    case SET_ADMIN_HOLIDAY_REQUEST_SUCCESS:
      return {
        ...state,
        setAdminHolidayRequestsLoading: false,
        setAdminHolidayRequestsSuccess: true,
        setAdminHolidayRequestsFail: false,
        adminHolidayRequests: state.adminHolidayRequests.filter(
          (holidayRequest: HolidayRequest) =>
            holidayRequest.id !== action.payload
        ),
        setAdminHolidayRequestId: "",
      };
    case SET_ADMIN_HOLIDAY_REQUEST_FAIL:
      return {
        ...state,
        setAdminHolidayRequestsLoading: false,
        setAdminHolidayRequestsSuccess: false,
        setAdminHolidayRequestsFail: true,
      };
    case GET_ADMIN_HOLIDAY_REQUEST_SUCCESS:
      return {
        ...state,
        getAdminHolidayRequestsLoading: false,
        getAdminHolidayRequestsError: false,
        adminHolidayRequests: action.payload,
        getAdminHolidayRequestsSuccess: true,
      };
    case GET_ADMIN_HOLIDAY_REQUEST_START:
      return {
        ...state,
        getAdminHolidayRequestsLoading: true,
        getAdminHolidayRequestsError: false,
        getAdminHolidayRequestsSuccess: false,
      };
    case GET_ADMIN_HOLIDAY_REQUEST_FAIL:
      return {
        ...state,
        getAdminHolidayRequestsLoading: false,
        getAdminHolidayRequestsError: true,
        getAdminHolidayRequestsSuccess: false,
      };
    case GET_ADMIN_APPROVED_HOLIDAY_REQUEST_SUCCESS:
      return {
        ...state,
        getAdminApprovedHolidayRequestsLoading: false,
        getAdminApprovedHolidayRequestsError: false,
        adminApprovedHolidayRequests: action.payload,
        getAdminApprovedHolidayRequestsSuccess: true,
      };
    case GET_ADMIN_APPROVED_HOLIDAY_REQUEST_START:
      return {
        ...state,
        getAdminApprovedHolidayRequestsLoading: true,
        getAdminApprovedHolidayRequestsError: false,
        getAdminApprovedHolidayRequestsSuccess: false,
      };
    case GET_ADMIN_APPROVED_HOLIDAY_REQUEST_FAIL:
      return {
        ...state,
        getAdminApprovedHolidayRequestsLoading: false,
        getAdminApprovedHolidayRequestsError: true,
        getAdminApprovedHolidayRequestsSuccess: false,
      };
    case GET_PREVIOUS_HOLIDAY_REQUEST_START:
      return {
        ...state,
        previousHolidayRequestsLoading: true,
        previousHolidayRequestsSuccess: false,
        previousHolidayRequestsFail: false,
        previousHolidayRequests: [],
      };
    case GET_PREVIOUS_HOLIDAY_REQUEST_SUCCESS:
      return {
        ...state,
        previousHolidayRequestsLoading: false,
        previousHolidayRequestsSuccess: true,
        previousHolidayRequestsFail: false,
        previousHolidayRequests: action.payload,
      };
    case GET_PREVIOUS_HOLIDAY_REQUEST_FAIL:
      return {
        ...state,
        previousHolidayRequestsLoading: false,
        previousHolidayRequestsSuccess: false,
        previousHolidayRequestsFail: true,
        previousHolidayRequests: [],
      };
    case CLEAR_PREVIOUS_HOLIDAY_REQUEST_STATE:
      return {
        ...state,
        previousHolidayRequestsLoading: false,
        previousHolidayRequestsSuccess: false,
        previousHolidayRequestsFail: false,
        previousHolidayRequests: [],
      };
    default:
      return state;
  }
};
