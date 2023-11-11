import { AnyAction } from "redux";
import { SET_DRAWER_NAVIGATOR } from "../actions/navigationActions";
import { DrawerStackNavigationProp } from "../../routes/drawer/Drawer";

const initialState: {
  drawerNavigator: null | DrawerStackNavigationProp;
} = {
  drawerNavigator: null,
};

export const navigationReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_DRAWER_NAVIGATOR:
      return {
        ...state,
        drawerNavigator: action.payload,
      };
    default:
      return state;
  }
};
