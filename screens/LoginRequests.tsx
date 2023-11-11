import {
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import {
  Button,
  Snackbar,
  TextInput,
  IconButton,
  MD3Colors,
  ActivityIndicator,
} from "react-native-paper";

import React from "react";
import { AppHeader } from "../components/AppHeader";
import { moderateScale } from "../utils/fontScaling";
import { isAndroid } from "../utils/deviceInfo";
import { useAppSelector } from "../redux/store";
import {
  CLEAR_STUDENT_STATE,
  getStudent,
  setStatus,
} from "../redux/actions/studentActions";
import { useDispatch } from "react-redux";

export const LoginRequests = () => {
  const dispatch = useDispatch<any>();
  const { students, loading, setStudentStatusLoading, setStudentStatusPhone } =
    useAppSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudent());
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <AppHeader />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  if (students.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <AppHeader />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontFamily: "PoppinsMedium", letterSpacing: 1.1 }}>
            No new requests this moment
          </Text>
          <Button
            style={{ marginTop: moderateScale(10) }}
            onPress={() => dispatch(getStudent())}
          >
            Fetch Now
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppHeader />
      <View style={{ padding: moderateScale(15) }}>
        <FlatList
          data={students}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: moderateScale(100) }}
          renderItem={({ item }) => (
            <View
              style={{ backgroundColor: "#eee", padding: moderateScale(10) }}
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
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: moderateScale(15),
                    letterSpacing: 1.1,
                  }}
                >
                  {item.yearOfPassing}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "PoppinsMedium",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                BRANCH: {item.branch}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsMedium",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                Phone number: +91{item.phone}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsMedium",
                  marginTop: moderateScale(5),
                  fontSize: moderateScale(13),
                }}
              >
                Room number: {item.roomNumber}
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                {setStudentStatusLoading &&
                item.id === setStudentStatusPhone ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    <Button
                      textColor="#075c17"
                      labelStyle={{ fontFamily: "PoppinsMedium" }}
                      onPress={() => dispatch(setStatus(item.id, "APPROVED"))}
                    >
                      Approve
                    </Button>

                    <Button
                      textColor="#eb3a09"
                      labelStyle={{ fontFamily: "PoppinsMedium" }}
                      onPress={() => dispatch(setStatus(item.id, "REJECTED"))}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
