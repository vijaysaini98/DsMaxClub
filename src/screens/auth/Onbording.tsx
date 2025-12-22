import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Animated,
    ImageBackground,
    StatusBar,
} from 'react-native';
import { getStartBg1, getStartBg2, getStartBg3, getStartBg4 } from '../../helper/imagesAssets';
import { colors } from '@theme/colors';
import { AppText, BLACK, BOLD, BUTTON_TEXT, EIGHTEEN, NORMAL, SIXTEEN, TWENTY, TWENTY_EIGHT, TWENTY_FOUR, TWENTY_TWO, WHITE } from '@components/AppText';
import NavigationService from '@navigations/NavigationService';
import TouchableOpacityView from '@components/TouchableOpacityView';
import * as routes from '@navigations/routes';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { ms, vs } from 'react-native-size-matters/extend';
import { First_Time, setAccessToken, setItem, USER_VISITED } from '@services/storage';
import {Screen} from '@theme/commonStyles'
import LinearGradient from 'react-native-linear-gradient';

// const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: getStartBg1,
    heading: "Your Journey\n Begins Here",
    heading2: "Discover exclusive travel deals,\ncurated experiences, and smart\nplanning — all in one place.",
    subHeading: "Let DS Max Club simplify every\ntrip you take."
  },
  {
    id: '2',
    image: getStartBg2,
    heading: "Unlock a World \nof Adventures",
    heading2: "From flights to unforgettable \ndestinations, explore the best\nholiday options with ease.\n",
    subHeading: "Your perfect trip is just a tap away."
  },
  {
    id: '3',
    image: getStartBg3,
    heading: "Travel Beyond\nExpectations",
    heading2: "Plan effortlessly and explore\nhandpicked destinations tailored for\nyour comfort.",
    subHeading: "Experience travel the DS Max Club \nway."
  },
  {
    id: '4',
    image: getStartBg4,
    heading: "Enjoy Premium\nMember Benefits",
    heading2: "Access exclusive offers, hotel deals,\nrewards, and personalized travel\nservices.",
    subHeading: "Let’s make every trip unforgettable."
  },
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
            setItem(USER_VISITED, "userVisited");
            NavigationService.replace(routes.NAVIGATION_AUTH_STACK);
        }
    };

    const renderItem = ({ item }) => (
        
        <ImageBackground source={item.image} style={styles.image} resizeMode="contain">
            <View style={styles.textWrapper}>
                <AppText type={TWENTY} weight={BOLD} color={BLACK} style={{textAlign:'center'}}>{item?.heading.toUpperCase()}</AppText>
                <AppText type={SIXTEEN} weight={NORMAL} style={{textAlign:'center',marginTop:vs(36)}}>{item?.heading2}</AppText>
                <AppText type={SIXTEEN} weight={NORMAL} style={styles.description}>
                   {item?.subHeading}
                </AppText>
            </View>
        </ImageBackground>
    );

    return (
        <View style={styles.container}>
    {/* //     <LinearGradient
    //     colors={['#FFFFFF', '#989b9bff']}
    //     style={styles.container}
    // > */}
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"  // use white icons on dark images
            />
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
                            const inputRange = [(i - 1) * Screen.width, i * Screen.width, (i + 1) * Screen.width];
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
                    <TouchableOpacityView containerStyle={styles.skipButtons} onPress={() => {
                        setItem(USER_VISITED, "userVisited");
                        NavigationService.replace(routes.NAVIGATION_AUTH_STACK)}}>
                        <AppText type={EIGHTEEN} color={BUTTON_TEXT} >Skip</AppText>
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
        backgroundColor: colors.white,
        // paddingVertical: 20
    },
    image: {
        width:Screen.width,
        height:"100%",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:colors.white,
    },
    textWrapper: {
        paddingHorizontal: 24,
        alignItems: 'center',
        top:"20%"
    //     position:'absolute',
    //    bottom:"20%"
    },
    description: {
        textAlign: 'center',
        marginTop: 30,
        lineHeight:ms(27)
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
        bottom: 35,
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