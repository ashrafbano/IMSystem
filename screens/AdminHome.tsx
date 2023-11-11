import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { AppHeader } from "../components/AppHeader";
import { useDispatch } from "react-redux";
import { getAdminHolidayRequests } from "../redux/actions/holidayRequestActions";
import { useAppSelector } from "../redux/store";
import { getAdminMaintenanceRequests } from "../redux/actions/maintenanceRequestActions";
import { moderateScale } from "../utils/fontScaling";
import { windowWidth } from "../utils/deviceInfo";
import { useIsFocused } from "@react-navigation/native";
import { getFeedbacks } from "../redux/actions/feedbackActions";

const AdminHome = () => {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();
  const { adminHolidayRequests } = useAppSelector(
    (state) => state.holidayRequest
  );
  const { feedbacks } = useAppSelector((state) => state.feedback);
  useEffect(() => {
    dispatch(getAdminHolidayRequests());
    dispatch(getFeedbacks());
  }, [isFocused]);
  const { adminMaintenanceRequests } = useAppSelector(
    (state) => state.maintenanceRequest
  );
  const avgRating = feedbacks.reduce((acc: number, feedback: any) => {
    acc =
      acc +
      feedback.freshnessOfIngredients +
      feedback.mealQuality +
      feedback.serviceQuality +
      feedback.sizeOfPortions +
      feedback.tasteAndFlavour +
      feedback.worthOfMealOverPrice;
    return acc;
  }, 0);
  useEffect(() => {
    dispatch(getAdminMaintenanceRequests());
  }, [isFocused]);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppHeader />
      <View
        style={{
          padding: moderateScale(15),
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            backgroundColor: "#ebdd46",
            minHeight: moderateScale(100),
            padding: moderateScale(15),
            borderRadius: moderateScale(10),
            maxWidth: windowWidth / 2,
            marginRight: moderateScale(15),
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontFamily: "PoppinsBold", fontSize: moderateScale(15) }}
          >
            H - Requests
          </Text>
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: moderateScale(25),
              marginTop: moderateScale(15),
            }}
          >
            {adminHolidayRequests.length}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#ebdd46",
            minHeight: moderateScale(50),
            padding: moderateScale(15),
            borderRadius: moderateScale(10),
            maxWidth: windowWidth / 2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontFamily: "PoppinsBold", fontSize: moderateScale(15) }}
          >
            M - Requests
          </Text>
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: moderateScale(25),
              marginTop: moderateScale(15),
            }}
          >
            {adminMaintenanceRequests.length}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: moderateScale(15),
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: moderateScale(12),
        }}
      >
        <View
          style={{
            backgroundColor: "#ebdd46",
            minHeight: moderateScale(100),
            padding: moderateScale(15),
            borderRadius: moderateScale(10),
            minWidth: windowWidth / 1.2,
            marginRight: moderateScale(15),
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontFamily: "PoppinsBold", fontSize: moderateScale(15) }}
          >
            Meal Rating
          </Text>
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: moderateScale(25),
              marginTop: moderateScale(15),
            }}
          >
            {isNaN(parseInt((avgRating / (feedbacks.length * 6)).toFixed(2)))
              ? "No rating"
              : (avgRating / (feedbacks.length * 6)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AdminHome;
