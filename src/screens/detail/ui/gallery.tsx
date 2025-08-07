import { FlatList, StyleSheet, View, Dimensions, RefreshControl, Modal, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import FastImage from 'react-native-fast-image';
import { IMGE_URL } from '@services/config';
import { Loader } from '@components/Spinner';
import { commonStyles } from '@theme/commonStyles';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { getBookletDetail } from '@actions/home/homeAction';
import TouchableOpacityView from '@components/TouchableOpacityView';
import ImageViewModal from './imageViewModal';
import { width } from '@utils/index';
import ListEmptyComponent from '@components/ListEmptyComponent';

const ITEM_WIDTH = (width - 48) / 2; // 16px padding each side + 16px between

const Gallery = ({ id }) => {
    const dispatch = useAppDispatch();
    const { bookletDetailGallery, isLoading } = useAppSelector((state) => state?.home);
    const [refreshing, setRefreshing] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // You may want to pass params to getBookletGallery if needed
        let data = {
            booklet_id: id,
            tabname: "Gallery"
        }

        dispatch(getBookletDetail(data)).finally(() => setRefreshing(false));
    }, [dispatch]);

    const renderItem = ({ item, index }: { item: string, index: number }) => (
        <TouchableOpacityView onPress={() => {
            setActiveIndex(index);
            setModalVisible(true);
        }}>
            <View style={styles.imageWrapper}>
                <FastImage
                    source={{
                        uri: IMGE_URL + item,
                        priority: FastImage.priority.high
                    }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.stretch}
                />
            </View>
        </TouchableOpacityView>
    );
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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#007AFF']}
                            tintColor={'#007AFF'}
                        />
                    }
                    ListEmptyComponent={() => (
                        <ListEmptyComponent title={"No Images Available"} />
                        // <View style={styles.emptyContainer}>
                        //     <AppText>{"No Images Available"}</AppText>
                        // </View>
                    )}
                />
            )}
            {bookletDetailGallery?.gallery?.length > 0 && (
                <ImageViewModal
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    setActiveIndex={setActiveIndex}
                    activeIndex={activeIndex}
                    data={bookletDetailGallery?.gallery}
                />)}
        </View>
    );
};

export default Gallery;

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: vs(50),
        paddingTop: vs(25),
    },
    row: {
        justifyContent: "flex-start",
        gap: ms(10),
        marginBottom: vs(10),
    },
    imageWrapper: {
        width: s(ITEM_WIDTH),
        height: s(125),
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingVertical: vs(40),
    },
});