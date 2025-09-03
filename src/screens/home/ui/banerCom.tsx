import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { colors } from '@theme/colors'
import { width } from '@utils/index'
import { IMGE_URL } from '@services/config'
import FastImage from 'react-native-fast-image'
import { defaultBanner } from '@helper/imagesAssets'
import { ms, s, vs } from 'react-native-size-matters/extend'

const BanerComponent = ({ data }: { data: any }) => {
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
        {
        data?.length > 0 ?
        data?.map((item: string, index: number) => {
          return (
            <View key={index} style={styles.slider}>
              <View style={styles.imageWrapper}>
                <FastImage
                  source={{
                    uri: IMGE_URL + item,
                    priority: FastImage.priority.normal,
                  }}
                  style={styles.imageStyle}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          );
        })
      :
      (
              <View style={styles.imageWrapper}>
                <FastImage
                  source={defaultBanner}
                  style={styles.imageStyle}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
      )
      }
      </Swiper>
    </View>
  );
};

export default BanerComponent


const styles = StyleSheet.create({
  container: {
    height: vs(230),
    marginHorizontal: 16,
    borderRadius: 26,
    // overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    // marginTop:vs(10),
    marginBottom:vs(30)

  },
  slider: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    borderRadius: 26,
    overflow: 'hidden',
  },
  imageStyle: {
    width: s(width),
    height: vs(250),
    borderRadius: ms(26),
  },
});
