import React, { useCallback, useEffect, useMemo } from 'react';
import { BackHandler, Image, StyleSheet, View } from 'react-native';
import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { colors } from '@theme/colors';
import {
    AppText,
    BOLD,
    FOURTEEN,
    SEMI_BOLD,
    SIXTEEN,
} from '@components/AppText';
import { s, vs } from 'react-native-size-matters';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { extractLatLngFromUrl, openMap } from '@utils/index';
import Toast from 'react-native-simple-toast';
import { directionIcon, locationIcon } from '@helper/imagesAssets';
import FastImage from 'react-native-fast-image';

const MultiLocationSheet = ({ sheetRef, onChange, title, data }) => {
    const snapPoints = useMemo(() => ['40%', '70%'], []);

    // Handle Android back button
    const handleBackButtonClick = useCallback(() => {
        if (sheetRef?.current) {
            sheetRef.current.dismiss();
            return true;
        }
        return false;
    }, [sheetRef]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButtonClick,
        );
        return () => backHandler.remove();
    }, [handleBackButtonClick]);

    // Backdrop renderer
    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        [],
    );

    const onDismiss = useCallback(() => {
        if (onChange) {
            onChange(false);
        }
    }, [onChange]);

    const handleRedirection = useCallback((location_url) => {
        const coords = extractLatLngFromUrl(location_url);
        if (coords) {
            openMap({
                lat: coords.lat,
                lng: coords.lng,
                label: title || 'Location',
            });
        } else {
            Toast.show("Can't find this location", Toast.LONG);
        }
    }, [title]);

    const renderHeader = () => (
        <View style={styles.header}>
            <AppText type={SIXTEEN} weight={SEMI_BOLD}>
                {title}
            </AppText>
        </View>
    )

    const renderLocationItem = useCallback(
        ({ item }) => (
            <View
                style={styles.itemContainer}
            >
                <Image
                    source={locationIcon}
                    style={styles.locationIcon}
                    tintColor={colors.borderColor}
                    resizeMode="contain"
                />
                <AppText
                    type={FOURTEEN}
                    weight={BOLD}
                    style={styles.locationText}
                >
                    {item.location}
                </AppText>
                <TouchableOpacityView
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    onPress={() => handleRedirection(item?.location_url)}
                    style={styles.directionBtn}
                >
                    <FastImage
                        source={directionIcon}
                        style={styles.directionIcon}
                        //   tintColor={colors.borderColor}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacityView>
            </View>
        ),
        [handleRedirection]
    );

    return (
        <BottomSheetModal
            ref={sheetRef}
            index={0}
            backgroundStyle={styles.backgroundStyle}
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            onDismiss={onDismiss}
            handleIndicatorStyle={styles.handleIndicator}
        >
            <View style={styles.sheetContent}>
                <BottomSheetFlatList
                    data={data}
                    renderItem={renderLocationItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, id) => id.toString()}
                    ListHeaderComponent={renderHeader}
                    stickyHeaderIndices={[0]}
                    contentContainerStyle={styles.listContentContainer}
                />
            </View>
        </BottomSheetModal>
    );
};

export default MultiLocationSheet;

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: colors.white,
    },
    handleIndicator: {
        backgroundColor: colors.buttonBg,
    },
    sheetContent: {
        flex: 1,
        marginTop: vs(10),
    },
    header: {
        alignItems: 'center',
        marginBottom: vs(10),
        backgroundColor: colors.white,
        paddingVertical: vs(8),
    },
    itemContainer: {
        marginVertical: vs(5),
        padding: vs(10),
        marginHorizontal: s(10),
        borderRadius: s(6),
        backgroundColor: colors.sixth,
        flexDirection: 'row',
    },
    locationIcon: {
        height: vs(15),
        width: s(15),
        marginRight: s(8),
    },
    locationText: {
        width: "85%"
    },
    listContentContainer: {
        paddingBottom: vs(20),
    },
    directionBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    directionIcon: {
        height: vs(20),
        width: s(20)
    }
});