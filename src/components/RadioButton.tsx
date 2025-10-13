import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import TouchableOpacityView from "./TouchableOpacityView";
import { AppText, LIGHT, SIXTEEN } from "./AppText";
import { colors } from "@theme/colors";
import { ms, s } from "react-native-size-matters/extend";
import { width } from "@utils/index";

interface RadioButtonProps {
  onPress: () => void;
  value: boolean;
  disabled?: boolean;
  message?: string;
  radioContainerStyle?: StyleProp<ViewStyle>;
  radioStyle?: StyleProp<ViewStyle>;
  appTextType?: string;
  color?: string;
  appTextWeight?: string;
  messageStyle?:TextStyle;
  key?:number | string 
}

const RadioButton = ({
  onPress,
  value,
  disabled,
  message,
  radioContainerStyle,
  appTextType,
  radioStyle,
  color,
  appTextWeight,
  messageStyle,
  key
}: RadioButtonProps) => {
  return (
    <TouchableOpacityView
    key={key}
      style={[styles.radioContainer, radioContainerStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.radioStyle, radioStyle]}>
        {value ? (
          <View style={styles.selectedUIFilter(color)}>
            <View style={styles.selectedUIFilterInner(color)} />
          </View>
        ) : (
          <View style={styles.unchecked(color)} />
        )}
      </View>
      {message && (
        <AppText
          style={[styles.message,messageStyle]}
          type={appTextType ? appTextType : SIXTEEN}
          weight={appTextWeight ? appTextWeight : LIGHT}
          numberOfLines={2}
        >
          {message}
        </AppText>
      )}
    </TouchableOpacityView>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: s(5),
  },
  radioStyle: {
    width: s(20),
    height: s(20),
  },
  selectedUIFilter: (color:boolean) => ({
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ms(20),
    borderWidth: 1,
    borderColor: color ? color : colors.buttonBg,
    // flex: 1,
     height: s(20),
     width: s(20),
  }),
  selectedUIFilterInner: (color:boolean) => ({
    height: s(14),
    width: s(14),
    borderRadius: ms(10),
    backgroundColor: color ? color : colors.buttonBg,
  }),
  unchecked: (color:boolean) => ({
    borderRadius: ms(20),
    flex: 1,
    borderWidth: 1,
    borderColor: color ? color : colors.buttonBg,
  }),
  message: {
    // left: 10,
  },
});

export default RadioButton ;