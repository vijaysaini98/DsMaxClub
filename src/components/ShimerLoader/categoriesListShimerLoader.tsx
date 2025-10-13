import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { ms, vs, s } from "react-native-size-matters";
import { colors } from "@theme/colors";

const { width } = Dimensions.get("window");

const CARD_HEIGHT = vs(220);

const CategoriesListShimmerLoader = () => {
    const shimmerItems = Array.from({ length: 3 });

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            {shimmerItems.map((_, index) => (
                <View key={index} style={styles.card}>
                    {/* Image shimmer */}
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.imageShimmer}
                    />

                    <View style={styles.content}>
                        {/* Title shimmer */}
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            style={styles.titleShimmer}
                        />

                        {/* Address shimmer */}
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            style={styles.subtitleShimmer}
                        />

                        {/* Price shimmer */}
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            style={styles.priceShimmer}
                        />
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default CategoriesListShimmerLoader;

const styles = StyleSheet.create({
    container: {
        marginTop: vs(22),
        // marginHorizontal: s(16),
        gap: ms(26),
        paddingBottom: vs(150),
    },
    card: {
        borderRadius: ms(15),
        backgroundColor: colors.white,
        overflow: "hidden",
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 2,
    },
    imageShimmer: {
        width: "100%",
        height: CARD_HEIGHT * 0.5,
        borderTopLeftRadius: ms(10),
        borderTopRightRadius: ms(10),
    },
    content: {
        padding: s(12),
        gap: vs(8),
    },
    titleShimmer: {
        width: "70%",
        height: vs(16),
        borderRadius: ms(4),
    },
    subtitleShimmer: {
        width: "50%",
        height: vs(14),
        borderRadius: ms(4),
    },
    priceShimmer: {
        width: "30%",
        height: vs(14),
        borderRadius: ms(4),
    },
});
