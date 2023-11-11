import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./routes/auth/LoginStack";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import * as firebase from "firebase/compat";
import { HomeTab } from "./routes/home/HomeTab";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  getUser,
} from "./redux/actions/authActions";
import { useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { AppDrawer } from "./routes/drawer/Drawer";
import { AdminAppDrawer } from "./routes/drawer/AdminDrawer";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig?.extra?.eas.projectId,
//     });
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }

const AppNavigation = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch<any>();
  let stack = null;
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 5000);
  }, []);

  useEffect(() => {
    let subscriber;
    subscriber = firebase.default.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(getUser(user?.phoneNumber, user));
        await SplashScreen.hideAsync();
      } else {
        dispatch({ type: LOGIN_FAIL });
      }
    });
    return subscriber;
  }, []);

  if (user) {
    if (user.admin) {
      stack = <AdminAppDrawer />;
    } else {
      stack = <AppDrawer />;
    }
  } else {
    stack = <LoginStack />;
  }

  return <NavigationContainer>{stack}</NavigationContainer>;
};

export default AppNavigation;
