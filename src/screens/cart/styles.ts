import { colors } from '@theme/colors';

import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

const styles = StyleSheet.create({
  
  itemCard: {
    marginHorizontal: 12,
    marginTop: 12,

    backgroundColor: colors.white,

    borderRadius: 12,

    borderWidth: 1,
    borderColor: colors.borderColor,

    padding: 10,

    elevation: 2,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 130,
    height: 110,
    borderRadius: 8,
  },

  rightContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'flex-start',
  },

  name: {
    flex: 1,

    // fontSize: 16,

    color: colors.black,

    marginRight: 10,
  },

  deleteContainer: {
    padding: 4,
  },

  deleteIcon: {
    width: 18,
    height: 18,
  },
  emptyContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  bottomBar: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,

    height: 80,

    backgroundColor: colors.white,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: 16,

    borderTopWidth: 1,

    borderColor: colors.borderColor,

    elevation: 10,
  },

  totalText: {
    fontSize: 20,

    fontWeight: '700',

    color: colors.black,
  },

  subText: {
    fontSize: 12,

    color: 'gray',

    marginTop: 2,
  },

  placeOrderBtn: {
    backgroundColor: colors.buttonBg,

    paddingHorizontal: 28,

    paddingVertical: 12,

    borderRadius: 8,

    justifyContent: 'center',

    alignItems: 'center',
  },
  checkoutBtn: {
    backgroundColor: colors.buttonBg,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  price: {
    color: colors.buttonBg,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    height: 36,
    // backgroundColor:'red'
    alignSelf: 'flex-start',
  },

  qtyBtn: {
    width: 28,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyTextContainer: {
    width: 38,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E5E5E5',
  },

  qtyText: {
    color: '#0D2436',
  },

summaryContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: colors.white,
  padding: 16,
  borderTopWidth: 1,
  borderTopColor: '#EAEAEA',
  height:220
},

summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 4,
},
divider: {
  height: 1,
  backgroundColor: '#E5E5E5',
  marginVertical: 12,
},

checkoutBtnFull: {
  marginTop: 30,
  height: 50,
  borderRadius: 28,
  backgroundColor: colors.buttonBg,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal:16
},
acceptTermsConditionContainer: {
  marginTop: 10,
  marginBottom: 20,
},
acceptTermsConditionBtn: {
  flexDirection: 'row',
  alignItems: 'center',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},

paymentModal: {
  width: '85%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  alignItems: 'center',
  elevation: 10,
},

cancelBtn: {
  flex: 1,
  borderWidth: 1,
  borderColor: colors.buttonBg,
  borderRadius: 12,
  paddingVertical: 12,
  alignItems: 'center',
  marginRight: 8,
},

proceedBtn: {
  // flex: 1,
  backgroundColor: colors.buttonBg,
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal:25,
  alignItems: 'center',
  marginLeft: 8,
},
});

export default styles;
