import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { ms, s, vs } from "react-native-size-matters";
import { colors } from "@theme/colors";

const { width } = Dimensions.get("window");
const CARD_SIZE = (width - s(36)) / 4; // padding: 16 left + 16 right

const CategoriesShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {[...Array(9)].map((_, i) => (
          <View key={i} style={styles.cardWrapper}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.circle}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.textLine}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: s(16) 
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // distribute evenly
  },
  cardWrapper: {
    width: CARD_SIZE,
    minHeight: vs(120),
    borderWidth: s(0.5),
    borderRadius: ms(12),
    borderColor:colors.borderColor,
    alignItems: "center",
    marginBottom: vs(16),
    paddingVertical: vs(8),
    // backgroundColor: "red", // just to see layout
  },
  circle: {
    width: CARD_SIZE * 0.6,
    height: CARD_SIZE * 0.6,
    borderRadius: (CARD_SIZE * 0.6) / 4,
    marginBottom: vs(8),
  },
  textLine: {
    width: "70%",
    height: vs(12),
    borderRadius: s(6),
  },
});

export default CategoriesShimmer;

