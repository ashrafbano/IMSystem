import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { Notifications } from "../../screens/Notifications";
import { Feedback } from "../../screens/Feedback";
import { Profile } from "../../screens/Profile";
import { DrawerStackNavigationProp } from "../drawer/Drawer";
import { useDispatch } from "react-redux";
import { SET_DRAWER_NAVIGATOR } from "../../redux/actions/navigationActions";
import { Text } from "react-native";
import { moderateScale } from "../../utils/fontScaling";
import { AdminHomeStack } from "./AdminHomeStack";
import { LoginRequests } from "../../screens/LoginRequests";
import { AdminHolidayRequests } from "../../screens/AdminHolidayRequests";
import { HolidayRequestHomeStack } from "./HolidayRequestStack";

const Tab = createBottomTabNavigator();

interface IProps {
  navigation: DrawerStackNavigationProp;
}

export const AdminHomeTab: React.FC<IProps> = ({ navigation }) => {
  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    dispatch({ type: SET_DRAWER_NAVIGATOR, payload: navigation });
  }, []);

  return (
    <Tab.Navigator
      detachInactiveScreens
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "ios-information-circle";

          if (route.name === "AdminHome") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Notifications") {
            iconName = focused
              ? "ios-notifications"
              : "ios-notifications-outline";
          } else if (route.name === "AdminHolidayRequests") {
            iconName = "holiday-village";
            return <Fontisto name={iconName} size={size} color={color} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (route.name === "LoginRequests") {
            iconName = "login";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff9929",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="AdminHome"
        component={AdminHomeStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                fontSize: moderateScale(10),
                color: focused ? "#ff9929" : "#a8a8a8",
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="AdminHolidayRequests"
        component={HolidayRequestHomeStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                fontSize: moderateScale(10),
                color: focused ? "#ff9929" : "#a8a8a8",
              }}
            >
              H - Requests
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="LoginRequests"
        component={LoginRequests}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                fontSize: moderateScale(10),
                color: focused ? "#ff9929" : "#a8a8a8",
              }}
            >
              Login Requests
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                fontSize: moderateScale(10),
                color: focused ? "#ff9929" : "#a8a8a8",
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
