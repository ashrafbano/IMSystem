import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  CLEAR_HOLIDAY_REQUEST_STATE,
  getAdminHolidayRequests,
  setHolidayRequest,
} from "../redux/actions/holidayRequestActions";
import { useAppSelector } from "../redux/store";
import { ActivityIndicator, Button, Snackbar } from "react-native-paper";
import { moderateScale } from "../utils/fontScaling";
import { RefreshControl } from "react-native-gesture-handler";
import { HolidayRequestHomeStackNavigationProp } from "../routes/home/HolidayRequestStack";

interface IProps {
  navigation: HolidayRequestHomeStackNavigationProp;
}

export const AdminHolidayRequests: React.FC<IProps> = ({ navigation }) => {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();
  const {
    adminHolidayRequests,
    getAdminHolidayRequestsLoading,
    setAdminHolidayRequestId,
    setAdminHolidayRequestsLoading,
    setAdminHolidayRequestsSuccess,
    setAdminHolidayRequestsFail,
  } = useAppSelector((state) => state.holidayRequest);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  useEffect(() => {
    dispatch(getAdminHolidayRequests());
  }, [isFocused]);
  useEffect(() => {
    if (setAdminHolidayRequestsSuccess || setAdminHolidayRequestsFail) {
      setOpenSnackBar(true);
    }
  }, [setAdminHolidayRequestsFail, setAdminHolidayRequestsSuccess]);
  if (getAdminHolidayRequestsLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <AppHeader />
        <View
          style={{
            flex: 0.8,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      </View>
    );
  }
  if (!adminHolidayRequests || adminHolidayRequests.length === 0) {
    return (
      <>
        <AppHeader />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              paddingHorizontal: moderateScale(18),
              paddingVertical: moderateScale(10),
              borderRadius: moderateScale(8),
            }}
          >
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                letterSpacing: 1.1,
              }}
            >
              No requests as of now
            </Text>
          </View>
          <Button onPress={() => dispatch(getAdminHolidayRequests())}>
            Fetch Now
          </Button>
        </View>
      </>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppHeader />
      <View style={{ padding: moderateScale(15) }}>
        <FlatList
          data={adminHolidayRequests}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: moderateScale(100) }}
          refreshControl={
            <RefreshControl
              onRefresh={() => dispatch(getAdminHolidayRequests())}
              refreshing={getAdminHolidayRequestsLoading}
            />
          }
          renderItem={({ item }) => {
            const startDate = new Date(item.startDate);
            const endDate = new Date(item.endDate);
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  padding: moderateScale(10),
                  marginBottom: moderateScale(15),
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
                    Days: {item.noOfDays}{" "}
                    {`(${startDate.getDate()}/${
                      startDate.getMonth() + 1
                    } to ${endDate.getDate()}/${endDate.getMonth() + 1})`}
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
                    fontFamily: "PoppinsMedium",
                    marginTop: moderateScale(5),
                    fontSize: moderateScale(13),
                  }}
                >
                  Branch: {item.branch}
                </Text>
                <Text
                  style={{
                    fontFamily: "PoppinsMedium",
                    marginTop: moderateScale(5),
                    fontSize: moderateScale(13),
                  }}
                >
                  Room Number: {item.roomNumber}
                </Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  {setAdminHolidayRequestId === item.id &&
                  setAdminHolidayRequestsLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <>
                      <Button
                        textColor="#075c17"
                        labelStyle={{ fontFamily: "PoppinsMedium" }}
                        onPress={() =>
                          dispatch(setHolidayRequest(item, "APPROVED"))
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        textColor="#eb3a09"
                        labelStyle={{ fontFamily: "PoppinsMedium" }}
                        onPress={() =>
                          dispatch(setHolidayRequest(item, "REJECTED"))
                        }
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Snackbar
        visible={openSnackBar}
        onDismiss={() => {
          setOpenSnackBar(false);
          dispatch({ type: CLEAR_HOLIDAY_REQUEST_STATE });
        }}
        style={{
          backgroundColor: setAdminHolidayRequestsSuccess
            ? "#28a745"
            : "#dc3545",
        }}
        duration={3000}
      >
        {setAdminHolidayRequestsSuccess
          ? "Holiday request status changed !"
          : "Something wrong with the backend !"}
      </Snackbar>
    </View>
  );
};
