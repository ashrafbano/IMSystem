import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as firebase from "firebase/compat";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppNavigation from "./AppNavigation";
import * as SplashScreen from "expo-splash-screen";
import { getAuth } from "firebase/auth";

enableScreens();

//Initialize Firebase a
const defaultApp = !firebase.default.apps.length
  ? firebase.default.initializeApp({
      apiKey: "AIzaSyAIdQOvBSNSJtLv4-s4OS0qrJyxdoEMKZk",
      authDomain: "imsystem-6ca00.firebaseapp.com",
      databaseURL: "https://imsystem-6ca00-default-rtdb.firebaseio.com",
      projectId: "imsystem-6ca00",
      storageBucket: "imsystem-6ca00.appspot.com",
      messagingSenderId: "1007193055616",
      appId: "1:1007193055616:web:1a430324b6ede0a79e2165",
      measurementId: "G-2R8XV90JP3",
    })
  : firebase.default.app();

const defaultAuth = getAuth();

export default function App() {
  //Load required fonts for the app
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  (async () => {
    await SplashScreen.preventAutoHideAsync();
  })();

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
