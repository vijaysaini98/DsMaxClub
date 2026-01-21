import { colors } from "@theme/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemCard: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    overflow: 'hidden',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },

  totalText: {
    fontSize: 18,
    fontWeight: '700',
  },

  subText: {
    fontSize: 12,
    color: '#666',
  },

  placeOrderBtn: {
    backgroundColor: colors.buttonBg,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
    detailContainer: {
        paddingHorizontal:10,
        paddingBottom:10,
        backgroundColor: colors.white,
    },
    deleteIcon:{
      width:20,
      height:20,
      position:'absolute',
      top:5,
      right:5,
      zIndex:1,
    }
});
export default styles;