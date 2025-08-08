import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, ImageSourcePropType, TextStyle, ViewStyle } from "react-native";
import { backIcon } from "@helper/imagesAssets";// Ensure correct import
import NavigationService from "@navigations/NavigationService";
import { AppText, TWENTY_TWO } from "./AppText";

interface ToolBarProps {
  handleLeftIconPress?: () => void;
  leftIcon?: ImageSourcePropType;
  isLeftIcon?: boolean;
  title?: string,
  textType?: string
  titleStyle?: TextStyle,
  mainContainerStyle: ViewStyle,
  leftIconTintColor?: string,
  textBack?: boolean
}

const ToolBar: React.FC<ToolBarProps> = ({
  handleLeftIconPress,
  leftIcon,
  isLeftIcon = false,
  title,
  textType,
  titleStyle,
  mainContainerStyle,
  leftIconTintColor,
  textBack
}) => {
  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      {isLeftIcon && (
        <TouchableOpacity
          style={styles.backArrow}
           hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={handleLeftIconPress ? handleLeftIconPress : () => NavigationService.goBack()}
        >
          <Image source={leftIcon || backIcon} style={styles.icon}
            tintColor={leftIconTintColor} />
        </TouchableOpacity>
      )}
      {title && (
        <AppText
          onPress={textBack ? () => NavigationService.goBack() : () => { }}
          numberOfLines={1}
          type={textType ? textType : TWENTY_TWO} style={[styles.titleStyle, titleStyle]}>
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
    alignItems:'center',
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
  titleStyle: {
     marginLeft: 10 ,
     width:"90%",
  //   textShadowColor: 'rgba(0, 0, 0, 0.75)',
  // textShadowOffset: {width: -1, height: 1},
  // textShadowRadius: 10

    }
});