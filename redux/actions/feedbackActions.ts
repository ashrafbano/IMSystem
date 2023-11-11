import { AnyAction } from "redux";
import { RootState, ThunkAction } from "../store";
import { get, getDatabase, ref, set } from "firebase/database";

export const POST_FEEDBACK_START = "POST_FEEDBACK_START";
export const POST_FEEDBACK_SUCCESS = "POST_FEEDBACK_SUCCESS";
export const POST_FEEDBACK_FAIL = "POST_FEEDBACK_FAIL";

export const GET_FEEDBACK_START = "GET_FEEDBACK_START";
export const GET_FEEDBACK_SUCCESS = "GET_FEEDBACK_SUCCESS";
export const GET_FEEDBACK_FAIL = "GET_FEEDBACK_FAIL";

export const CLEAR_FEEDBACK_REQUEST_STATE = "CLEAR_FEEDBACK_REQUEST_STATE";

export const submitFeedback = (
  hostelName: string,
  mealType: string,
  mealQuality: number,
  serviceQuality: number,
  tasteAndFlavour: number,
  freshnessOfIngredients: number,
  sizeOfPortions: number,
  worthOfMealOverPrice: number,
  comments: string = ""
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      const dbRef = ref(getDatabase(), `/feedbacks/${user.phone}`);
      dispatch({ type: POST_FEEDBACK_START });
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();

      const feedbacks = userData || [];

      const newFeedback = {
        name: user.name,
        userPhone: user.phone,
        hostelName,
        mealType,
        mealQuality,
        serviceQuality,
        tasteAndFlavour,
        freshnessOfIngredients,
        sizeOfPortions,
        worthOfMealOverPrice,
        comments,
        createdDate: new Date().toDateString(),
      };

      feedbacks.push(newFeedback);
      set(dbRef, { ...feedbacks })
        .then((snapshot) => {
          dispatch({ type: POST_FEEDBACK_SUCCESS });
        })
        .catch(() => {
          dispatch({
            type: POST_FEEDBACK_FAIL,
            payload: "Let us debug this, but you need to retry",
          });
        });
    } catch (error) {
      dispatch({
        type: POST_FEEDBACK_FAIL,
        payload: "Let us debug this, but you need to retry",
      });
    }
  };
};

export const getFeedbacks = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      const dbRef = ref(getDatabase(), `/feedbacks`);
      dispatch({ type: GET_FEEDBACK_START });
      const userSnapshot = await get(dbRef);
      const userData = userSnapshot.val();
      const feedbacks = Object.keys(userData).reduce((acc, key) => {
        const arr = acc;
        arr.push(...userData[key]);
        return arr;
      }, []);
      dispatch({
        type: GET_FEEDBACK_SUCCESS,
        payload: feedbacks,
      });
    } catch (error) {
      dispatch({ type: GET_FEEDBACK_FAIL, payload: error });
    }
  };
};
