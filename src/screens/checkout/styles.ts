import { colors } from '@theme/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    marginTop: 16,
    borderRadius: 18,
    padding: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 14,
  },

  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C7C7C7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterActive: {
    borderColor: colors.buttonBg,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.buttonBg,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ECECEC',
  },

  payLabel: {
    color: '#8A8A8A',
    marginBottom: 4,
  },

  payButton: {
    backgroundColor: colors.buttonBg,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },

  checkoutCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginTop: 12,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  checkoutImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },

  checkoutContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },

  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
  },

  typeBadgeText: {
    fontSize: 11,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  qtyText: {
    fontSize: 13,
  },

  unitPrice: {
    fontSize: 13,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
  },

  totalLabel: {
    color: '#666',
  },
});