import { colors } from "@theme/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: 16,
  },
  gridContainer: {
    marginTop:48,
    paddingBottom: 20,
    alignItems: 'flex-start',
    
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cateCardStyle: (borderColor: string) => ({
    // width: '30%', // Ensures 3 per row with spacing
    width: 100,
    marginHorizontal:8,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: borderColor || '#E5E7EB',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.white,
    
  }),
  cateLogoImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cateText: {
    textAlign: 'center',
    fontSize: 14,
  },
});

export default styles