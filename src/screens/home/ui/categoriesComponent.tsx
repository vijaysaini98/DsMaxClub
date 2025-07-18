import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { AppText, BUTTON_TEXT, FOURTEEN, MEDIUM, SEMI_BOLD, SIXTEEN, TWENTY_TWO } from '@components/AppText'
import TouchableOpacityView from '@components/TouchableOpacityView'
import { categaoriesIcon, restaurant } from '@helper/imagesAssets'
import { getCategoryDetails, width } from '@utils/index'

const CategoriesComponent = ({data,handleSeeAll}) => {
  return (
    <View style={styles.categoriesMainContainer}>
          <View style={styles.categoriesHeaderContainer}>
            <AppText type={TWENTY_TWO} weight={SEMI_BOLD}
              style={styles.cateTitle}
            >Categories</AppText>
            <TouchableOpacityView 
            onPress={handleSeeAll}
            style={styles.cateSeeAllBtn}>
              <AppText type={SIXTEEN} color={BUTTON_TEXT}>See All</AppText>
            </TouchableOpacityView>
            <View>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}>
            {data?.category?.map((item:any, index:number) => {
              const {icon,borderColor} =getCategoryDetails(item?.name)
              return(
              <TouchableOpacityView key={index} 
              style={styles.cateCardStyle(item?.border_color)}
              // style={styles.cateCardStyle(borderColor)}
              >
                <Image 
                source={item?.icon ? {uri:data?.baseurl + item?.icon} :categaoriesIcon}
                // source={icon}
                 style={styles.cateLogoImage} resizeMode="cover" />
                <AppText 
                numberOfLines={2}
                type={FOURTEEN} weight={MEDIUM} style={styles.cateText}>{item?.name}</AppText>
              </TouchableOpacityView>
            )})}
          </ScrollView>
        </View>
  )
}

export default CategoriesComponent

const styles = StyleSheet.create({
     categoriesMainContainer: {
    paddingVertical: 18
  },
  categoriesHeaderContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  cateTitle: {
    width: "80%"
  },
  cateSeeAllBtn: {
    width: "20%",
    alignItems: 'flex-end'
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 16,
    gap: 16,
    paddingRight:16
  },
  cateCardStyle: (borderColor: boolean) => ({
    height: 120,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 12,
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 16,
    // paddingHorizontal: 10,
    width:110
  }),
  cateLogoImage: {
    width: 60,
    height: 60,
    marginVertical: 10,
    // borderRadius:30
  },
  cateText: {
    textAlign: 'center',
  },
})