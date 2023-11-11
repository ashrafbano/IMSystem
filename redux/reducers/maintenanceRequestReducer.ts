import { AnyAction } from "redux";
import {
  CLEAR_MAINTENANCE_REQUEST_STATE,
  GET_ADMIN_MAINTENANCE_REQUEST_FAIL,
  GET_ADMIN_MAINTENANCE_REQUEST_START,
  GET_ADMIN_MAINTENANCE_REQUEST_SUCCESS,
  GET_MAINTENANCE_REQUESTS_FAIL,
  GET_MAINTENANCE_REQUESTS_START,
  GET_MAINTENANCE_REQUESTS_SUCCESS,
  MAINTENANCE_REQUEST_FAIL,
  MAINTENANCE_REQUEST_START,
  MAINTENANCE_REQUEST_SUCCESS,
  SET_ADMIN_MAINTENANCE_REQUEST_FAIL,
  SET_ADMIN_MAINTENANCE_REQUEST_START,
  SET_ADMIN_MAINTENANCE_REQUEST_SUCCESS,
} from "../actions/maintenanceRequestActions";

const initalState = {
  loading: false,
  maintenanceRequestFail: false,
  maintenanceRequestSuccess: false,
  getMaintenanceSuccess: false,
  getMaintenanceFail: false,
  getMaintenanceLoading: false,
  maintenanceRequests: [],
  getAdminMaintenanceRequestsLoading: false,
  getAdminMaintenanceRequestsError: false,
  adminMaintenanceRequests: [],
  getAdminMaintenanceRequestsSuccess: false,
  setAdminMaintenanceRequestsLoading: false,
  setAdminMaintenanceRequestsSuccess: false,
  setAdminMaintenanceRequestsFail: false,
  setAdminMaintenanceRequestId: "",
  updatingMaintenanceId: "",
};

export const maintenanceRequest = (state = initalState, action: AnyAction) => {
  switch (action.type) {
    case MAINTENANCE_REQUEST_START:
      return {
        ...state,
        loading: true,
        maintenanceRequestFail: false,
        maintenanceRequestSuccess: false,
      };
    case MAINTENANCE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        maintenanceRequestFail: true,
        maintenanceRequestSuccess: false,
      };
    case MAINTENANCE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        maintenanceRequestFail: false,
        maintenanceRequestSuccess: true,
      };
    case CLEAR_MAINTENANCE_REQUEST_STATE:
      return {
        ...state,
        loading: false,
        maintenanceRequestFail: false,
        maintenanceRequestSuccess: false,
      };
    case GET_MAINTENANCE_REQUESTS_START:
      return {
        ...state,
        getMaintenanceSuccess: false,
        getMaintenanceFail: false,
        getMaintenanceLoading: true,
      };
    case GET_MAINTENANCE_REQUESTS_SUCCESS:
      return {
        ...state,
        getMaintenanceSuccess: true,
        getMaintenanceFail: false,
        getMaintenanceLoading: false,
        maintenanceRequests: action.payload,
      };
    case GET_MAINTENANCE_REQUESTS_FAIL:
      return {
        ...state,
        getMaintenanceSuccess: false,
        getMaintenanceFail: true,
        getMaintenanceLoading: false,
      };
    case GET_ADMIN_MAINTENANCE_REQUEST_START:
      return {
        ...state,
        getAdminMaintenanceRequestsLoading: true,
        getAdminMaintenanceRequestsError: false,
        adminMaintenanceRequests: [],
        getAdminMaintenanceRequestsSuccess: false,
      };
    case GET_ADMIN_MAINTENANCE_REQUEST_SUCCESS:
      return {
        ...state,
        getAdminMaintenanceRequestsLoading: false,
        getAdminMaintenanceRequestsError: false,
        adminMaintenanceRequests: action.payload,
        getAdminMaintenanceRequestsSuccess: true,
      };
    case GET_ADMIN_MAINTENANCE_REQUEST_FAIL:
      return {
        ...state,
        getAdminMaintenanceRequestsLoading: false,
        getAdminMaintenanceRequestsError: true,
        getAdminMaintenanceRequestsSuccess: false,
      };
    case SET_ADMIN_MAINTENANCE_REQUEST_START:
      return {
        ...state,
        setAdminMaintenanceRequestsLoading: true,
        setAdminMaintenanceRequestsSuccess: false,
        setAdminMaintenanceRequestsFail: false,
        setAdminMaintenanceRequestId: action.payload,
      };
    case SET_ADMIN_MAINTENANCE_REQUEST_SUCCESS:
      return {
        ...state,
        setAdminMaintenanceRequestsLoading: false,
        setAdminMaintenanceRequestsSuccess: true,
        setAdminMaintenanceRequestsFail: false,
        adminMaintenanceRequests: state.adminMaintenanceRequests.filter(
          (maintenanceRequest: any) => maintenanceRequest.id !== action.payload
        ),
        setAdminMaintenanceRequestId: "",
      };
    case SET_ADMIN_MAINTENANCE_REQUEST_FAIL:
      return {
        ...state,
        setAdminMaintenanceRequestsLoading: false,
        setAdminMaintenanceRequestsSuccess: false,
        setAdminMaintenanceRequestsFail: true,
      };
    default:
      return state;
  }
};
