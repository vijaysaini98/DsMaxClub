import { colors } from '@theme/colors';

import { StyleSheet } from 'react-native';

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
    width: 110,
    height: 110,

    borderRadius: 10,

    backgroundColor: colors.white,
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

    fontSize: 16,

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

  qtyContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 15,
  },

  qtyBtn: {
    width: 30,
    height: 30,

    borderWidth: 1,
    borderColor: colors.borderColor,

    justifyContent: 'center',

    alignItems: 'center',

    borderRadius: 6,
  },

  qtyText: {
    marginHorizontal: 15,

    fontSize: 16,

    color: colors.black,
  },

  price: {
    fontSize: 17,

    fontWeight: '700',

    color: colors.black,

    marginTop: 15,
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
});

export default styles;
