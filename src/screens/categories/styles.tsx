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
  row:(isTure:boolean)=>( {
    marginBottom: 20,
    justifyContent:isTure ? 'flex-start':'center'
  }),
  cateCardStyle: (borderColor: boolean) => ({
    height: 130,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent:"center",
    marginBottom: 16,
    paddingHorizontal: 2,
    width: 105,
    marginRight: 15,
    paddingVertical: 2,
    gap:5
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