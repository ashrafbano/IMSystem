import {
  DrawerNavigationOptions,
  DrawerNavigationProp,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { HomeTab } from "../home/HomeTab";
import { DrawerContent } from "./DrawerContent";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { moderateScale } from "../../utils/fontScaling";
import { Maintenance } from "../../screens/Maintenance";
import MyHolidayRequests from "../../screens/MyHolidayRequests";
import { MyMaintenanceRequests } from "../../screens/MyMaintenanceRequests";

const Drawer = createDrawerNavigator();

type DrawerStackParams = {
  Home: undefined;
};

export type DrawerStackNavigationProp = DrawerNavigationProp<
  DrawerStackParams,
  "Home"
>;

const HomeOptions = (color: string): DrawerNavigationOptions => ({
  drawerActiveBackgroundColor: "#faac0f",
  drawerActiveTintColor: "#fff",
  drawerInactiveTintColor: "#4A4A4A",
  drawerIcon: ({ focused, size }) => (
    <Ionicons
      size={23}
      name={focused ? "home" : "home-outline"}
      color={focused ? "#fff" : color}
    />
  ),
  drawerLabel: ({ focused }) => (
    <Text
      style={{
        color: focused ? "#fff" : color,
        fontFamily: "PoppinsMedium",
        fontSize: moderateScale(15, 0.5),
      }}
    >
      Home
    </Text>
  ),
});

const MaintenanceOptions = (color: string): DrawerNavigationOptions => ({
  drawerActiveBackgroundColor: "#faac0f",
  drawerActiveTintColor: "#fff",
  drawerInactiveTintColor: "#4A4A4A",
  drawerIcon: ({ focused, size }) => (
    <MaterialCommunityIcons
      size={23}
      name={"hammer-wrench"}
      color={focused ? "#fff" : color}
    />
  ),
  drawerLabel: ({ focused }) => (
    <Text
      style={{
        color: focused ? "#fff" : color,
        fontFamily: "PoppinsMedium",
        fontSize: moderateScale(15, 0.5),
      }}
    >
      Maintenance
    </Text>
  ),
});

const HolidayRequestsOptions = (color: string): DrawerNavigationOptions => ({
  drawerActiveBackgroundColor: "#faac0f",
  drawerActiveTintColor: "#fff",
  drawerInactiveTintColor: "#4A4A4A",
  drawerIcon: ({ focused, size }) => (
    <Ionicons
      size={23}
      name={focused ? "earth-sharp" : "earth-outline"}
      color={focused ? "#fff" : color}
    />
  ),
  drawerLabel: ({ focused }) => (
    <Text
      style={{
        color: focused ? "#fff" : color,
        fontFamily: "PoppinsMedium",
        fontSize: moderateScale(15, 0.5),
      }}
    >
      My Holidays
    </Text>
  ),
});

const MaintenanceRequestsOptions = (
  color: string
): DrawerNavigationOptions => ({
  drawerActiveBackgroundColor: "#faac0f",
  drawerActiveTintColor: "#fff",
  drawerInactiveTintColor: "#4A4A4A",
  drawerIcon: ({ focused, size }) => (
    <Ionicons
      size={23}
      name={focused ? "build-sharp" : "build-outline"}
      color={focused ? "#fff" : color}
    />
  ),
  drawerLabel: ({ focused }) => (
    <Text
      style={{
        color: focused ? "#fff" : color,
        fontFamily: "PoppinsMedium",
        fontSize: moderateScale(15, 0.5),
      }}
    >
      My Maintenance
    </Text>
  ),
});

export const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerType: "front" }}
      detachInactiveScreens
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTab}
        options={{ ...HomeOptions("#4A4A4A") }}
      />
      <Drawer.Screen
        name="Maintenance"
        component={Maintenance}
        options={{ ...MaintenanceOptions("#4A4A4A") }}
      />
      <Drawer.Screen
        name="HolidayRequests"
        component={MyHolidayRequests}
        options={{ ...HolidayRequestsOptions("#4A4A4A") }}
      />
      <Drawer.Screen
        name="MaintenanceRequests"
        component={MyMaintenanceRequests}
        options={{ ...MaintenanceRequestsOptions("#4A4A4A") }}
      />
    </Drawer.Navigator>
  );
};
