import { colors } from "@theme/colors";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { ms, s, vs } from "react-native-size-matters/extend";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  coverImageStyle: {
    width: "100%",
    height: vs(300),
  },
  toolBarStyle: {
    marginTop: vs(50),
    marginLeft: s(10),
    backgroundColor: colors.white,
    width: s(40),
    height: vs(40),
    paddingTop: 0,
    borderRadius: ms(30)
  },
  headerContainer: {
    marginTop: vs(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
    alignItems: 'center',
  },
  backBtnStyle: {
    padding: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(25),
    backgroundColor: colors.white
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer2: {
    flexDirection: 'row',
    gap: s(6),
    alignItems: 'center',
  },
  ratingViewBox: {
    backgroundColor: colors.placeholder,
    paddingHorizontal: s(10),
    paddingVertical: vs(4),
    borderRadius: ms(15),
  },
  ratingIconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: s(12),
  },
  iconsStyle: {
    width: s(20),
    height: s(20)
  },
  secondContainer: {
    paddingHorizontal: s(16),
    paddingTop: vs(12),
    flex: 1,
    borderTopLeftRadius: ms(20),
    borderTopRightRadius: ms(20),
    overflow: 'hidden',
    top: vs(-20),
    backgroundColor: colors.white,
  },
  secondHeaderContainer: {
    position: "absolute",
    paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight,
    // top: Platform.OS === "ios" ? 50 : StatusBar.currentHeight, // leave safe area
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: colors.white, // solid background
    zIndex: 10,
    justifyContent: "center",
    paddingHorizontal: 15,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 3,
  },
  secondAnimatedContainer: {
    flexDirection: 'row',
    gap: s(10),
  },
  nameTextStyle: {
    flex: 1,
    marginLeft: s(10)
  },
  locationContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: "space-between"
  },
  locationBtn: {
    flexDirection: 'row',
    gap: s(5),
    width: "85%"
  },
  downArrowBtnIcon: {
    width: '10%', alignItems: "center"
  },
  thridContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  buyBtnStyle: (disable: boolean) => ({
    backgroundColor: disable ? colors.disabledBtn : colors.buttonBg,
    paddingVertical: vs(15),
    width: '100%',
    alignItems: 'center',
    borderRadius: ms(100)
  }),
  titleTextStyle: {
    marginTop: vs(15)
  },
  disTextStyle: {
    marginVertical: vs(10),
    color:colors.buttonBg
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    gap: 10,
    alignItems: 'center',
  },
  titleText: {
    width: '90%',
  },
  shareBtn: {
    marginTop: 5,
  },
  locationRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  locationIcon: {
    height: vs(15), width: s(15), marginTop: 3
  },
  locationText: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.buttonText,
    letterSpacing: 0.8,
  },
  bottomBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    

  },
  backIconStyle: {
    height: vs(20),
    width: s(20),
  },
  shimmerBtnStyle: {
    height: vs(50),
    width: '100%',
    borderRadius: ms(100),
  },
  acceptTermsConditionContainer: {
    width: '100%',
    // height:50,
    marginBottom: vs(10)
  },
  acceptTermsConditionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  acceptView: (acceptContent: boolean) => ({
    height: vs(20),
    width: s(20),
    borderWidth: 0.5,
    borderRadius: ms(5),
    borderColor: colors.borderColor,
    backgroundColor: acceptContent ? colors?.buttonBg : colors.white
  }),
  cartContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
},

qtyContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#D6D6D6',
  borderRadius: 24,
  overflow: 'hidden',
  height: 40,
},

qtyBtn: {
  width: 38,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
},

qtyText: {
  width: 38,
  textAlign: 'center',
  fontWeight: '700',
},

viewCartBtn: {
  flex: 1,
  marginLeft: 16,
  height: 48,
  borderRadius: 24,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.buttonBg, 
},
cartActionContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
},
});

export default styles;
