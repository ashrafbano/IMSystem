/*Author: CHAKRAVARTHI KATRAGADDA
  Created at: 06/05/2021
  Description: This is the drawer for the app.
 */

import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Share,
  Alert,
  Linking,
} from "react-native";
import { Avatar, Drawer, Switch } from "react-native-paper";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as firebase from "firebase/compat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  isAndroid,
  isIOS,
  windowHeight,
  windowWidth,
} from "../../utils/deviceInfo";
import { moderateScale } from "../../utils/fontScaling";
import { useDispatch } from "react-redux";
import { AntDesign, Entypo } from "@expo/vector-icons";

export function DrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  return (
    <>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            top: isAndroid ? insets.top + 15 : 10,
            marginBottom: insets.top,
          }}
        >
          <Image
            source={require("../../assets/ShareBoardLogo.png")}
            style={{ width: 150, height: 35, marginTop: moderateScale(10) }}
          />
        </View>
        <Drawer.Section
          style={{
            flex: 1,
            top: isAndroid ? insets.top + windowHeight / 12 : insets.top,
          }}
        >
          <DrawerItemList {...props} />
        </Drawer.Section>

        <Drawer.Section
          style={{
            top: isAndroid ? insets.top + windowHeight / 12 : insets.top,
          }}
        >
          <DrawerItem
            icon={({ color, size }) => (
              <AntDesign name="logout" color={"#4A4A4A"} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              firebase.default.auth().signOut();
            }}
            labelStyle={{
              fontFamily: "PoppinsMedium",
              fontSize: moderateScale(15, 0.5),
              color: "#4A4A4A",
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <View
        style={{
          position: "absolute",
          bottom: moderateScale(30, 0.4),
          left: 0,
          right: 0,
        }}
      >
        <View style={styles.rightsView}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "PoppinsRegular",
              color: "#ccc",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} IM System. All rights reserved.
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  rightsView: {
    paddingHorizontal: 15,
    alignSelf: "center",
    paddingTop: windowWidth / 10,
  },
  switchView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
  },
  darkModeText: { fontSize: 15, fontFamily: "Light" },
  drawerImage: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: windowWidth / 4,
    marginBottom: 10,
  },
  nameText: {
    color: "#fff",
    fontSize: 19,
    marginBottom: 5,
    fontFamily: "PoppinsRegular",
  },
  iconView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: windowWidth / 10,
    marginTop: 10,
  },
});
