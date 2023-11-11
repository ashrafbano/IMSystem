import { applyMiddleware, combineReducers, createStore, Action } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { auth } from "./reducers/authReducer";
import { holidayRequest } from "./reducers/holidayRequestReducer";
import { navigationReducer } from "./reducers/navigationReducer";
import { maintenanceRequest } from "./reducers/maintenanceRequestReducer";
import { feedback } from "./reducers/feedbackReducer";
import { student } from "./reducers/studentReducer";

const rootReducer = combineReducers({
  auth: auth,
  holidayRequest: holidayRequest,
  navigation: navigationReducer,
  maintenanceRequest: maintenanceRequest,
  feedback: feedback,
  student: student,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R;
