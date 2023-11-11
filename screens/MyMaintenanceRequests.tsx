import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { AppHeader } from "../components/AppHeader";
import { useDispatch } from "react-redux";
import { getHolidayRequests } from "../redux/actions/holidayRequestActions";
import { useAppSelector } from "../redux/store";
import { ActivityIndicator, Button, Surface } from "react-native-paper";
import { moderateScale } from "../utils/fontScaling";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import {
  getMaintenanceRequests,
  setMaintenanceRequest,
} from "../redux/actions/maintenanceRequestActions";
import { windowWidth } from "../utils/deviceInfo";
import { useIsFocused } from "@react-navigation/native";

export const getStatusColor = (status: string) => {
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

export const MyMaintenanceRequests = () => {
  const dispatch = useDispatch<any>();
  const { maintenanceRequests, getMaintenanceLoading } = useAppSelector(
    (state) => state.maintenanceRequest
  );
  const { setAdminMaintenanceRequestId, setAdminMaintenanceRequestsLoading } =
    useAppSelector((state) => state.maintenanceRequest);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getMaintenanceRequests());
  }, [isFocused]);
  if (getMaintenanceLoading) {
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

  if (!maintenanceRequests || maintenanceRequests.length === 0) {
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
            <Button onPress={() => dispatch(getMaintenanceRequests())}>
              Fetch Now
            </Button>
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
          data={maintenanceRequests}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={getMaintenanceLoading}
              onRefresh={() => dispatch(getMaintenanceRequests())}
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
                    {item.status === "APPROVED" ? "RESOLVED" : item.status}
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
                  Issue: {item.issue}
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
                  Room number: {item.roomNumber}
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
                  Issue Description: {item.issueDescription}
                </Text>
              </View>
              {item.status === "APPROVED" ||
              item.status === "REJECTED" ? null : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: moderateScale(10),
                  }}
                >
                  {setAdminMaintenanceRequestId === item.id &&
                  setAdminMaintenanceRequestsLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <>
                      <Button
                        textColor="#075c17"
                        labelStyle={{ fontFamily: "PoppinsMedium" }}
                        onPress={() =>
                          dispatch(setMaintenanceRequest(item, "APPROVED"))
                        }
                      >
                        Resolved
                      </Button>
                      <Button
                        textColor="#eb3a09"
                        labelStyle={{ fontFamily: "PoppinsMedium" }}
                        onPress={() =>
                          dispatch(setMaintenanceRequest(item, "REJECTED"))
                        }
                      >
                        Not resolved
                      </Button>
                    </>
                  )}
                </View>
              )}
            </Surface>
          )}
        />
      </View>
    </View>
  );
};
