import { colors } from "@theme/colors";
import { width } from "@utils/index";
import { StyleSheet } from "react-native";
import { s, vs,ms } from "react-native-size-matters/extend";

const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: vs(70),
  },
  seachContainer: {
    paddingHorizontal: s(16),
    marginTop: vs(8)
  },
  trendingContainer: {
    gap: s(12),
    marginBottom: vs(10),
    overflow: 'hidden',
    paddingVertical: 5
  },
  titleStyle: {
    width: "80%",
    marginLeft: s(16)
  },
  listStyle: {
    gap: s(10),
    paddingHorizontal: s(16),
    backgroundColor: colors.white,
    paddingVertical: vs(5)
  },
  categoryBookletContainer: {
    borderRadius: ms(10),
    width: s(280),
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
  categoryBookletContainer2: {
    borderRadius: ms(15),
    //  backgroundColor: colors.white,
    // iOS shadow
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    // Android shadow
    elevation: 2,
    // width: s(width),
    width:'100%',
    alignItems: 'center',
    alignSelf: 'center',
    // paddingHorizontal: s(10)
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

    padding: 10
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
  rightArrowIconStyle: { height: 30, width: 30, tintColor: colors.buttonBg },
  cardImageStyle: {
    width: "100%",
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10)
  },
  cardContainerStyle: { width: "100%" }

});

export default styles;