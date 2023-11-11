import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { AppHeader } from "../components/AppHeader";
import { TextInput, Button, Surface, Snackbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { UserHomeStackNavigationProp } from "../routes/home/HomeStack";
import { useState, useCallback, useEffect } from "react";
import { moderateScale } from "../utils/fontScaling";
import { useDispatch } from "react-redux";
import {
  CLEAR_HOLIDAY_REQUEST_STATE,
  submitHolidayRequest,
} from "../redux/actions/holidayRequestActions";
import { useAppSelector } from "../redux/store";

interface IProps {
  navigation: UserHomeStackNavigationProp;
}

export const HolidayRequest: React.FC<IProps> = ({ navigation }) => {
  const { loading, holidayRequestFail, holidayRequestSuccess } = useAppSelector(
    (state) => state.holidayRequest
  );
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [reason, setReason] = useState({
    value: "",
    error: "",
    touched: false,
  });
  const [phone, setPhone] = useState({
    value: "",
    error: "",
    touched: false,
  });
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    touched: false,
    error: "",
  });
  const [open, setOpen] = useState(false);
  const [noOfDays, setNoOfDays] = useState(1);
  const dispatch = useDispatch<any>();

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({
        startDate,
        endDate,
        touched: true,
        error:
          !startDate || !endDate ? "Please select start date and end date" : "",
      });
      setNoOfDays(Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)));
    },
    [setOpen, setRange]
  );

  const clearForm = () => {
    setNoOfDays(1);
    setRange({
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      touched: false,
      error: "",
    });
    setPhone({
      value: "",
      error: "",
      touched: false,
    });
    setReason({
      value: "",
      error: "",
      touched: false,
    });
  };

  useEffect(() => {
    if (holidayRequestSuccess) {
      setOpenSnackBar(true);
      clearForm();
    } else if (holidayRequestFail) {
      setOpenSnackBar(true);
    }
  }, [holidayRequestFail, holidayRequestSuccess]);

  const onSubmitClick = () => {
    let canSubmit = true;
    if (reason.value === "") {
      setReason({
        value: "",
        error: "Reason is mandatory",
        touched: true,
      });
      canSubmit = false;
    }
    if (phone.value === "") {
      setPhone({
        value: "",
        error: "Phone number is mandatory",
        touched: true,
      });
      canSubmit = false;
    }

    if (!range.endDate || !range.startDate) {
      setRange((prevState) => {
        return {
          ...prevState,
          error: "Please select date range",
          touched: true,
        };
      });
      canSubmit = false;
    }

    if (canSubmit && !reason.error && !phone.error && !range.error) {
      dispatch(
        submitHolidayRequest(
          phone.value,
          reason.value,
          noOfDays,
          range.startDate!,
          range.endDate!
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack navigation={navigation} />
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={() => Keyboard.dismiss()}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View></View>
              <Surface
                style={{
                  padding: moderateScale(15),
                  marginHorizontal: moderateScale(15),
                }}
                elevation={2}
              >
                <TextInput
                  label="Reason"
                  value={reason.value}
                  mode="outlined"
                  onChangeText={(text) =>
                    setReason({
                      value: text,
                      error: text === "" ? "Reason is mandatory" : "",
                      touched: true,
                    })
                  }
                  style={{ fontFamily: "PoppinsRegular" }}
                />
                {!!reason.error && reason.touched && (
                  <View style={{ marginTop: moderateScale(5) }}>
                    <Text
                      style={{
                        fontFamily: "PoppinsRegular",
                        fontSize: moderateScale(10),
                        color: "red",
                      }}
                    >
                      * {reason.error}
                    </Text>
                  </View>
                )}
                <TextInput
                  label="Parent Phone number"
                  value={phone.value}
                  mode="outlined"
                  keyboardType="numeric"
                  maxLength={10}
                  onChangeText={(text) =>
                    setPhone({
                      value: text,
                      error:
                        text === ""
                          ? "Phone number is mandatory"
                          : text.length !== 10
                          ? "Phone number is incorrect"
                          : "",
                      touched: true,
                    })
                  }
                  style={{
                    marginTop: moderateScale(20),
                    fontFamily: "PoppinsRegular",
                  }}
                />
                {!!phone.error && phone.touched && (
                  <View style={{ marginTop: moderateScale(5) }}>
                    <Text
                      style={{
                        fontFamily: "PoppinsRegular",
                        fontSize: moderateScale(10),
                        color: "red",
                      }}
                    >
                      * {phone.error}
                    </Text>
                  </View>
                )}
                <View>
                  <TouchableOpacity
                    onPress={() => setOpen(true)}
                    style={{
                      borderWidth: 1,
                      padding: moderateScale(15),
                      borderRadius: moderateScale(5),
                      marginTop: moderateScale(20),
                    }}
                  >
                    <Text style={{ fontFamily: "PoppinsRegular" }}>
                      {range.startDate && range.endDate
                        ? `${range.startDate.getDate()}/${
                            range.startDate.getMonth() + 1
                          }/${range.startDate.getFullYear()} - ${range.endDate.getDate()}/${
                            range.endDate.getMonth() + 1
                          }/${range.endDate.getFullYear()}`
                        : "Select Date Range"}
                    </Text>
                  </TouchableOpacity>
                  <DatePickerModal
                    locale="en"
                    mode="range"
                    visible={open}
                    onDismiss={onDismiss}
                    startDate={range.startDate}
                    endDate={range.endDate}
                    onConfirm={onConfirm}
                  />
                  {!!range.error && range.touched && (
                    <View style={{ marginTop: moderateScale(5) }}>
                      <Text
                        style={{
                          fontFamily: "PoppinsRegular",
                          fontSize: moderateScale(10),
                          color: "red",
                        }}
                      >
                        * {range.error}
                      </Text>
                    </View>
                  )}
                </View>
                <View>
                  <TextInput
                    label="No of days"
                    value={noOfDays.toString()}
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={10}
                    style={{
                      marginTop: moderateScale(20),
                      fontFamily: "PoppinsRegular",
                    }}
                    disabled
                  />
                </View>
                <View style={{ marginTop: moderateScale(10) }}>
                  <Text
                    style={{
                      fontFamily: "PoppinsRegular",
                      fontSize: moderateScale(10),
                      color: "#a8a8a8",
                    }}
                  >
                    Note: After submitting the request admin need to approve and
                    you will recieve notification.
                  </Text>
                </View>
              </Surface>
              <View style={{ padding: moderateScale(15) }}>
                <Button
                  mode="contained"
                  onPress={onSubmitClick}
                  loading={loading}
                >
                  Submit Request
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <Snackbar
          visible={openSnackBar}
          onDismiss={() => {
            setOpenSnackBar(false);
            dispatch({ type: CLEAR_HOLIDAY_REQUEST_STATE });
          }}
          style={{
            backgroundColor: holidayRequestSuccess ? "#28a745" : "#dc3545",
          }}
          duration={3000}
        >
          {holidayRequestSuccess
            ? "Holiday request submitted !"
            : "Something wrong with the backend !"}
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
