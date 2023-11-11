import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Button from "../components/Button";
import {
  EnterPasswordStackProp,
  LoginStackNavigationProp,
} from "../routes/auth/LoginStack";
import { moderateScale } from "../utils/fontScaling";
import AuthHeader from "../components/AuthHeader";
import { isAndroid } from "../utils/deviceInfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IEnterPasswordProps {
  navigation: LoginStackNavigationProp;
  route: EnterPasswordStackProp;
}

const EnterPassword: React.FC<IEnterPasswordProps> = ({
  route,
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <>
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <AuthHeader logoWidth={300} logoHeight={350} />
          <View style={{ flex: 1, marginTop: -50 }}>
            <View style={styles.enterPasswordMobileContainer}>
              <View>
                <Text style={styles.enterPasswordTitleText}>Password</Text>
                <Text style={styles.enterPasswordSubtext}>
                  Authenticate please (+91{route.params.phone})
                </Text>
              </View>
              <View style={styles.enterPasswordInputContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Entypo
                    name="lock"
                    size={20}
                    color="#bababa"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    placeholder="Password"
                    style={styles.enterPasswordInput}
                    secureTextEntry={!showPassword}
                  />
                </View>
                <Ionicons
                  name={!showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#bababa"
                  onPress={() => setShowPassword((prevState) => !prevState)}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.replace("EnterOTP", {
                      phone: route.params.phone,
                    })
                  }
                >
                  <Text
                    style={{
                      fontFamily: "PoppinsMedium",
                      color: "#bababa",
                      fontSize: moderateScale(14),
                    }}
                  >
                    Want to go by OTP ?{" "}
                    <Text style={{ color: "#ff9929" }}>Click Here</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.enterPasswordButtonContainer}>
                <Button
                  Icon={() => (
                    <AntDesign name="arrowright" size={22} color="#fff" />
                  )}
                  title={"LOGIN"}
                />
              </View>
            </View>
            <View
              style={{
                ...styles.enterPasswordSignUpContainer,
                marginBottom: isAndroid ? bottom + 15 : bottom,
              }}
            >
              <Text style={styles.enterPasswordFirstSentenceText}>
                Want to change phone ?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.replace("Login")}
              >
                <Text style={styles.enterPasswordSignupText}>Change phone</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  enterPasswordSignUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  enterPasswordFirstSentenceText: {
    color: "#bababa",
    fontFamily: "PoppinsMedium",
    marginRight: moderateScale(8),
  },
  enterPasswordSignupText: { color: "#ff9929", fontFamily: "PoppinsBold" },
  enterPasswordButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: moderateScale(30),
  },
  enterPasswordMobileContainer: {
    flex: 2,
    flexDirection: "column",
    padding: moderateScale(30),
  },
  enterPasswordInputContainer: {
    borderBottomColor: "#bababa",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginTop: moderateScale(35),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  enterPasswordSubtext: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(16),
    color: "#bababa",
  },
  enterPasswordTitleText: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(32),
  },
  enterPasswordCountryCodeText: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(18),
    marginRight: moderateScale(10),
  },
  enterPasswordInput: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(18),
    width: 200,
    height: 40,
  },
});

export default EnterPassword;
