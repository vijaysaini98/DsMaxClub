import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

export const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const initialLayout = { width: Screen.width };

export const universalPaddingHorizontal = 10;
export const universalPaddingHorizontalHigh = 20;
export const universalPaddingHorizontalMedium = 15;
export const universalPaddingVertical = 10;
export const universalPaddingTop = 40;

export const buttonHeight = 55;
export const smallButtonHeight = 35;
export const midButtonHeight = 60;
export const averageButtonHeight = 50; // Fixed typo
export const inputHeight = 55;
export const borderWidth = 2;

export const commonStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageBackgroundSize: { // Renamed for camelCase
    height: '100%',
    width: '100%',
    backgroundColor: colors.white,
  },
    screenSize: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  tabIcon: {
    width: 22,
    height: 22,
  },
  centerText: {
    textAlign: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  zeroPadding: {
    paddingHorizontal: 0,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  backGround: {
    backgroundColor: colors.mainBg,
  },
  transparent: {
    backgroundColor: colors.transparent,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    paddingHorizontal: universalPaddingHorizontal,
  },
  tabFocused: {
    backgroundColor: colors.tabBag,
    borderRadius: 30,
    width: 150,
    height: smallButtonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});