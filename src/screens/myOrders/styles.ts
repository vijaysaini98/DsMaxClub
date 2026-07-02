import { rightArrowIcon } from "@helper/imagesAssets";
import { colors } from "@theme/colors";
import { Platform, StyleSheet } from "react-native";
import { s, vs, ms } from "react-native-size-matters/extend";

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: s(16)
  },
  containerStyle: {
    flex: 1,
    paddingTop: vs(25)
  },
  tabContainerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.disTextColor,
    height: vs(40),
  },
  tabStyle: {
    height: vs(40),
    width: s(90),
  },
  tabIndocatorStyle: {
    backgroundColor: colors.buttonBg,
    height: 2,
    width: s(100),
    borderRadius: ms(20),
  },
  tabTitleStyle: (focused?: boolean) => ({
    color: focused ? colors.buttonBg : colors.disTextColor,
    textTransform: 'capitalize',
    paddingVertical: 0,
  })

})
export default styles;