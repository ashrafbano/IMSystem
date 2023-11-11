import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Login";
import SignUp from "../../screens/Signup";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import EnterPassword from "../../screens/EnterPassword";
import EnterOtp from "../../screens/EnterOtp";

type LoginStackParams = {
  Login: undefined;
  SignUp: undefined;
  EnterPassword: {
    phone: string;
  };
  EnterOTP: {
    phone: string;
    signup?: boolean;
    verificationRes: any;
    captchaVerifier: any;
    signUpData?: {
      phone: string;
      name: string;
      branch: string;
      yearOfPassing: string;
      roomNumber: string;
    };
  };
};

export type LoginStackProp = RouteProp<LoginStackParams, "Login">;

export type SignUpStackProp = RouteProp<LoginStackParams, "SignUp">;

export type EnterOtpStackProp = RouteProp<LoginStackParams, "EnterOTP">;

export type EnterPasswordStackProp = RouteProp<
  LoginStackParams,
  "EnterPassword"
>;

export type LoginStackNavigationProp = NativeStackNavigationProp<
  LoginStackParams,
  "Login"
>;

export type LoginProps = {
  route: LoginStackProp;
  navigation: LoginStackNavigationProp;
};

const Stack = createNativeStackNavigator<LoginStackParams>();

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="EnterOTP" component={EnterOtp} />
    </Stack.Navigator>
  );
}

export default LoginStack;
