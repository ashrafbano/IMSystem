import { AnyAction } from "redux";
import {
  CLEAR_FEEDBACK_REQUEST_STATE,
  GET_FEEDBACK_FAIL,
  GET_FEEDBACK_START,
  GET_FEEDBACK_SUCCESS,
  POST_FEEDBACK_FAIL,
  POST_FEEDBACK_START,
  POST_FEEDBACK_SUCCESS,
} from "../actions/feedbackActions";

const initalState = {
  loading: false,
  feedbackRequestFail: false,
  feedbackRequestSuccess: false,
  feedbacks: [],
  getFeedbackLoading: false,
  getFeedbackError: false,
};

export const feedback = (state = initalState, action: AnyAction) => {
  switch (action.type) {
    case POST_FEEDBACK_START:
      return {
        ...state,
        loading: true,
        feedbackRequestFail: false,
        feedbackRequestSuccess: false,
      };
    case POST_FEEDBACK_FAIL:
      return {
        ...state,
        loading: false,
        feedbackRequestFail: true,
        feedbackRequestSuccess: false,
      };
    case POST_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        feedbackRequestFail: false,
        feedbackRequestSuccess: true,
      };
    case CLEAR_FEEDBACK_REQUEST_STATE:
      return {
        ...state,
        loading: false,
        feedbackRequestFail: false,
        feedbackRequestSuccess: false,
      };
    case GET_FEEDBACK_START:
      return {
        ...state,
        getFeedbackLoading: true,
        getFeedbackError: false,
      };
    case GET_FEEDBACK_SUCCESS:
      return {
        ...state,
        getFeedbackLoading: false,
        getFeedbackError: false,
        feedbacks: action.payload,
      };
    case GET_FEEDBACK_FAIL:
      return {
        ...state,
        getFeedbackLoading: false,
        getFeedbackError: true,
      };
    default:
      return state;
  }
};
