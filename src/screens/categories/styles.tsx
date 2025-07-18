import { colors } from "@theme/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: 16,
  },
  gridContainer: {
    marginTop: 30,
    paddingBottom: 20,
    alignItems: 'flex-start',

  },
  row: {
    marginBottom: 20,
    // width: "100%"
    justifyContent:'flex-start'
  },
  cateCardStyle: (borderColor: boolean) => ({
    maxheight: 130,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 2,
    width: 110,
    marginRight: 15,
    paddingVertical: 2
  }),
  cateLogoImage: {
    width: 75,
    height: 75,
    marginVertical: 8,
  },
  cateText: {
    textAlign: 'center',
  },
});

export default styles