import { colors } from "@theme/colors";
import { width } from "@utils/index";
import { StyleSheet } from "react-native";
import { s, vs,ms } from "react-native-size-matters/extend";

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: s(16),
    marginTop: vs(12),
    marginBottom: vs(8),
  },

  searchInput: {
    height: vs(44),
    borderWidth: 1,
    borderColor: colors.disTextColor,
    borderRadius: s(10),
    paddingHorizontal: s(14),
    fontSize: 14,
    color: colors.black,
    backgroundColor: colors.white,
  },
});

export default styles;