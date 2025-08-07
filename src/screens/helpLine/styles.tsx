import { colors } from "@theme/colors";
import { StyleSheet } from "react-native";
import { ms, s, vs } from "react-native-size-matters/extend";

const styles = StyleSheet.create({
  scrollContent: {
    marginHorizontal: 16,
    marginTop: vs(48),
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactTab: {
    height: s(170),
    width: s(170),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: ms(10),
    borderColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    width: s(50),
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(12),
    backgroundColor: colors.placeholder2,
  },
  iconImage: {
    width: s(24),
    height: vs(24),
  },
  tabTitle: {
    marginTop: vs(10),
  },
  tabText: {
    marginTop: vs(10),
    textAlign: 'center',
  },
  addressTab: {
    marginTop: vs(16),
    width: '100%',
    height: vs(171),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: ms(10),
    borderColor: colors.borderColor,
  },
  mapContainer: {
    width: '100%',
    height: vs(259),
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default styles;