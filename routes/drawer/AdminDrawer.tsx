import {
  DrawerNavigationOptions,
  DrawerNavigationProp,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { DrawerContent } from "./DrawerContent";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text } from "react-native";
import { moderateScale } from "../../utils/fontScaling";
import { AdminHomeTab } from "../home/AdminHomeTab";
import { AdminMaintenanceRequests } from "../../screens/AdminMaintenanceRequests";
import { AdminApprovedHolidayRequestScreen } from "../../screens/AdminApprovedHolidayRequests";
import { AdminFoodFeedback } from "../../screens/AdminFoodFeedback";

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

const AdminMaintenanceOptions = (color: string): DrawerNavigationOptions => ({
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
      M - Requests
    </Text>
  ),
});

const AdminApprovedHolidayRequests = (
  color: string
): DrawerNavigationOptions => ({
  drawerActiveBackgroundColor: "#faac0f",
  drawerActiveTintColor: "#fff",
  drawerInactiveTintColor: "#4A4A4A",
  drawerIcon: ({ focused, size }) => (
    <Fontisto
      size={15}
      name={"holiday-village"}
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
      Approved Holidays
    </Text>
  ),
});

const AdminFeedbackRequests = (color: string): DrawerNavigationOptions => ({
  drawerActiveBackgroundColor: "#faac0f",
  drawerActiveTintColor: "#fff",
  drawerInactiveTintColor: "#4A4A4A",
  drawerIcon: ({ focused, size }) => (
    <MaterialIcons
      size={23}
      name={"feedback"}
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
      Food Feedbacks
    </Text>
  ),
});

export const AdminAppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerType: "front" }}
      detachInactiveScreens
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={AdminHomeTab}
        options={{ ...HomeOptions("#4A4A4A") }}
      />
      <Drawer.Screen
        name="AdminMaintenanceRequests"
        component={AdminMaintenanceRequests}
        options={{ ...AdminMaintenanceOptions("#4A4A4A") }}
      />
      <Drawer.Screen
        name="AdminApprovedHolidayRequests"
        component={AdminApprovedHolidayRequestScreen}
        options={{ ...AdminApprovedHolidayRequests("#4A4A4A") }}
      />
      <Drawer.Screen
        name="AdminFeedbackRequests"
        component={AdminFoodFeedback}
        options={{ ...AdminFeedbackRequests("#4A4A4A") }}
      />
    </Drawer.Navigator>
  );
};
