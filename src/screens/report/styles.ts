import { colors } from "@theme/colors";
import { width } from "@utils/index";
import { StyleSheet } from "react-native";
import { s, vs,ms } from "react-native-size-matters/extend";

const styles = StyleSheet.create({
  containerStyle: {
        paddingHorizontal: vs(20),
        flex: 1
    },
      searchContainer: {
    marginBottom: 10,
  },
});

export default styles;