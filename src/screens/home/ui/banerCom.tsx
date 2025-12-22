import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import { colors } from '@theme/colors';
import { width } from '@utils/index';
import { IMGE_URL } from '@services/config';
import { defaultBanner } from '@helper/imagesAssets';
import { ms, s, vs } from 'react-native-size-matters/extend';

interface Props {
  data: any;
  onPressBanner?: (item: any, index: number) => void; // optional click handler
}

const BanerComponent: React.FC<Props> = ({ data, onPressBanner }) => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        loop
        loadMinimal
        autoplayTimeout={5}
        dotColor={colors.inActiveDot}
        activeDotColor={colors.placeholder}
        paginationStyle={{ bottom: vs(-24) }}
      >
        {data?.length > 0 ? (
          data.map((item, index) => (
            <TouchableOpacity
              key={item.id || index}
              activeOpacity={0.8}
              style={styles.slider}
              onPress={() => onPressBanner?.(item, index)}
            >
              <View style={styles.imageWrapper}>
                <FastImage
                  source={{
                    uri: IMGE_URL + item.banner,
                    priority: FastImage.priority.normal,
                  }}
                  style={styles.imageStyle}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.imageWrapper}>
            <FastImage
              source={defaultBanner}
              style={styles.imageStyle}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        )}
      </Swiper>
    </View>
  );
};

export default React.memo(BanerComponent);

const styles = StyleSheet.create({
  container: {
    height: vs(230),
    marginHorizontal: 16,
    borderRadius: ms(26),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: vs(30),
  },
  slider: {
    flex: 1,
    borderRadius: ms(26),
    overflow: 'hidden',
  },
  imageWrapper: {
    borderRadius: ms(26),
    overflow: 'hidden',
  },
  imageStyle: {
    width: s(width - 32), // keeping margin in mind
    height: vs(230),
    borderRadius: ms(26),
  },
});

