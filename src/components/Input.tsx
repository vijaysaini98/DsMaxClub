import React from "react";
import { Image, TextInput, View, StyleSheet } from "react-native";
import TouchableOpacityView from "./TouchableOpacityView";
import { fontFamily } from "@theme/fonts";
import { colors } from "@theme/colors";
import { AppText, BOLD, ERROR_TEXT, FOURTEEN, MEDIUM, SEMI_BOLD, TWELVE } from "./AppText";
import { InputProps } from "src/types/common";
import { ms } from "react-native-size-matters/extend";

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
  assignRef,
  label,
  required,
  ...rest
}) => {
  return (
    <View style={{gap:5}}>
      {label && <AppText type={FOURTEEN} weight={MEDIUM}>{label}
        {required && <AppText type={TWELVE} color={ERROR_TEXT} weight={BOLD}> *</AppText>}
        </AppText>}
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
          ref={component => {
            assignRef && assignRef(component);
          }}
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
    fontSize: ms(16),
    fontFamily: fontFamily,
    color:colors.black
  }),
  errorTextStyle: {
    marginLeft: 15,
    marginTop: 5
  }
})