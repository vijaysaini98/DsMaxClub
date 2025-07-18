import React from "react";
import { Image, TextInput, View, TextInputProps, ViewStyle, ImageSourcePropType, StyleProp, StyleSheet } from "react-native";
import TouchableOpacityView from "./TouchableOpacityView";
import { fontFamily } from "@theme/fonts";
import { colors } from "@theme/colors";
import { AppText, ERROR_TEXT } from "./AppText";

interface InputProps extends TextInputProps {
  secureTextEntry?: boolean;
  handleLeftIconPress?: () => void;
  inputStyle?: StyleProp<any>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  leftIcon?: ImageSourcePropType;
  errorText?: string,
  editable:boolean
}

const Input: React.FC<InputProps> = ({
  secureTextEntry,
  handleLeftIconPress,
  inputStyle,
  inputContainerStyle,
  placeholder,
  placeholderTextColor = colors.placeholder,
  value,
  onChangeText,
  leftIcon,
  errorText,
  editable = true,
  ...rest
}) => {
  return (
    <View>
      <View
        style={[
          styles.inputContainer(errorText),
          !editable && styles.disabledInput,
          inputContainerStyle,
        ]}
      >
        {leftIcon && (
          <TouchableOpacityView
            activeOpacity={handleLeftIconPress ? 0.7 : 1}
            onPress={handleLeftIconPress}
          >
            <Image source={leftIcon} style={styles.leftIconStyle} resizeMode="contain" />
          </TouchableOpacityView>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          style={[styles.inputStyle(leftIcon), inputStyle]}
          secureTextEntry={secureTextEntry}
          editable={editable}
          {...rest}
        />

      </View>
      {errorText &&
        (<AppText color={ERROR_TEXT} style={styles.errorTextStyle}>{errorText}</AppText>)
      }
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer:(errorText:string)=>({
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: errorText ? colors.red:colors.borderColor,
    borderRadius: 30,
    paddingHorizontal: 16,
    backgroundColor:  colors.white ,
    gap: 10,
    width: "100%"
  }),
   disabledInput: {
    backgroundColor:colors.disableInputBg, 
  },
  leftIconStyle: {
    width: 24,
    height: 24
  },
  inputStyle: (isIcon:boolean) => ({
    width: isIcon ? "90%" : "100%",
    fontSize: 16,
    fontFamily: fontFamily,
    color:colors.black
  }),
  errorTextStyle: {
    marginLeft: 15,
    marginTop: 5
  }
})