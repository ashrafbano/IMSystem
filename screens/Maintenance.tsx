import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { AppHeader } from "../components/AppHeader";
import { TextInput, Button, Surface, Snackbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { UserHomeStackNavigationProp } from "../routes/home/HomeStack";
import { useState, useEffect } from "react";
import { moderateScale } from "../utils/fontScaling";
import { useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { useAppSelector } from "../redux/store";
import {
  CLEAR_MAINTENANCE_REQUEST_STATE,
  submitMaintenanceRequest,
} from "../redux/actions/maintenanceRequestActions";

interface IProps {
  navigation: UserHomeStackNavigationProp;
}

const pickerOptions = [
  { value: "Plumbing", label: "Plumbing", key: 1 },
  { value: "Electrical", label: "Electrical", key: 2 },
  { value: "Outdoor Electrical", label: "Outdoor Electrical", key: 3 },
  { value: "Concrete Issues", label: "Concrete Issues", key: 4 },
];

export const Maintenance: React.FC<IProps> = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState<any>(
    pickerOptions[0].value
  );
  const { loading, maintenanceRequestFail, maintenanceRequestSuccess } =
    useAppSelector((state) => state.maintenanceRequest);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [roomNumber, setRoomNumber] = useState({
    value: "",
    error: "",
    touched: false,
  });
  const [issueDescription, setIssueDescription] = useState({
    value: "",
    error: "",
    touched: false,
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<any>();

  const clearForm = () => {
    setSelectedValue(pickerOptions[0].value);
    setRoomNumber({
      value: "",
      error: "",
      touched: false,
    });
    setIssueDescription({
      value: "",
      error: "",
      touched: false,
    });
  };

  useEffect(() => {
    if (maintenanceRequestSuccess) {
      setOpenSnackBar(true);
      clearForm();
    } else if (maintenanceRequestFail) {
      setOpenSnackBar(true);
    }
  }, [maintenanceRequestFail, maintenanceRequestSuccess]);

  const onSubmitClick = () => {
    let canSubmit = true;
    if (roomNumber.value === "") {
      setRoomNumber({
        value: "",
        error: "Room number is mandatory",
        touched: true,
      });
      canSubmit = false;
    }
    if (issueDescription.value === "") {
      setIssueDescription({
        value: "",
        error: "Issue description is mandatory",
        touched: true,
      });
      canSubmit = false;
    }

    if (canSubmit && !roomNumber.error && !issueDescription.error) {
      dispatch(
        submitMaintenanceRequest(
          selectedValue,
          issueDescription.value,
          +roomNumber.value
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
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: moderateScale(20),
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PoppinsMedium",
                      fontSize: moderateScale(18),
                    }}
                  >
                    Raise Request
                  </Text>
                </View>
                <TextInput
                  label="Room number"
                  value={roomNumber.value}
                  mode="outlined"
                  onChangeText={(text) =>
                    setRoomNumber({
                      value: text,
                      error: text === "" ? "Room number is mandatory" : "",
                      touched: true,
                    })
                  }
                  style={{ fontFamily: "PoppinsRegular" }}
                  keyboardType="numeric"
                  maxLength={3}
                />
                {!!roomNumber.error && roomNumber.touched && (
                  <View style={{ marginTop: moderateScale(5) }}>
                    <Text
                      style={{
                        fontFamily: "PoppinsRegular",
                        fontSize: moderateScale(10),
                        color: "red",
                      }}
                    >
                      * {roomNumber.error}
                    </Text>
                  </View>
                )}
                <DropDownPicker
                  items={pickerOptions}
                  placeholder="Select an option"
                  containerStyle={{ height: 60 }}
                  style={{
                    backgroundColor: "#fafafa",
                    marginTop: moderateScale(15),
                  }}
                  setValue={setSelectedValue}
                  value={selectedValue}
                  multiple={false}
                  open={open}
                  setOpen={setOpen}
                />
                <TextInput
                  label="Issue Description"
                  value={issueDescription.value}
                  mode="outlined"
                  onChangeText={(text) =>
                    setIssueDescription({
                      value: text,
                      error:
                        text === "" ? "Issue description is mandatory" : "",
                      touched: true,
                    })
                  }
                  style={{
                    marginTop: moderateScale(20),
                    fontFamily: "PoppinsRegular",
                  }}
                  numberOfLines={4}
                  multiline
                />
                {!!issueDescription.error && issueDescription.touched && (
                  <View style={{ marginTop: moderateScale(5) }}>
                    <Text
                      style={{
                        fontFamily: "PoppinsRegular",
                        fontSize: moderateScale(10),
                        color: "red",
                      }}
                    >
                      * {issueDescription.error}
                    </Text>
                  </View>
                )}
              </Surface>
              <View
                style={{
                  padding: moderateScale(15),
                  marginBottom: moderateScale(25),
                }}
              >
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
            dispatch({ type: CLEAR_MAINTENANCE_REQUEST_STATE });
          }}
          style={{
            backgroundColor: maintenanceRequestSuccess ? "#28a745" : "#dc3545",
          }}
          duration={3000}
        >
          {maintenanceRequestSuccess
            ? "Maintenance request submitted !"
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
