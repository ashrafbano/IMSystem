import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { AppHeader } from "../components/AppHeader";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { moderateScale } from "../utils/fontScaling";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import StarRating from "react-native-star-rating-widget";
import { isAndroid } from "../utils/deviceInfo";
import {
  CLEAR_FEEDBACK_REQUEST_STATE,
  submitFeedback,
} from "../redux/actions/feedbackActions";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";

const pickerOptions = [
  { value: "Breakfast", label: "Breakfast", key: 1 },
  { value: "Lunch", label: "Lunch", key: 2 },
  { value: "Dinner", label: "Dinner", key: 3 },
  { value: "Snacks", label: "Snacks", key: 4 },
];

export const Feedback = () => {
  const [open, setOpen] = useState(false);
  const { feedbackRequestSuccess, loading, feedbackRequestFail } =
    useAppSelector((state) => state.feedback);
  const dispatch = useDispatch<any>();
  const [selectedValue, setSelectedValue] = useState<any>(
    pickerOptions[0].value
  );
  const [hostelName, setHostelName] = useState({
    value: "",
    error: "",
    touched: false,
  });
  const [comments, setComments] = useState("");
  const [mealQualityRating, setMealQualityRating] = useState({
    value: 0,
    error: "",
    touched: false,
  });
  const [serviceQualityRating, setServiceQualityRating] = useState({
    value: 0,
    error: "",
    touched: false,
  });
  const [tasteQualityRating, setTasteQualityRating] = useState({
    value: 0,
    error: "",
    touched: false,
  });
  const [freshnessQualityRating, setFreshnessQualityRating] = useState({
    value: 0,
    error: "",
    touched: false,
  });
  const [sizeOfPortionsRating, setSizeOfPortionRating] = useState({
    value: 0,
    error: "",
    touched: false,
  });
  const [worthOfMealRating, setWorthOfMealRating] = useState({
    value: 0,
    error: "",
    touched: false,
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (feedbackRequestSuccess) {
      setOpenSnackBar(true);
    } else if (feedbackRequestFail) {
      setOpenSnackBar(true);
    }
  }, [feedbackRequestSuccess, feedbackRequestFail]);

  const onSubmitClick = () => {
    let canSubmit = true;
    if (hostelName.value === "") {
      setHostelName({
        value: "",
        error: "Hostel name is mandatory",
        touched: true,
      });
      canSubmit = false;
    }

    if (canSubmit && !hostelName.error) {
      dispatch(
        submitFeedback(
          hostelName.value,
          selectedValue,
          mealQualityRating.value,
          serviceQualityRating.value,
          tasteQualityRating.value,
          freshnessQualityRating.value,
          sizeOfPortionsRating.value,
          worthOfMealRating.value,
          comments
        )
      );
    }
  };

  return (
    <View style={styles.feedbackContainer}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <>
          <AppHeader />
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              paddingHorizontal: moderateScale(15),
              paddingTop: moderateScale(15),
            }}
          >
            <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={isAndroid ? "height" : "padding"}
              >
                <TextInput
                  label="Hostel name"
                  mode="outlined"
                  style={{ fontFamily: "PoppinsRegular" }}
                  value={hostelName.value}
                  onChangeText={(text) =>
                    setHostelName({
                      value: text,
                      touched: true,
                      error: text === "" ? "Hostel name is mandatory" : "",
                    })
                  }
                />
                {!!hostelName.error && hostelName.touched && (
                  <View style={{ marginTop: moderateScale(5) }}>
                    <Text
                      style={{
                        fontFamily: "PoppinsRegular",
                        fontSize: moderateScale(10),
                        color: "red",
                      }}
                    >
                      * {hostelName.error}
                    </Text>
                  </View>
                )}
                <DropDownPicker
                  items={pickerOptions}
                  placeholder="Select meal type"
                  containerStyle={{ height: 60 }}
                  style={{
                    backgroundColor: "#fff",
                    marginTop: moderateScale(15),
                  }}
                  setValue={setSelectedValue}
                  value={selectedValue}
                  multiple={false}
                  open={open}
                  setOpen={setOpen}
                  zIndex={1000}
                />
                <View style={{ marginTop: moderateScale(25) }}>
                  <Text
                    style={{
                      fontFamily: "PoppinsRegular",
                      fontSize: moderateScale(14),
                      marginLeft: moderateScale(10),
                      letterSpacing: 1.1,
                      marginBottom: moderateScale(10),
                    }}
                  >
                    Meal qualtity
                  </Text>
                  <StarRating
                    rating={mealQualityRating.value}
                    onChange={(rating) =>
                      setMealQualityRating({
                        value: rating,
                        error: "",
                        touched: true,
                      })
                    }
                  />
                </View>
                <View style={{ marginTop: moderateScale(15) }}>
                  <Text
                    style={{
                      fontFamily: "PoppinsRegular",
                      fontSize: moderateScale(14),
                      marginLeft: moderateScale(10),
                      letterSpacing: 1.1,
                      marginBottom: moderateScale(10),
                    }}
                  >
                    Service qualtity
                  </Text>
                  <StarRating
                    rating={serviceQualityRating.value}
                    onChange={(rating) =>
                      setServiceQualityRating({
                        value: rating,
                        error: "",
                        touched: true,
                      })
                    }
                  />
                </View>
                <View style={{ marginTop: moderateScale(15) }}>
                  <Text
                    style={{
                      fontFamily: "PoppinsRegular",
                      fontSize: moderateScale(14),
                      marginLeft: moderateScale(10),
                      letterSpacing: 1.1,
                      marginBottom: moderateScale(10),
                    }}
                  >
                    Taste and Flavour of food
                  </Text>
                  <StarRating
                    rating={tasteQualityRating.value}
                    onChange={(rating) =>
                      setTasteQualityRating({
                        value: rating,
                        error: "",
                        touched: true,
                      })
                    }
                  />
                </View>
                <View style={{ marginTop: moderateScale(15) }}>
                  <Text
                    style={{
                      fontFamily: "PoppinsRegular",
                      fontSize: moderateScale(14),
                      marginLeft: moderateScale(10),
                      letterSpacing: 1.1,
                      marginBottom: moderateScale(10),
                    }}
                  >
                    Freshness of ingredients
                  </Text>
                  <StarRating
                    rating={freshnessQualityRating.value}
                    onChange={(rating) =>
                      setFreshnessQualityRating({
                        value: rating,
                        error: "",
                        touched: true,
                      })
                    }
                  />
                </View>
                <View style={{ marginTop: moderateScale(15) }}>
                  <Text
                    style={{
                      fontFamily: "PoppinsRegular",
                      fontSize: moderateScale(14),
                      marginLeft: moderateScale(10),
                      letterSpacing: 1.1,
                      marginBottom: moderateScale(10),
                    }}
                  >
                    Size of portions
                  </Text>
                  <StarRating
                    rating={sizeOfPortionsRating.value}
                    onChange={(rating) =>
                      setSizeOfPortionRating({
                        value: rating,
                        error: "",
                        touched: true,
                      })
                    }
                  />
                </View>
                <View style={{ marginTop: moderateScale(15) }}>
                  <Text
                    style={{
                      fontFamily: "PoppinsRegular",
                      fontSize: moderateScale(14),
                      marginLeft: moderateScale(10),
                      letterSpacing: 1.1,
                      marginBottom: moderateScale(10),
                    }}
                  >
                    Worth of meal over price
                  </Text>
                  <StarRating
                    rating={worthOfMealRating.value}
                    onChange={(rating) =>
                      setWorthOfMealRating({
                        value: rating,
                        error: "",
                        touched: true,
                      })
                    }
                  />
                </View>
                <View style={{ marginTop: moderateScale(10) }}>
                  <TextInput
                    label="Additional feedback"
                    mode="outlined"
                    style={{
                      fontFamily: "PoppinsRegular",
                      letterSpacing: 1.1,
                      minHeight: moderateScale(100),
                    }}
                    multiline
                    value={comments}
                    onChangeText={(text) => setComments(text)}
                  />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
            <Button
              mode="contained"
              style={{
                marginTop: moderateScale(20),
                marginBottom: moderateScale(20),
              }}
              onPress={() => onSubmitClick()}
              disabled={loading}
            >
              Submit Feedback
            </Button>
          </View>
          <Snackbar
            visible={openSnackBar}
            onDismiss={() => {
              setOpenSnackBar(false);
              dispatch({ type: CLEAR_FEEDBACK_REQUEST_STATE });
            }}
            style={{
              backgroundColor: feedbackRequestSuccess ? "#28a745" : "#dc3545",
            }}
            duration={3000}
          >
            {feedbackRequestSuccess
              ? "Feedback submitted !"
              : "Something wrong with the backend !"}
          </Snackbar>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackContainer: {
    flex: 1,
    color: "#fff",
  },
});
