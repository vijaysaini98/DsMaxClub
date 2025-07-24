import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { colors } from '@theme/colors'
import { width } from '@utils/index'
import { IMGE_URL } from '@services/config'
import FastImage from 'react-native-fast-image'

const BanerComponent = ({ data }: { data: any }) => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        loop
        dotColor={colors.inActiveDot}
        activeDotColor={colors.placeholder}
        paginationStyle={{ bottom: -24 }}
      >
        {data?.map((item: string, index: number) => {
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
        })}
      </Swiper>
    </View>
  );
};

export default BanerComponent


const styles = StyleSheet.create({
  container: {
    height: 230,
    marginHorizontal: 16,
    borderRadius: 26,
    // overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginTop:20,
    marginBottom:30

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
    width: width - 32,
    height: 230,
    borderRadius: 26,
  },
});
