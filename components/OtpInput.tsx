import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { forwardRef } from "react";
import { moderateScale } from "../utils/fontScaling";

interface IOtpInputProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  nextReference: any;
}

const OtpInput: React.FC<IOtpInputProps> = forwardRef((props, ref) => {
  const { setValue, value, nextReference } = props;
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#bababa",
        borderRadius: 5,
        height: 40,
        width: 40,
      }}
      activeOpacity={0.8}
      onPress={ref?.current?.focus}
    >
      <TextInput
        keyboardType="number-pad"
        maxLength={1}
        style={{
          fontFamily: "PoppinsBold",
          fontSize: moderateScale(16),
        }}
        onChangeText={(otp) => {
          setValue(otp);
        }}
        value={value}
        ref={ref}
      />
    </TouchableOpacity>
  );
});

export default OtpInput;
