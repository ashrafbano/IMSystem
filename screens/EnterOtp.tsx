import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase/compat";
import Button from "../components/Button";
import {
  EnterOtpStackProp,
  LoginStackNavigationProp,
} from "../routes/auth/LoginStack";
import { moderateScale } from "../utils/fontScaling";
import AuthHeader from "../components/AuthHeader";
import { isAndroid } from "../utils/deviceInfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { CLEAR_AUTH_ERRORS, signUp } from "../redux/actions/authActions";
import { useAppSelector } from "../redux/store";
import { Snackbar } from "react-native-paper";

interface IEnterOtpProps {
  navigation: LoginStackNavigationProp;
  route: EnterOtpStackProp;
}

const EnterOtp: React.FC<IEnterOtpProps> = ({ route, navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const { signUpSuccess, user } = useAppSelector((state) => state.auth);
  const [isKeyBoardOpen, setIsKeyboardOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  //States for holding input OTP
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [thirdNum, setThirdNum] = useState("");
  const [fourthNum, setFourthNum] = useState("");
  const [fifthNum, setFifthNum] = useState("");
  const [sixthNum, setSixthNum] = useState("");

  //Ref for focusing in and out inputs
  const firstOtpRef = useRef<any>();
  const secondOtpRef = useRef<any>();
  const thirdOtpRef = useRef<any>();
  const fourthOtpRef = useRef<any>();
  const fifthOtpRef = useRef<any>();
  const sixthOtpRef = useRef<any>();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpen(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  const handleOtp =
    (setValue: React.Dispatch<React.SetStateAction<string>>, reference?: any) =>
    (otp: string) => {
      setValue(otp);
      reference ? reference.current.focus() : Keyboard.dismiss();
    };

  const confirmCode = async () => {
    try {
      setLoading(true);
      const credential = firebase.default.auth.PhoneAuthProvider.credential(
        route.params.verificationRes,
        firstNum + secondNum + thirdNum + fourthNum + fifthNum + sixthNum
      );

      await firebase.default.auth().signInWithCredential(credential);
      if (route.params.signup && route.params.signUpData) {
        const { phone, name, yearOfPassing, branch, roomNumber } =
          route.params.signUpData;
        dispatch(signUp(phone, name, yearOfPassing, branch, roomNumber));
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Cannot verify your number",
        "Please check your OTP and try again."
      );
    }
  };

  useEffect(() => {
    (async () => {
      if (signUpSuccess) {
        setLoading(false);
        setOpenSnackBar(true);
      }
      if (user) {
        setLoading(false);
      }
    })();
  }, [signUpSuccess, user]);

  useEffect(() => {
    firstOtpRef.current.focus();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        <AuthHeader logoWidth={300} logoHeight={350} />
        <View style={{ flex: 1, marginTop: -50 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.enterOtpMobileContainer}>
              <View>
                <Text style={styles.enterOtpTitleText}>OTP</Text>
                <Text style={styles.enterOtpSubtext}>
                  Authenticate please (+91{route.params.phone})
                </Text>
              </View>
              <View style={styles.enterOtpInputContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#bababa",
                      borderRadius: 5,
                      height: 40,
                      width: 40,
                    }}
                    activeOpacity={0.8}
                  >
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={1}
                      style={{
                        fontFamily: "PoppinsBold",
                        fontSize: moderateScale(16),
                      }}
                      onChangeText={handleOtp(setFirstNum, secondOtpRef)}
                      value={firstNum}
                      ref={firstOtpRef}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#bababa",
                      borderRadius: 5,
                      height: 40,
                      width: 40,
                    }}
                    activeOpacity={0.8}
                  >
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={1}
                      style={{
                        fontFamily: "PoppinsBold",
                        fontSize: moderateScale(16),
                      }}
                      onChangeText={handleOtp(setSecondNum, thirdOtpRef)}
                      value={secondNum}
                      ref={secondOtpRef}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#bababa",
                      borderRadius: 5,
                      height: 40,
                      width: 40,
                    }}
                    activeOpacity={0.8}
                  >
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={1}
                      style={{
                        fontFamily: "PoppinsBold",
                        fontSize: moderateScale(16),
                      }}
                      onChangeText={handleOtp(setThirdNum, fourthOtpRef)}
                      value={thirdNum}
                      ref={thirdOtpRef}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#bababa",
                      borderRadius: 5,
                      height: 40,
                      width: 40,
                    }}
                    activeOpacity={0.8}
                  >
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={1}
                      style={{
                        fontFamily: "PoppinsBold",
                        fontSize: moderateScale(16),
                      }}
                      onChangeText={handleOtp(setFourthNum, fifthOtpRef)}
                      value={fourthNum}
                      ref={fourthOtpRef}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#bababa",
                      borderRadius: 5,
                      height: 40,
                      width: 40,
                    }}
                    activeOpacity={0.8}
                  >
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={1}
                      style={{
                        fontFamily: "PoppinsBold",
                        fontSize: moderateScale(16),
                      }}
                      onChangeText={handleOtp(setFifthNum, sixthOtpRef)}
                      value={fifthNum}
                      ref={fifthOtpRef}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#bababa",
                      borderRadius: 5,
                      height: 40,
                      width: 40,
                    }}
                  >
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={1}
                      style={{
                        fontFamily: "PoppinsBold",
                        fontSize: moderateScale(16),
                      }}
                      onChangeText={handleOtp(setSixthNum)}
                      value={sixthNum}
                      ref={sixthOtpRef}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.enterOtpButtonContainer}>
                <Button
                  Icon={() =>
                    loading ? (
                      <ActivityIndicator color={"#fff"} />
                    ) : (
                      <AntDesign name="arrowright" size={22} color="#fff" />
                    )
                  }
                  disabled={loading}
                  title={route.params.signup ? "SIGNUP" : "LOGIN"}
                  onPress={() => {
                    const OTP =
                      firstNum +
                      secondNum +
                      thirdNum +
                      fourthNum +
                      fifthNum +
                      sixthNum;
                    if (OTP.length === 6) {
                      confirmCode();
                    }
                  }}
                  width={route.params.signup ? 130 : 120}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Snackbar
          visible={openSnackBar}
          onDismiss={() => {
            setOpenSnackBar(false);
            dispatch({ type: CLEAR_AUTH_ERRORS });
            navigation.navigate("Login");
          }}
          style={{
            backgroundColor: signUpSuccess ? "#28a745" : "#dc3545",
          }}
          duration={3000}
        >
          {signUpSuccess
            ? "User got signed up, admin needs to approve"
            : "Something wrong with the backend !"}
        </Snackbar>
        {!route.params.signup && !isKeyBoardOpen && (
          <View
            style={{
              ...styles.enterOtpSignUpContainer,
              marginBottom: isAndroid ? bottom + 15 : bottom,
            }}
          >
            <Text style={styles.enterOtpFirstSentenceText}>
              Want to change phone ?
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={styles.enterOtpSignupText}>Change phone</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  enterOtpSignUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  enterOtpFirstSentenceText: {
    color: "#bababa",
    fontFamily: "PoppinsMedium",
    marginRight: moderateScale(8),
  },
  enterOtpSignupText: { color: "#ff9929", fontFamily: "PoppinsBold" },
  enterOtpButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: moderateScale(30),
  },
  enterOtpMobileContainer: {
    flex: 2,
    flexDirection: "column",
    padding: moderateScale(30),
  },
  enterOtpInputContainer: {
    flexDirection: "row",
    marginTop: moderateScale(20),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  enterOtpSubtext: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(16),
    color: "#bababa",
  },
  enterOtpTitleText: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(32),
  },
  enterOtpCountryCodeText: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(18),
    marginRight: moderateScale(10),
  },
  enterOtpInput: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(18),
    width: 200,
    height: 40,
  },
});

export default EnterOtp;
