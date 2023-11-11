import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { AppHeader } from "../components/AppHeader";
import {
  HolidayRequestHomeStackNavigationProp,
  HolidayRequestHomeStackRoute,
} from "../routes/home/HolidayRequestStack";
import { useDispatch } from "react-redux";
import {
  CLEAR_PREVIOUS_HOLIDAY_REQUEST_STATE,
  getPreviousHolidayRequests,
} from "../redux/actions/holidayRequestActions";
import { useAppSelector } from "../redux/store";
import { FlatList } from "react-native-gesture-handler";
import { moderateScale } from "../utils/fontScaling";
import { HolidayRequest } from "../types/holidayRequest";
import { useIsFocused } from "@react-navigation/native";

interface IProps {
  navigation: HolidayRequestHomeStackNavigationProp;
  route: HolidayRequestHomeStackRoute;
}

const PreviousHolidayRequests: React.FC<IProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<any>();
  const { previousHolidayRequestsLoading, previousHolidayRequests } =
    useAppSelector((state) => state.holidayRequest);
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(
      getPreviousHolidayRequests(route.params?.holidayRequest.userPhone)
    );

    return () => {
      dispatch({ type: CLEAR_PREVIOUS_HOLIDAY_REQUEST_STATE });
    };
  }, [isFocused]);
  return (
    <View>
      <AppHeader showBack navigation={navigation} />
      <View>
        <FlatList
          contentContainerStyle={{ paddingBottom: moderateScale(100) }}
          showsVerticalScrollIndicator={false}
          data={previousHolidayRequests.filter(
            (holiday: HolidayRequest) =>
              holiday.id !== route.params?.holidayRequest.id
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "#eee",
                padding: moderateScale(10),
                marginBottom: moderateScale(15),
                marginHorizontal: moderateScale(15),
              }}
              key={item.id}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("PreviousHolidayRequests", {
                  phone: item.phone,
                  holidayRequest: item,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: moderateScale(10),
                }}
              >
                <Text
                  style={{
                    fontFamily: "PoppinsMedium",
                    fontSize: moderateScale(17),
                    letterSpacing: 1.1,
                  }}
                >
                  {item.name.split(" ")[0]}
                </Text>
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: moderateScale(15),
                    letterSpacing: 1.1,
                  }}
                >
                  Days: {item.noOfDays}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "PoppinsMedium",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                Reason: {item.reason}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsMedium",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                Parent Phone number: +91{item.phone}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsMedium",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                Student phone: {item.userPhone}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                Start Date: {item.startDate}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                End Date: {item.endDate}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default PreviousHolidayRequests;

const styles = StyleSheet.create({});
