import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { ms, s, vs } from "react-native-size-matters/extend";
import { colors } from "@theme/colors";

const { width } = Dimensions.get("window");

const CouponsShimerLoader = () => {
  // show 6 placeholder cards
  const shimmerItems = Array.from({ length: 3 });
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.container}>
      {shimmerItems.map((_, index) => (
        <View key={index} style={styles.card}>
          {/* Title shimmer */}
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.titleShimmer}
          />

          {/* Description shimmer (2 lines) */}
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.descShimmer}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={[styles.descShimmer, { width: "60%" }]}
          />

          {/* Vendor name shimmer */}
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.vendorShimmer}
          />

          {/* Button shimmer */}
          <View style={styles.btnRow}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.btnShimmer}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CouponsShimerLoader;

const styles = StyleSheet.create({
  container: {
    marginTop: vs(15),
    gap: s(15),
    paddingBottom: vs(100),
    paddingHorizontal: s(16),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: ms(12),
    padding: s(12),
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  titleShimmer: {
    width: "70%",
    height: vs(18),
    borderRadius: ms(4),
    marginBottom: vs(10),
  },
  descShimmer: {
    width: "90%",
    height: vs(14),
    borderRadius: ms(4),
    marginBottom: vs(6),
  },
  vendorShimmer: {
    width: "40%",
    height: vs(14),
    borderRadius: ms(4),
    marginTop: vs(6),
    marginBottom: vs(10),
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  btnShimmer: {
    width: "30%",
    height: vs(32),
    borderRadius: ms(100),
  },
});
