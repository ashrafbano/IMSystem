import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { UserHome } from "../../screens/UserHome";
import { HolidayRequest } from "../../screens/HolidayRequest";
import { DrawerStackNavigationProp } from "../drawer/Drawer";

type HomeStackParams = {
  UserHome: undefined;
  HolidayRequest: undefined;
};

export type UserHomeStackRoute = RouteProp<HomeStackParams, "UserHome">;

export type HolidayRequestRoute = RouteProp<HomeStackParams, "HolidayRequest">;

export type UserHomeStackNavigationProp = NativeStackNavigationProp<
  HomeStackParams,
  "UserHome"
>;

export type HomeStackProps = {
  route: UserHomeStackRoute;
  navigation: UserHomeStackNavigationProp;
};

const Stack = createNativeStackNavigator<HomeStackParams>();

interface IProps {
  drawerNavigation: DrawerStackNavigationProp;
}

export const HomeStack: React.FC<IProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserHome" component={UserHome} />
      <Stack.Screen name="HolidayRequest" component={HolidayRequest} />
    </Stack.Navigator>
  );
};
