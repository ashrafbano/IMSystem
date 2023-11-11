import { AnyAction } from "redux";
import {
  GET_STUDENT_SUCCESS,
  GET_STUDENT_START,
  CLEAR_STUDENT_STATE,
  GET_STUDENT_FAIL,
  SET_STUDENT_STATUS_START,
  SET_STUDENT_STATUS__SUCCESS,
  SET_STUDENT_STATUS__FAIL,
} from "../actions/studentActions";

const initalState = {
  loading: false,
  getStudentFail: false,
  students: [],
  getStudentSuccess: false,
  setStudentStatusLoading: false,
  setStudentStatusError: false,
  setStudentStatusPhone: null,
  setStudentStatusSuccess: false,
};

export const student = (state = initalState, action: AnyAction) => {
  switch (action.type) {
    case GET_STUDENT_START:
      return {
        ...state,
        loading: true,
        getStudentFail: false,
        getStudentSuccess: false,
      };
    case GET_STUDENT_FAIL:
      return {
        ...state,
        loading: false,
        getStudentFail: true,
        getStudentSuccess: false,
      };
    case GET_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        getStudentFail: false,
        getStudentSuccess: true,
        students: action.payload,
      };
    case CLEAR_STUDENT_STATE:
      return {
        ...state,
        loading: false,
        getStudentFail: false,
        getStudentSuccess: false,
      };
    case SET_STUDENT_STATUS_START:
      return {
        ...state,
        setStudentStatusLoading: true,
        setStudentStatusError: false,
        setStudentStatusPhone: action.payload,
        setStudentStatusSuccess: false,
      };
    case SET_STUDENT_STATUS__SUCCESS:
      return {
        ...state,
        setStudentStatusLoading: false,
        setStudentStatusError: false,
        setStudentStatusPhone: null,
        setStudentStatusSuccess: true,
        students: state.students.filter(
          (student) => student.phone !== action.payload
        ),
      };
    case SET_STUDENT_STATUS__FAIL:
      return {
        ...state,
        setStudentStatusLoading: false,
        setStudentStatusError: true,
        setStudentStatusPhone: null,
        setStudentStatusSuccess: false,
      };
    default:
      return state;
  }
};
