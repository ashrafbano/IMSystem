import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { AppHeader } from "../components/AppHeader";
import { useDispatch } from "react-redux";
import { getHolidayRequests } from "../redux/actions/holidayRequestActions";
import { useAppSelector } from "../redux/store";
import { ActivityIndicator, Surface } from "react-native-paper";
import { moderateScale } from "../utils/fontScaling";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

const getStatusColor = (status: string) => {
  switch (status) {
    case "CREATED":
      return "#fc823a";
    case "APPROVED":
      return "#2c8514";
    case "REJECTED":
      return "#ed3424";
    default:
      return "#fc823a";
  }
};

const MyHolidayRequests = () => {
  const dispatch = useDispatch<any>();
  const { holidayRequests, getHolidayLoading } = useAppSelector(
    (state) => state.holidayRequest
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getHolidayRequests());
  }, [isFocused]);

  if (getHolidayLoading) {
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
  if (!holidayRequests || holidayRequests.length === 0) {
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
        </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppHeader />
      <View style={{ marginHorizontal: 15, marginTop: moderateScale(20) }}>
        <FlatList
          data={holidayRequests}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: moderateScale(100) }}
          refreshControl={
            <RefreshControl
              refreshing={getHolidayLoading}
              onRefresh={() => dispatch(getHolidayRequests())}
            />
          }
          renderItem={({ item }) => (
            <Surface
              style={{
                minHeight: 150,
                backgroundColor: "#fce6b8",
                borderRadius: 10,
                marginBottom: moderateScale(20),
                elevation: 10,
                padding: moderateScale(15),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(18),
                    fontFamily: "PoppinsMedium",
                    letterSpacing: 1.1,
                  }}
                >
                  {item.name.split(" ")[0]}
                </Text>
                <View
                  style={{
                    backgroundColor: getStatusColor(item.status),
                    padding: moderateScale(5),
                    borderRadius: moderateScale(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(10),
                      fontFamily: "PoppinsBold",
                      color: "#fff",
                      letterSpacing: 1.1,
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: moderateScale(10) }}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: "PoppinsRegular",
                    letterSpacing: 1.1,
                  }}
                >
                  My Phone: {item.userPhone}
                </Text>
              </View>
              <View style={{ marginTop: moderateScale(5) }}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: "PoppinsRegular",
                    letterSpacing: 1.1,
                  }}
                >
                  Parent Phone: {item.phone}
                </Text>
              </View>
              <View style={{ marginTop: moderateScale(5) }}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: "PoppinsRegular",
                    letterSpacing: 1.1,
                  }}
                >
                  Reason: {item.reason}
                </Text>
              </View>
            </Surface>
          )}
        />
      </View>
    </View>
  );
};

export default MyHolidayRequests;
