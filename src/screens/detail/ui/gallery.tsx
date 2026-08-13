import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  Animated,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import FastImage from 'react-native-fast-image';
import { IMGE_URL } from '@services/config';
import { Loader } from '@components/Spinner';
import { commonStyles } from '@theme/commonStyles';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { getBookletDetail, getComboBookletDetail } from '@actions/home/homeAction';
import TouchableOpacityView from '@components/TouchableOpacityView';
import ImageViewModal from './imageViewModal';
import { width } from '@utils/index';
import ListEmptyComponent from '@components/ListEmptyComponent';
import GalleryShimmer from '@components/ShimerLoader/GalleryShimerLoader';
import { defaultBookletImage } from '@helper/imagesAssets';

const ITEM_WIDTH = (width - 30) / 2;

const Gallery = ({ id, scrollY, from }: any) => {
  const dispatch = useAppDispatch();
  const { bookletDetailGallery, isLoading } = useAppSelector(
    (state) => state?.home
  );

  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasError, setHasError] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const data = {
      booklet_id: id,
      tabname: "Gallery"
    };
    if (from == "ComboBooklet") {

      dispatch(getComboBookletDetail(data));
    } else {

      dispatch(getBookletDetail(data)).finally(() => setRefreshing(false));
    }
  }, [dispatch, id]);



  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacityView
      onPress={() => {
        setActiveIndex(index);
        setModalVisible(true);
      }}
      style={{ width: s(ITEM_WIDTH - 32) }}
    >
      <View style={styles.imageWrapper}>
        <FastImage
          source={
            hasError
              ? defaultBookletImage
              : {
                uri: IMGE_URL + item,
                priority: FastImage.priority.high,
              }
          }
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
          onError={() => {
            console.log('Image Error');
            setHasError(true);
          }}
        />
      </View>
    </TouchableOpacityView>
  );

  const galleryImages = bookletDetailGallery?.gallery || [];
  const isScrollable = galleryImages.length > 4;

  return (
    <View style={commonStyles.screenSize}>
      {isLoading ? (
        // <Loader />
        <GalleryShimmer />
      ) : (
        <Animated.FlatList
          data={galleryImages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          scrollEnabled={isScrollable}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode={'never'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContainer,
            { paddingBottom: isScrollable ? vs(80) : vs(20) },
          ]}
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
            <ListEmptyComponent title={'No Images Available'} />
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      )}
      {bookletDetailGallery?.gallery?.length > 0 && (
        <ImageViewModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          data={bookletDetailGallery?.gallery}
        />
      )}
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: vs(150),
    paddingTop: vs(25),
  },
  row: {
    justifyContent: 'flex-start',
    gap: ms(10),
    marginBottom: vs(10),
  },
  imageWrapper: {
    // width: s(ITEM_WIDTH),
    height: s(125),
    overflow: 'hidden',
    borderRadius: ms(8),
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
