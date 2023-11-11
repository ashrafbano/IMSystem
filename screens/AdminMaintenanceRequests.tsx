import { View, Text, FlatList } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import {
  getAdminMaintenanceRequests,
  setMaintenanceRequest,
} from "../redux/actions/maintenanceRequestActions";
import { DatePickerModal } from "react-native-paper-dates";
import { useAppSelector } from "../redux/store";
import { ActivityIndicator, Button, Snackbar } from "react-native-paper";
import { moderateScale } from "../utils/fontScaling";
import { RefreshControl } from "react-native-gesture-handler";
import { CLEAR_HOLIDAY_REQUEST_STATE } from "../redux/actions/holidayRequestActions";
import { useIsFocused } from "@react-navigation/native";
import { getStatusColor } from "./MyMaintenanceRequests";

export const AdminMaintenanceRequests = () => {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [maintenanceRequests, setmaintenanceRequests] = useState([]);

  const {
    adminMaintenanceRequests,
    getAdminMaintenanceRequestsLoading,
    setAdminMaintenanceRequestId,
    setAdminMaintenanceRequestsLoading,
  } = useAppSelector((state) => state.maintenanceRequest);

  useEffect(() => {
    dispatch(getAdminMaintenanceRequests());
  }, [isFocused]);

  useEffect(() => {
    setmaintenanceRequests(
      adminMaintenanceRequests.filter((req: any) => {
        return (
          `${new Date(req.createdDate).getDate()}/${new Date(
            req.createdDate
          ).getMonth()}/${new Date(req.createdDate).getFullYear()}` ===
          `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(
            date
          ).getFullYear()}`
        );
      })
    );
  }, [adminMaintenanceRequests]);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = ({ date }: { date: Date }) => {
    setOpen(false);
    setDate(date);
  };

  useEffect(() => {
    setmaintenanceRequests(
      adminMaintenanceRequests.filter(
        (req: any) =>
          `${new Date(req.createdDate).getDate()}/${new Date(
            req.createdDate
          ).getMonth()}/${new Date(req.createdDate).getFullYear()}` ===
          `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(
            date
          ).getFullYear()}`
      )
    );
  }, [date]);

  if (getAdminMaintenanceRequestsLoading) {
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
  if (!adminMaintenanceRequests || adminMaintenanceRequests.length === 0) {
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
            <Button onPress={() => dispatch(getAdminMaintenanceRequests())}>
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
      <View style={{ padding: moderateScale(15) }}>
        <Button
          mode="contained"
          style={{ marginBottom: moderateScale(20) }}
          onPress={() => setOpen(true)}
        >
          Showing For:{" "}
          {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
        />
        <FlatList
          data={maintenanceRequests}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: moderateScale(100) }}
          refreshControl={
            <RefreshControl
              onRefresh={() => dispatch(getAdminMaintenanceRequests())}
              refreshing={getAdminMaintenanceRequestsLoading}
            />
          }
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#eee",
                padding: moderateScale(10),
                marginBottom: moderateScale(15),
              }}
              key={item.id}
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
                  Room: {item.roomNumber}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "PoppinsMedium",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                Issue: {item.issueDescription}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsMedium",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                Issue: {item.issue}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsMedium",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                Student phone: {item.phone}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
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
            </View>
          )}
        />
      </View>
    </View>
  );
};
