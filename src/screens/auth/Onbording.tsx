import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Animated,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { getStartBg1, getStartBg2, getStartBg3, getStartBg4 } from '../../helper/imagesAssets';
import { colors } from '@theme/colors';
import { AppText, BLACK, BOLD, EIGHTEEN, NORMAL, TWENTY_EIGHT, WHITE } from '@components/AppText';
import NavigationSevice from '@navigations/NavigationSevice';
import TouchableOpacityView from '@components/TouchableOpacityView';
import * as routes from '@navigations/routes';

const { width, height } = Dimensions.get('window');

const slides = [
    { id: '1', image: getStartBg1 },
    { id: '2', image: getStartBg2 },
    { id: '3', image: getStartBg3 },
    { id: '4', image: getStartBg4 },
];

const OnboardingScreen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            NavigationSevice.replace(routes.LOGIN_SCREEN);
        }
    };

    const renderItem = ({ item }) => (
        <ImageBackground source={item.image} style={styles.image} resizeMode="cover">
            <View style={styles.textWrapper}>
                <AppText type={TWENTY_EIGHT} weight={BOLD} color={BLACK}>WELCOME!</AppText>
                <AppText type={TWENTY_EIGHT} weight={BOLD} color={BLACK} >TO DS MAX CLUB</AppText>
                <AppText type={EIGHTEEN} weight={NORMAL} style={styles.description}>
                    Lorem Ipsum is simply dummy AppText of the printing and typesetting.
                </AppText>
            </View>
        </ImageBackground>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={flatListRef}
            />
            <View style={styles.bottomContainer}>
                {currentIndex < slides.length - 1 && (
                    <View style={styles.pagination}>
                        {slides.map((_, i) => {
                            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                            const dotWidth = scrollX.interpolate({
                                inputRange,
                                outputRange: [30, 30, 30],
                                extrapolate: 'clamp',
                            });
                            const backgroundColor = scrollX.interpolate({
                                inputRange,
                                outputRange: ['#C9AFAE', '#6D2B1F', '#C9AFAE'],
                                extrapolate: 'clamp',
                            });
                            return (
                                <Animated.View
                                    key={i.toString()}
                                    style={[styles.dot, { width: dotWidth, backgroundColor }]} />
                            );
                        })}
                    </View>)}

                {currentIndex < slides.length - 1 ? (
                    <TouchableOpacityView containerStyle={styles.skipButtons} onPress={() => NavigationSevice.replace(routes.LOGIN_SCREEN)}>
                        <AppText type={EIGHTEEN}  >Skip</AppText>
                    </TouchableOpacityView>
                ) : null}

                {currentIndex === slides.length - 1 ? (
                    <TouchableOpacityView containerStyle={styles.getStartedButton} onPress={handleNext}>
                        <AppText type={EIGHTEEN} weight={BOLD} color={WHITE}>GET STARTED</AppText>
                    </TouchableOpacityView>
                ) : null}
            </View>
        </View>
    );
};

export { OnboardingScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width,
        height,
        justifyContent: 'flex-end',
        paddingBottom: 200,
        alignItems: 'center',
    },
    textWrapper: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    description: {
        textAlign: 'center',
        marginTop: 30
    },
    pagination: {
        flexDirection: 'row',
        height: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
        width: 30,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        width: 30
    },
    skipButtons: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'flex-end',
    },
    getStartedButton: {
        backgroundColor: colors.buttonBg,
        height: 60,
        justifyContent: 'center',
        borderRadius: 50,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
    },
    // getStartedText: {
    //     color: '#FFF',
    //     fontSize: 14,
    //     fontWeight: '600',
    // },
    bottomContainer: {
        paddingHorizontal: 20,
        alignItems: 'center'
    }
});