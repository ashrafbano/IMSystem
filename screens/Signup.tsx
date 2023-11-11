import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase/compat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Button from "../components/Button";
import { LoginStackNavigationProp } from "../routes/auth/LoginStack";
import { isAndroid } from "../utils/deviceInfo";
import AuthHeader from "../components/AuthHeader";
import ErrorText from "../components/ErrorText";
import { CLEAR_AUTH_ERRORS, checkPhone } from "../redux/actions/authActions";
import { useAppDispatch, useAppSelector } from "../redux/store";

interface ISignUpProps {
  navigation: LoginStackNavigationProp;
}

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const SignUp: React.FC<ISignUpProps> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const authLoading = useAppSelector((state) => state.auth.loading);
  const authError = useAppSelector((state) => state.auth.error);
  //States to handle inputs, keyboard visibility, error and loading
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [yearOfPassing, setYearOfPassing] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isKeyBoardOpen, setIsKeyboardOpen] = useState(false);

  //Input Refs
  const nameRef = useRef<any>();
  const recaptchaVerifier = useRef<
    FirebaseRecaptchaVerifierModal | null | undefined
  >();

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
        signup: true,
        signUpData: {
          phone,
          name,
          branch,
          yearOfPassing,
          roomNumber,
        },
      });
      return res;
    } catch (error: { message: string }) {
      setLoading(false);
      Alert.alert("Authentication Error", error.message);
    }
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
    dispatch({ type: CLEAR_AUTH_ERRORS });
    resetErrors();
  }, []);

  const resetErrors = () => {
    setError("");
  };

  const resetSignUpForm = () => {
    setPhone("");
    setName("");
    resetErrors();
  };

  const phoneChangeHandler = (phone: string) => {
    resetErrors();
    if (phone.length <= 10) {
      setPhone(phone.trim());
    }
  };

  const signUpHandler = () => {
    if (!phone || !name || !branch || !yearOfPassing || !roomNumber) {
      setError("Give us all details please !");
    } else if (phone.length !== 10) {
      setError("Please provide correct phone !");
    } else {
      resetErrors(); //Reset all errors if form is validated
      setLoading(true);
      checkPhone(sendVerification, dispatch, phone);
    }
  };

  //Effect to reset entire form if there is an error and set form error
  useEffect(() => {
    if (!!authError?.message) {
      resetSignUpForm();
      setError(authError.message);
    }
  }, [authError]);

  return (
    <>
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <AuthHeader />
          <View
            style={{
              flex: 1,
              marginTop: !isAndroid && isKeyBoardOpen ? -150 : -50,
            }}
          >
            <View style={styles.signUpMobileContainer}>
              <View>
                <Text style={styles.signUpTitleText}>Sign Up</Text>
                <Text style={styles.signUpSubtext}>We need few detais</Text>
              </View>
              <KeyboardAvoidingView
                behavior={"padding"}
                keyboardVerticalOffset={-40}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.signUpInputContainer}>
                    <FontAwesome
                      name="mobile-phone"
                      size={32}
                      color="#bababa"
                      style={styles.signUpInputIcon}
                    />
                    <Text style={styles.signUpCountryCodeText}>+91</Text>
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Phone number"
                      style={{
                        ...styles.signUpInput,
                        marginTop: isAndroid ? 0 : 0,
                      }}
                      value={phone}
                      onChangeText={phoneChangeHandler}
                      maxLength={10}
                      onSubmitEditing={() => nameRef.current.focus()}
                    />
                  </View>
                  <View style={styles.signUpInputContainer}>
                    <Ionicons
                      name="person"
                      size={20}
                      color="#bababa"
                      style={styles.signUpInputIcon}
                    />
                    <TextInput
                      placeholder="Name"
                      style={styles.signUpInput}
                      maxLength={24}
                      value={name}
                      onChangeText={setName}
                      ref={nameRef}
                    />
                  </View>
                  <View style={styles.signUpInputContainer}>
                    <Ionicons
                      name="person"
                      size={20}
                      color="#bababa"
                      style={styles.signUpInputIcon}
                    />
                    <TextInput
                      placeholder="Branch"
                      style={styles.signUpInput}
                      maxLength={3}
                      value={branch}
                      onChangeText={setBranch}
                    />
                  </View>
                  <View style={styles.signUpInputContainer}>
                    <Ionicons
                      name="person"
                      size={20}
                      color="#bababa"
                      style={styles.signUpInputIcon}
                    />
                    <TextInput
                      placeholder="Year of passing"
                      style={styles.signUpInput}
                      maxLength={4}
                      value={yearOfPassing}
                      onChangeText={setYearOfPassing}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.signUpInputContainer}>
                    <Ionicons
                      name="person"
                      size={20}
                      color="#bababa"
                      style={styles.signUpInputIcon}
                    />
                    <TextInput
                      placeholder="Room number"
                      style={styles.signUpInput}
                      maxLength={3}
                      value={roomNumber}
                      onChangeText={setRoomNumber}
                      keyboardType="numeric"
                    />
                  </View>
                  <View>{!!error && <ErrorText text={error} />}</View>
                  <View style={styles.signUpButtonContainer}>
                    <Button
                      disabled={loading}
                      Icon={() =>
                        loading ? (
                          <ActivityIndicator color={"#fff"} />
                        ) : (
                          <AntDesign name="arrowright" size={22} color="#fff" />
                        )
                      }
                      title={"VERIFY PHONE"}
                      onPress={signUpHandler}
                      width={180}
                    />
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
            {!isKeyBoardOpen && (
              <View
                style={{
                  ...styles.signUpSignUpContainer,
                  marginBottom: isAndroid ? bottom + 15 : bottom,
                }}
              >
                <Text style={styles.signUpFirstSentenceText}>
                  Registered with us ?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.replace("Login");
                    dispatch({ type: CLEAR_AUTH_ERRORS });
                  }}
                >
                  <Text style={styles.signUpSignupText}>Log in</Text>
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
  signUpSignUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpFirstSentenceText: {
    color: "#bababa",
    fontFamily: "PoppinsMedium",
    marginRight: 8,
  },
  signUpSignupText: { color: "#ff9929", fontFamily: "PoppinsBold" },
  signUpButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
  },
  signUpMobileContainer: {
    flex: 2,
    flexDirection: "column",
    padding: 30,
  },
  signUpInputContainer: {
    borderBottomColor: "#bababa",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginTop: 35,
    borderRadius: 5,
    alignItems: "center",
  },
  signUpSubtext: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: "#bababa",
  },
  signUpTitleText: { fontFamily: "PoppinsMedium", fontSize: 32 },
  signUpCountryCodeText: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    marginRight: 10,
  },
  signUpInput: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    width: 300,
  },
  signUpPasswordInput: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    width: 200,
  },
  signUpPasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#bababa",
    borderBottomWidth: 1,
    marginTop: 35,
    borderRadius: 5,
  },
  signUpInputIcon: { marginRight: 10 },
});

export default SignUp;
