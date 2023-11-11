import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Notifications } from "../../screens/Notifications";
import { HomeStack } from "./HomeStack";
import { Feedback } from "../../screens/Feedback";
import { Profile } from "../../screens/Profile";
import { DrawerStackNavigationProp } from "../drawer/Drawer";
import { useDispatch } from "react-redux";
import { SET_DRAWER_NAVIGATOR } from "../../redux/actions/navigationActions";
import { Text } from "react-native";
import { moderateScale } from "../../utils/fontScaling";

const Tab = createBottomTabNavigator();

interface IProps {
  navigation: DrawerStackNavigationProp;
}

export const HomeTab: React.FC<IProps> = ({ navigation }) => {
  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    dispatch({ type: SET_DRAWER_NAVIGATOR, payload: navigation });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "ios-information-circle";

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Notifications") {
            iconName = focused
              ? "ios-notifications"
              : "ios-notifications-outline";
          } else if (route.name === "Feedback") {
            iconName = focused ? "message-flash" : "message-flash-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff9929",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Your Space"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                fontSize: moderateScale(10),
                color: focused ? "#ff9929" : "#a8a8a8",
              }}
            >
              Your space
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                fontSize: moderateScale(10),
                color: focused ? "#ff9929" : "#a8a8a8",
              }}
            >
              Notifications
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={Feedback}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                fontSize: moderateScale(10),
                color: focused ? "#ff9929" : "#a8a8a8",
              }}
            >
              Feedback
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
