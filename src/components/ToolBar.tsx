import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, ImageSourcePropType, TextProps, TextStyle, ViewStyle } from "react-native";
import { backIcon } from "@helper/imagesAssets";// Ensure correct import
import NavigationService from "@navigations/NavigationService";
import { AppText, TWENTY_EIGHT, TWENTY_TWO } from "./AppText";

interface ToolBarProps {
  handleLeftIconPress?: () => void;
  leftIcon?: ImageSourcePropType;
  isLeftIcon?: boolean;
  title?:string,
  textType?:string
  titleStyle?:TextStyle,
  mainContainerStyle:ViewStyle
}

const ToolBar: React.FC<ToolBarProps> = ({
  handleLeftIconPress,
  leftIcon,
  isLeftIcon = false,
  title,
  textType,
  titleStyle,
  mainContainerStyle
}) => {
  return (
    <View style={[styles.mainContainer,mainContainerStyle]}>
      {isLeftIcon && (
        <TouchableOpacity
          style={styles.backArrow}
          onPress={handleLeftIconPress ? handleLeftIconPress : NavigationService.goBack()}
        >
          <Image source={leftIcon || backIcon} style={styles.icon} />
        </TouchableOpacity>
      )}
      {title && (
        <AppText type={textType? textType :TWENTY_TWO }  style={[styles.titleStyle ,titleStyle]}>
          {title}
        </AppText>
      )}
    </View>
  );
};

export default ToolBar;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 20,
    width: "100%",
  },
  backArrow: {
    width: 30,
    justifyContent: "center",
  },
  icon: {
    width: 12,
    height: 24,
  },
  titleStyle:{ marginLeft: 10 }
});