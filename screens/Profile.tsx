import { View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import * as firebase from "firebase/compat";
import Button from "../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export const Profile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppHeader />
      <View style={styles.profileContainer}>
        <View>
          <Button
            title="Sign Out"
            Icon={() => <FontAwesome name="sign-out" size={24} color="white" />}
            width={150}
            onPress={() => firebase.default.auth().signOut()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
