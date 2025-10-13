import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { vs, ms, s } from "react-native-size-matters";
import { colors } from "@theme/colors";

const About_TermsConditionShimmer = () => {
  // render multiple paragraph lines
  const lines = Array.from({ length: 8 });

  return (
    <View style={styles.container}>
      {/* Title shimmer */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.title}
      />

      {/* Paragraph shimmer lines */}
      <View style={{ marginTop: vs(15), gap: vs(10) }}>
        {lines.map((_, index) => (
          <ShimmerPlaceholder
            key={index}
            LinearGradient={LinearGradient}
            style={[
              styles.line,
              index % 3 === 0 && { width: "70%" }, // random shorter lines for realism
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default About_TermsConditionShimmer;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: s(16),
    marginTop: vs(10),
  },
  title: {
    width: "60%",
    height: vs(20),
    borderRadius: ms(4),
  },
  line: {
    width: "100%",
    height: vs(14),
    borderRadius: ms(4),
  },
});
