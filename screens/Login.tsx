import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase/compat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Button from "../components/Button";
import { LoginStackNavigationProp } from "../routes/auth/LoginStack";
import { moderateScale } from "../utils/fontScaling";
import { isAndroid } from "../utils/deviceInfo";
import AuthHeader from "../components/AuthHeader";
import { useDispatch } from "react-redux";
import { CLEAR_AUTH_ERRORS, checkPhone } from "../redux/actions/authActions";
import { useAppSelector } from "../redux/store";
import ErrorText from "../components/ErrorText";

interface ILoginInProps {
  navigation: LoginStackNavigationProp;
}

const Login: React.FC<ILoginInProps> = ({ navigation }) => {
  const { bottom, top } = useSafeAreaInsets();
  const [phone, setPhone] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch<any>();
  const [isKeyBoardOpen, setIsKeyboardOpen] = useState(false);

  const recaptchaVerifier = useRef<
    FirebaseRecaptchaVerifierModal | null | undefined
  >();

  const getOtpClick = () => {
    setLoading(true);
    checkPhone(sendVerification, dispatch, phone, true);
  };

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

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const sendVerification = async () => {
    try {
      const phoneProvider = new firebase.default.auth.PhoneAuthProvider();
      const res = await phoneProvider.verifyPhoneNumber(
        `+91${phone}`,
        recaptchaVerifier.current!
      );
      setLoading(false);
      navigation.replace("EnterOTP", {
        phone,
        verificationRes: res,
        captchaVerifier: recaptchaVerifier.current!,
      });
      return res;
    } catch (error: { message: string }) {
      setLoading(false);
      Alert.alert("Authentication Error", error.message);
    }
  };

  useEffect(() => {
    if (phone.length === 10) {
      Keyboard.dismiss();
    }
  }, [phone]);

  useEffect(() => {
    dispatch({ type: CLEAR_AUTH_ERRORS });
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <AuthHeader logoWidth={300} logoHeight={350} />
          <View style={{ flex: 1, marginTop: -50 }}>
            <View style={styles.loginMobileContainer}>
              <View>
                <Text style={styles.loginTitleText}>Login</Text>
                <Text style={styles.loginSubtext}>
                  Please sign in to continue
                </Text>
              </View>
              <View style={styles.loginInputContainer}>
                <FontAwesome
                  name="mobile-phone"
                  size={32}
                  color="#bababa"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.loginCountryCodeText}>+91</Text>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Phone number"
                  style={styles.loginInput}
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
              </View>
              <View>{error && <ErrorText text={error.message} />}</View>
              <View style={styles.loginButtonContainer}>
                <Button
                  Icon={() =>
                    loading ? (
                      <ActivityIndicator color={"#fff"} />
                    ) : (
                      <AntDesign name="arrowright" size={22} color="#fff" />
                    )
                  }
                  title={usePassword ? "PASSWORD" : "GET OTP"}
                  width={usePassword ? 160 : 140}
                  onPress={() =>
                    usePassword
                      ? navigation.replace("EnterPassword", {
                          phone,
                        })
                      : getOtpClick()
                  }
                />
              </View>
            </View>
            {!isKeyBoardOpen && (
              <View
                style={{
                  ...styles.loginSignUpContainer,
                  marginBottom: isAndroid ? bottom + 15 : bottom,
                }}
              >
                <Text style={styles.loginFirstSentenceText}>
                  Don't have an account ?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.replace("SignUp");
                    dispatch({ type: CLEAR_AUTH_ERRORS });
                  }}
                >
                  <Text style={styles.loginSignupText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.default.app().options}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loginSignUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginFirstSentenceText: {
    color: "#bababa",
    fontFamily: "PoppinsMedium",
    marginRight: moderateScale(8),
  },
  loginSignupText: { color: "#ff9929", fontFamily: "PoppinsBold" },
  loginButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: moderateScale(30),
  },
  loginMobileContainer: {
    flex: 2,
    flexDirection: "column",
    padding: moderateScale(30),
  },
  loginInputContainer: {
    borderBottomColor: "#bababa",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginTop: moderateScale(35),
    borderRadius: 5,
    alignItems: "center",
  },
  loginSubtext: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(16),
    color: "#bababa",
  },
  loginTitleText: { fontFamily: "PoppinsMedium", fontSize: moderateScale(32) },
  loginCountryCodeText: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(18),
    marginRight: moderateScale(10),
  },
  loginInput: {
    fontFamily: "PoppinsMedium",
    fontSize: moderateScale(18),
    width: 200,
    height: 40,
  },
});

export default Login;
