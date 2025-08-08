import { colors } from "@theme/colors";
import { StyleSheet } from "react-native";
import { ms, s, vs } from "react-native-size-matters/extend";

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: s(16),
    alignItems: 'center'
  },
  gridContainer: {
    marginTop: vs(30),
    paddingBottom: vs(20),
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  row: (isTure: boolean) => ({
    // marginBottom: 20,
    justifyContent: isTure ? 'flex-start' : 'center'
  }),
  cateCardStyle: (borderColor: boolean) => ({
    minHeight: 130,
    borderWidth: s(0.5),
    borderColor: borderColor,
    borderRadius: ms(12),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: vs(16),
    paddingHorizontal: s(2),
    width: s(100),
    marginRight: s(15),
    paddingVertical: 2,
    gap: 5

  }),
  cateLogoImage: {
    width: ms(75),
    height: ms(75),
    marginVertical: vs(8),
  },
  cateText: {
    textAlign: 'center',
  },
});

export default styles