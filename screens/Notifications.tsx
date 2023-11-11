import { View, Text, StyleSheet } from "react-native";
import { AppHeader } from "../components/AppHeader";

export const Notifications = () => {
  return (
    <View style={styles.notificationsContainer}>
      <AppHeader />
      <Text>Notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationsContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
