import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { ms, s, vs } from "react-native-size-matters";
import { height, width } from "@utils/index";

const HomeShimmerLoader = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.headerContainer}>
                <View style={styles.headerGap}>
                    <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.headerLine} />
                    <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.headerLine} />
                </View>
                <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.headerBox} />
            </View>
            {/* Banner shimmer */}
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.banner} />

            {/* Categories shimmer */}
            <View style={styles.categoryRow}>
                {[1, 2, 3, 4].map((_, i) => (
                    <ShimmerPlaceholder
                        key={i}
                        LinearGradient={LinearGradient}
                        style={styles.categoryItem}
                    />
                ))}
            </View>

            {/* Combo deals shimmer */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.comboRow}
            >
                {[1, 2].map((_, i) => (
                    <ShimmerPlaceholder
                        key={i}
                        LinearGradient={LinearGradient}
                        style={styles.comboCard}
                    />
                ))}
            </ScrollView>

            {/* Booklet shimmer */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bookletContentContainer}
                style={styles.comboRow}
            >
                {[1, 2].map((_, i) => (
                    <ShimmerPlaceholder
                        key={i}
                        LinearGradient={LinearGradient}
                        style={styles.comboCard}
                    />
                ))}
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: s(16),
        paddingBottom: vs(100),
    },
    contentContainer: {
        paddingBottom: vs(100),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: vs(10),
    },
    headerGap: {
        gap: vs(6),
    },
    headerLine: {
        height: vs(20),
        width: s(100),
        borderRadius: 12,
        marginBottom: 0,
    },
    headerBox: {
        height: vs(50),
        width: s(100),
        borderRadius: 12,
    },
    banner: {
        height: vs(180),
        borderRadius: ms(12),
        marginBottom: vs(20),
        width: "auto",
    },
    categoryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    categoryItem: {
        width: s(70),
        height: s(70),
        borderRadius: ms(35),
    },
    comboRow: {
        marginBottom: vs(20),
    },
    comboCard: {
        width: s(280),
        height: vs(180),
        borderRadius: ms(12),
        marginRight: s(12),
    },
    bookletContentContainer: {
        paddingRight: s(16),
    },
});

export default HomeShimmerLoader