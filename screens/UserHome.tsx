import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { windowHeight, windowWidth } from "../utils/deviceInfo";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale } from "../utils/fontScaling";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { UserHomeStackNavigationProp } from "../routes/home/HomeStack";
import { DrawerStackNavigationProp } from "../routes/drawer/Drawer";

interface IProps {
  navigation: UserHomeStackNavigationProp;
}

export const UserHome: React.FC<IProps> = ({ navigation }) => {
  return (
    <>
      <AppHeader />
      <View style={styles.userHomeContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginTop: 10 }}
          onPress={() => navigation?.navigate("HolidayRequest")}
        >
          <LinearGradient
            colors={["#f7c155", "#ff9929"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderRadius: 10 }}
          >
            <View
              style={{
                minHeight: windowHeight / 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  color: "#fff",
                  fontSize: moderateScale(18),
                  marginRight: 15,
                }}
              >
                Holiday Request
              </Text>
              <AntDesign name="arrowright" size={30} color={"#fff"} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userHomeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
