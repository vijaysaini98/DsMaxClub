import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppText, BUTTON_TEXT, FOURTEEN, MEDIUM, SEMI_BOLD, SIXTEEN, TWENTY_TWO } from '@components/AppText'
import TouchableOpacityView from '@components/TouchableOpacityView'
import { categaoriesIcon } from '@helper/imagesAssets'
import { getCategoryDetails, height, width } from '@utils/index'
import NavigationService from '@navigations/NavigationService'
import { CATEGORIES_LIST_SCCREEN } from '@navigations/routes'
import { SvgXml } from 'react-native-svg'

export const SvgImageFromUri = ({ uri ,height,width}: { uri: string,height?:string,width?:string }) => {
  const [svgXml, setSvgXml] = useState<string | null>(null)

  useEffect(() => {
    fetch(uri)
      .then((response) => response.text())
      .then((text) => setSvgXml(text))
      .catch((error) => {
        console.error('Failed to load SVG:', error)
      })
  }, [uri])

  if (!svgXml) return null

  return <SvgXml xml={svgXml} width={width ?? "60"} height={height ??"60"} />
}

const CategoriesComponent = ({ data, handleSeeAll }) => {
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
        {data?.category?.map((item: any, index: number) => {
          const { icon, borderColor } = getCategoryDetails(item?.name)
          return (
            <TouchableOpacityView key={index}
              onPress={() => NavigationService.navigate(CATEGORIES_LIST_SCCREEN, { title: item?.name, id: item?.uuid })}
              style={styles.cateCardStyle(item?.border_color)}
            >
              {item?.icon?.includes('.svg') ? (
                <View style={{height:60,width:60}}>
                <SvgImageFromUri uri={data?.baseurl + item?.icon} />
                </View>
              ) : (
              <Image
                  source={item?.icon ? { uri: data?.baseurl + item?.icon } : categaoriesIcon}
                  style={styles.cateLogoImage} resizeMode="cover" />
                )
              }
              <AppText
                numberOfLines={2}
                type={FOURTEEN} weight={MEDIUM} style={styles.cateText}>{item?.name}</AppText>
            </TouchableOpacityView>
          )
        })}
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
    paddingRight: 16
  },
  cateCardStyle: (borderColor: boolean) => ({
    height: 120,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    // paddingHorizontal: 10,
    width: 110
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