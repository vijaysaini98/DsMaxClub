import { colors } from "@theme/colors";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerStyle: { 
    // paddingBottom: 50 
  },
  seachContainer: {
    paddingHorizontal: 16,
    marginTop: 8
  },
  trendingContainer: {
     paddingLeft: 16, gap: 12 ,
// backgroundColor:'green',

marginBottom:10,
     overflow:'hidden',
     paddingVertical:5
    },
  titleStyle: {
    width: "80%"
  },
  listStyle: { 
    gap: 10 ,
    paddingRight:16,
    backgroundColor:colors.white,
    paddingVertical:5
  },
  categoryBookletContainer: {
    borderRadius: 10,
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
}
});

export default styles;