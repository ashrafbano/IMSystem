import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAdminApprovedHolidayRequests } from "../redux/actions/holidayRequestActions";
import { useAppSelector } from "../redux/store";
import { ActivityIndicator, Button } from "react-native-paper";
import { moderateScale } from "../utils/fontScaling";
import { RefreshControl } from "react-native-gesture-handler";
import { HolidayRequestHomeStackNavigationProp } from "../routes/home/HolidayRequestStack";
import { useIsFocused } from "@react-navigation/native";
import { DatePickerModal } from "react-native-paper-dates";
import { HolidayRequest } from "../types/holidayRequest";

interface IProps {
  navigation: HolidayRequestHomeStackNavigationProp;
}

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

export const AdminApprovedHolidayRequestScreen: React.FC<IProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [approvedRequests, setApprovedRequests] = useState([]);

  const {
    adminApprovedHolidayRequests,
    getAdminApprovedHolidayRequestsLoading,
  } = useAppSelector((state) => state.holidayRequest);

  useEffect(() => {
    dispatch(getAdminApprovedHolidayRequests());
  }, [isFocused]);

  useEffect(() => {
    setApprovedRequests(
      adminApprovedHolidayRequests.filter((req: HolidayRequest) => {
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
  }, [adminApprovedHolidayRequests]);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = ({ date }: { date: Date }) => {
    setOpen(false);
    setDate(date);
  };

  useEffect(() => {
    console.log(
      adminApprovedHolidayRequests.filter((req: HolidayRequest) => {
        console.log(
          `${new Date(req.createdDate).getDate()}/${new Date(
            req.createdDate
          ).getMonth()}/${new Date(req.createdDate).getFullYear()}`,
          `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(
            date
          ).getFullYear()}`
        );
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
    setApprovedRequests(
      adminApprovedHolidayRequests.filter((req: HolidayRequest) => {
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
  }, [date]);

  if (getAdminApprovedHolidayRequestsLoading) {
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
  if (
    !adminApprovedHolidayRequests ||
    adminApprovedHolidayRequests.length === 0
  ) {
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
          <Button onPress={() => dispatch(getAdminApprovedHolidayRequests())}>
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
          data={approvedRequests}
          contentContainerStyle={{ paddingBottom: moderateScale(120) }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={() => dispatch(getAdminApprovedHolidayRequests())}
              refreshing={getAdminApprovedHolidayRequestsLoading}
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
                activeOpacity={1}
                // onPress={() =>
                //   navigation.navigate("PreviousHolidayRequests", {
                //     phone: item.phone,
                //     holidayRequest: item,
                //   })
                // }
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
                      marginTop: moderateScale(10),
                      width: 100,
                      flexDirection: "row",
                      justifyContent: "center",
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
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
