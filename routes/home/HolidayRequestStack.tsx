import * as React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { DrawerStackNavigationProp } from "../drawer/Drawer";
import HolidayRequestHome from "../../screens/AdminHome";
import { AdminHolidayRequests } from "../../screens/AdminHolidayRequests";
import PreviousHolidayRequests from "../../screens/PreviousHolidayRequests";
import { HolidayRequest } from "../../types/holidayRequest";

type HomeStackParams = {
  HolidayRequestHome: undefined;
  PreviousHolidayRequests: {
    phone: string;
    holidayRequest: HolidayRequest;
  };
};

export type HolidayRequestHomeStackRoute = RouteProp<
  HomeStackParams,
  "HolidayRequestHome"
>;

export type HolidayRequestHomeStackNavigationProp = NativeStackNavigationProp<
  HomeStackParams,
  "HolidayRequestHome"
>;

export type HomeStackProps = {
  route: HolidayRequestHomeStackRoute;
  navigation: HolidayRequestHomeStackNavigationProp;
};

const Stack = createNativeStackNavigator<HomeStackParams>();

interface IProps {
  drawerNavigation: DrawerStackNavigationProp;
}

export const HolidayRequestHomeStack: React.FC<IProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HolidayRequestHome"
        component={AdminHolidayRequests}
      />
      <Stack.Screen
        name="PreviousHolidayRequests"
        component={PreviousHolidayRequests}
      />
    </Stack.Navigator>
  );
};
