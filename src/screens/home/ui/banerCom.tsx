import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { colors } from '@theme/colors'
import { width } from '@utils/index'

const BanerComponent = ({data}:{data:any}) => {
  return (
   <View style={styles.container}>
      <Swiper
        autoplay
        loop
        dotColor={colors.inActiveDot}
        activeDotColor={colors.placeholder}
        paginationStyle={{ bottom:-10  }}
      >
        {data.map((item, index) => (
          <View key={item?.id} style={styles.slider}>
            <Image source={item?.image} style={styles.imageStyle} resizeMode='contain' />
          </View>
        ))}
      </Swiper>
    </View>
  )
}

export default BanerComponent

const styles = StyleSheet.create({
    container:{
        height: 238,
        marginHorizontal: 16,
        // marginTop: 16,
        borderRadius: 26,
        shadowColor: '#000',    
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        // backgroundColor:'red'
        // elevation: 0.2,
      },
      slider:{
    flex: 1,
    borderRadius: 16,
    // overflow: 'hidden',
  },
imageStyle:{
    width: width - 32,
    height: 238,
    borderRadius: 16,
  }

})