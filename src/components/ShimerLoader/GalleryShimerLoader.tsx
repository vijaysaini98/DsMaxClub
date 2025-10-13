import React from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { ms, s, vs } from "react-native-size-matters/extend";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 40) / 2; // 16px padding both sides + 16px gap

const GalleryShimmer = () => {
    const shimmerItems = Array.from({ length: 6 }); // show 6 placeholders

    return (
        <FlatList
            data={shimmerItems}
            numColumns={2}
            renderItem={({ item, index }) => (
                <ShimmerPlaceholder
                    key={index}
                    LinearGradient={LinearGradient}
                    style={styles.imageBox}
                />
            )}
            columnWrapperStyle={styles.rowContainer}
            contentContainerStyle={styles.container} />

    );
};

export default GalleryShimmer;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: ms(10),
        // paddingHorizontal: s(16),
        alignItems: 'center',
        paddingTop: vs(25),
    },
    rowContainer:{
                justifyContent: 'flex-start',
                gap: ms(10),
                marginBottom: vs(10),
            },
    imageBox: {
        width: s(ITEM_WIDTH),
        height: s(125),
        borderRadius: ms(8),
        marginBottom: vs(10),
    },
});
