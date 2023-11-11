import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

interface IButtonProps {
  Icon?: React.FC;
  title: string;
  onPress?: () => void;
  width?: number;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  Icon,
  title,
  onPress,
  width = 120,
  disabled,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <LinearGradient
        style={{ ...styles.btnLinearGradient, width }}
        colors={["#f7c155", "#ff9929"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.btnContainer}>
          <Text style={styles.btnTitleText}>{title}</Text>
          {Icon && <Icon />}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnLinearGradient: {
    padding: 12,
    backgroundColor: "red",
    minWidth: 120,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 50,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  btnTitleText: {
    fontFamily: "PoppinsBold",
    color: "#fff",
    fontSize: 16,
    marginRight: 15,
  },
});

export default Button;
