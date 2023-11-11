import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface IErrorTextProps {
  text: string;
  iconColor?: string | "red";
}

const ErrorText: React.FC<IErrorTextProps> = ({ text, iconColor = "red" }) => {
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialIcons name="error" size={24} color={iconColor} />
      <Text
        style={{
          fontFamily: "PoppinsMedium",
          color: "red",
          marginLeft: 8,
          fontSize: 13,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default ErrorText;
