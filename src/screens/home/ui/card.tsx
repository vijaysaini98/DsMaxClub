import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { AppText, BOLD, BUTTON_BG, EIGHTEEN, FOURTEEN, MEDIUM, PLACEHOLDER, SEMI_BOLD, TWELVE, TWENTY_TWO, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';
import { nearByIcon, starIcon } from '@helper/imagesAssets';
import { trendingData } from '@helper/dumyData';

const Card = ({ data, title }) => {
    return (

        <View style={{ marginLeft: 16, gap: 12 }}>
            <AppText type={TWENTY_TWO} weight={SEMI_BOLD}
                style={styles.titleStyle}
            >{title}</AppText>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
            >
                {data.map((item, index) => (
                    <View key={index} style={styles.shadowWrapper}>
                        <View style={{
                            borderRadius: 10, backgroundColor: colors.white,
                            // Drop shadow for iOS
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowOffset: {
                                width: -3,
                                height: -4,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 6,

                            // Drop shadow for Android
                            elevation: 6,
                            // borderWidth: 1,
                            overflow: 'hidden'

                        }}>
                            <Image
                                source={item.image}
                                style={{ height: 210, width: 310, }}
                                resizeMode='cover'
                            />
                            <View style={{
                                backgroundColor: colors.white, paddingHorizontal: 8,
                                paddingVertical: 5, position: "absolute", borderRadius: 12, top: 12, left: 12
                            }}>
                                <AppText type={TWELVE} weight={SEMI_BOLD} >{"Guest Favourite"}</AppText>
                            </View>

                            {/* details container */}
                            <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                                        <View style={{ backgroundColor: colors.placeholder, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 }}>
                                            <AppText type={FOURTEEN} color={WHITE} weight={BOLD}>{"4.3"}</AppText>
                                        </View>

                                        <AppText type={FOURTEEN} weight={BOLD} color={PLACEHOLDER}>Excellent
                                            <AppText type={FOURTEEN} weight={MEDIUM} style={{ color: colors.disTextColor }}> (552 Ratings)</AppText></AppText>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',

                                    }}>
                                        {[...Array(item.stars)].map((_, idx) => (
                                            // <Icon name="star" size={12} color="#FDBA2D" key={idx} />
                                            <Image
                                                source={starIcon}
                                                style={{ width: 9, height: 9 }}
                                                resizeMode="contain"
                                            />
                                        ))}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                    <AppText type={EIGHTEEN} weight={MEDIUM}>{"Mauritius Beach"}</AppText>
                                    <AppText type={FOURTEEN} weight={BOLD} color={BUTTON_BG}>{`Rs. 11,700`}</AppText>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
                                    <Image
                                        source={nearByIcon}
                                        style={{ width: 15, height: 15, tintColor: colors.disTextColor }}
                                        resizeMode='contain'
                                    />
                                    <AppText type={TWELVE} weight={MEDIUM} style={{ color: colors.disTextColor }}>{"Bel Ombre"}</AppText>
                                </View>
                            </View>
                        </View>
                    </View>
                ))
                }

            </ScrollView>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    titleStyle: {
        width: "80%"
    },
    shadowWrapper: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 0,
        marginBottom: 16,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,

        // Android Elevation
        elevation: 8,
    }
})