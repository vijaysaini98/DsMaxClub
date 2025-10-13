import React from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { ms, s, vs } from "react-native-size-matters/extend";
import { colors } from "@theme/colors";

const { width } = Dimensions.get("window");

const UserListShimmer = () => {
  const shimmerItems = Array.from({ length: 3 }); // show 6 placeholders

  return (
    <View
    style={styles.container}
    >
      {shimmerItems.map((_, index) => (
        <View key={index} style={styles.card}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.nameBox}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.dateBox}
            />
          </View>

          {/* Phone Row */}
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.textBox}
          />

          {/* Email Row */}
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.textBox}
          />
        </View>
      ))}
    </View>
  );
};

export const UserCardShimer = ({cardContainerStyle}) =>{
  return(
    <View style={[styles.card,cardContainerStyle]}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.nameBox}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.dateBox}
            />
          </View>

          {/* Phone Row */}
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.textBox}
          />

          {/* Email Row */}
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.textBox}
          />
        </View>
  )
}

export default UserListShimmer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: vs(20),
    gap: s(10),
  },
  card: {
    marginHorizontal: s(16),
    paddingVertical: s(16),
    paddingHorizontal: s(16),
    borderColor: colors.second,
    borderRadius: ms(10),
    borderWidth: 3,
    borderStyle: "dotted",
    backgroundColor: colors.white,
    gap: vs(12),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameBox: {
    width: width * 0.5,
    height: vs(18),
    borderRadius: ms(6),
  },
  dateBox: {
    width: width * 0.3,
    height: vs(14),
    borderRadius: ms(6),
  },
  textBox: {
    width: "60%",
    height: vs(14),
    borderRadius: ms(6),
  },
});
