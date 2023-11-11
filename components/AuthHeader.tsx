import { View, Text, Image } from "react-native";
import React from "react";
import Logo from "../assets/blob.svg";

interface IAuthHeaderProps {
  logoWidth?: number | undefined;
  logoHeight?: number | undefined;
}

const AuthHeader: React.FC<IAuthHeaderProps> = ({ logoHeight, logoWidth }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: -30,
      }}
    >
      <Image
        source={require("../assets/ShareBoardLogo.png")}
        style={{ width: 200, height: 50, marginLeft: 30 }}
      />
      <Logo width={logoWidth || 280} height={logoHeight || 280} />
    </View>
  );
};

export default AuthHeader;
