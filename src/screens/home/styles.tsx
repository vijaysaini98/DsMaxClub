import { colors } from "@theme/colors";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerStyle: { paddingBottom: 50 },
  seachContainer: {
    paddingHorizontal: 16,
    marginTop: 8
  },
  trendingContainer: { marginLeft: 16, gap: 12 },
  titleStyle: {
    width: "80%"
  },
  listStyle: { 
    gap: 12 ,
    paddingRight:16,
    // justifyContent:'center',
    // alignItems:'center',
    // backgroundColor:'red'
  },
  categoryBookletContainer: {
    borderRadius: 15,
    backgroundColor: colors.white,
    // iOS shadow
    shadowColor: colors.placeholder,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    // Android shadow
    elevation: 3,
    marginBottom: 15,
    overflow:'hidden',
  },
  singleItemCentered: {
  justifyContent: 'center',
  flexGrow: 1,
}
});

export default styles;