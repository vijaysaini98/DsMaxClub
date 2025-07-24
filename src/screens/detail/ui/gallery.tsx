import { FlatList, Image, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import { galleryData } from '@helper/dumyData'
import { useAppSelector } from '@redux/hooks';
import FastImage from 'react-native-fast-image';
import { IMGE_URL } from '@services/config';
import { Loader } from '@components/Spinner';
import { commonStyles } from '@theme/commonStyles';

const ITEM_WIDTH = (Dimensions.get('window').width - 48) / 2; // 16px padding each side + 16px between

const Gallery = () => {
    const { bookletDetailGallery, isLoading } = useAppSelector((state) => state?.home)


    const renderItem = ({ item }) => {

        return (
            <View style={styles.imageWrapper}>
                <FastImage
                    source={{ uri: IMGE_URL + item }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
        );
    };

    return (
        <View style={commonStyles.screenSize}>
            {isLoading ? (
                <Loader />
            ) : (
                <FlatList
                    data={bookletDetailGallery?.gallery}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    columnWrapperStyle={styles.row}
                />
            )}

        </View>

    );
};

export default Gallery;

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 50,
        paddingTop: 25,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    imageWrapper: {
        width: ITEM_WIDTH,
        height: 125,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
