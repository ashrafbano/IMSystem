import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "../utils/fontScaling";
import { UserHomeStackNavigationProp } from "../routes/home/HomeStack";
import { DrawerStackNavigationProp } from "../routes/drawer/Drawer";
import { useAppSelector } from "../redux/store";

interface IProps {
  showBack?: boolean;
  navigation?: UserHomeStackNavigationProp;
}

export const AppHeader: React.FC<IProps> = ({
  showBack = false,
  navigation,
}) => {
  const { top } = useSafeAreaInsets();
  const drawerNavigation = useAppSelector(
    (state) => state.navigation.drawerNavigator
  );
  return (
    <View
      style={{
        paddingTop: moderateScale(top),
        paddingBottom: moderateScale(10),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: moderateScale(10),
        backgroundColor: "#fff",
      }}
    >
      {showBack ? (
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          activeOpacity={0.8}
        >
          <Feather name="chevron-left" size={moderateScale(25)} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => drawerNavigation?.openDrawer()}
          activeOpacity={0.8}
        >
          <Ionicons name="ios-menu" size={26} color="black" />
        </TouchableOpacity>
      )}
      <Image
        source={require("../assets/ShareBoardLogo.png")}
        style={{ width: 150, height: 35, marginTop: moderateScale(10) }}
      />
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  appHeaderContainer: {
    flex: 1,
  },
});
