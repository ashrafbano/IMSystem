import * as React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { DrawerStackNavigationProp } from "../drawer/Drawer";
import AdminHome from "../../screens/AdminHome";

type HomeStackParams = {
  AdminHome: undefined;
};

export type AdminHomeStackRoute = RouteProp<HomeStackParams, "AdminHome">;

export type AdminHomeStackNavigationProp = NativeStackNavigationProp<
  HomeStackParams,
  "AdminHome"
>;

export type HomeStackProps = {
  route: AdminHomeStackRoute;
  navigation: AdminHomeStackNavigationProp;
};

const Stack = createNativeStackNavigator<HomeStackParams>();

interface IProps {
  drawerNavigation: DrawerStackNavigationProp;
}

export const AdminHomeStack: React.FC<IProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHomeStack" component={AdminHome} />
    </Stack.Navigator>
  );
};
