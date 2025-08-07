import { rightArrowIcon } from "@helper/imagesAssets";
import { colors } from "@theme/colors";
import { Platform, StyleSheet } from "react-native";
import { s } from "react-native-size-matters/extend";

const styles = StyleSheet.create({
  containerStyle: {
    // marginTop:vs(20),
    paddingBottom: 50
  },
  searchContainer: {
    marginBottom: 10
  },
  trendingContainer: {
    gap: 12,
    marginBottom: 10,
    overflow: 'hidden',
    paddingVertical: 5
  },
  titleStyle: {
    width: "80%",
    marginLeft: 16
  },
  listStyle: {
    gap: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    paddingVertical: 5
  },
  categoryBookletContainer: {
    borderRadius: 10,
    width: s(300),
    backgroundColor: colors.white,
    // iOS shadow
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    // Android shadow
    elevation: 3,
    // marginBottom: 15,
    // overflow:'hidden',
  },
  singleItemCentered: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  seeAllContainer2: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    //  backgroundColor: colors.tabBg,
    paddingVertical: 10

  },
  seeAllBtn2Style: {
    borderRadius: 25,
    backgroundColor: colors.white,
    padding: 10,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    // Android shadow
    elevation: 3,

  },
  rightArrowIconStyle: { height: 30, width: 30, tintColor: colors.buttonBg }

});

export default styles;