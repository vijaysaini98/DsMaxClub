import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './colors';
import { ms, s, vs } from 'react-native-size-matters/extend';

export const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const initialLayout = { width: Screen.width };

export const universalPaddingHorizontal = s(10);
export const universalPaddingHorizontalHigh = s(20);
export const universalPaddingHorizontalMedium = s(15);
export const universalPaddingVertical = vs(10);
export const universalPaddingTop = vs(40);

export const buttonHeight = vs(55);
export const smallButtonHeight = vs(35);
export const midButtonHeight = vs(60);
export const averageButtonHeight = vs(50); // Fixed typo
export const inputHeight = vs(55);
export const borderWidth = ms(2);

export const commonStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS == 'ios' ? vs(40) : 0,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageBackgroundSize: {
    // Renamed for camelCase
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
    width: s(22),
    height: vs(22),
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
    backgroundColor: colors.tabBg,
    borderRadius: ms(30),
    width: s(150),
    height: smallButtonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginHorizontal: {
    marginHorizontal: s(16),
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  rowAlignCenter:{
          flexDirection: "row",
          alignItems: "center",
        }
});
