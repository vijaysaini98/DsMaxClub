import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppText, BUTTON_TEXT, FOURTEEN, MEDIUM, SEMI_BOLD, SIXTEEN, TWELVE, TWENTY_TWO } from '@components/AppText'
import TouchableOpacityView from '@components/TouchableOpacityView'
import { appIconNew, categaoriesIcon } from '@helper/imagesAssets'
import { getCategoryDetails } from '@utils/index'
import NavigationService from '@navigations/NavigationService'
import { CATEGORIES_LIST_SCCREEN } from '@navigations/routes'
import { SvgXml } from 'react-native-svg'
import { ms, s, vs } from 'react-native-size-matters/extend'
import { IMGE_URL } from '@services/config'

export const SvgImageFromUri = ({ uri, height, width }: { uri: string, height?: string, width?: string }) => {
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

  return <SvgXml xml={svgXml} width={width ?? "60"} height={height ?? "60"} />
}



const CategoriesComponent = ({ data, handleSeeAll }: { data: any, handleSeeAll: () => void }) => {
   const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
   
  return (
    <View style={styles.categoriesMainContainer}>
      <View style={styles.categoriesHeaderContainer}>
        <AppText type={TWENTY_TWO} weight={SEMI_BOLD} style={styles.cateTitle}>
          Categories
        </AppText>
        <TouchableOpacityView
          onPress={handleSeeAll}
          style={styles.cateSeeAllBtn}
        >
          <AppText type={SIXTEEN} color={BUTTON_TEXT}>View All</AppText>
        </TouchableOpacityView>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {data?.category?.map((item: any, index: number) => {
          
          const { borderColor } = getCategoryDetails(item?.name)
          return (
            <TouchableOpacityView
              onPress={() => NavigationService.navigate(CATEGORIES_LIST_SCCREEN, { title: item?.name, id: item?.uuid })}
              style={styles.categoryItem}
              key={index}
            >
              <View style={styles.cateCardStyle(item?.border_color || borderColor)}>
  {item?.icon?.includes('.svg') ? (
    <View style={styles.svgIconContainer}>
      <SvgImageFromUri
        height="20"
        width="20"
        uri={IMGE_URL + item?.icon}
      />
    </View>
  ) : (
  
    <Image
  source={
    imageErrors[item?.uuid] || !item?.icon
      ? appIconNew
      : { uri: IMGE_URL + item?.icon }
  }
  style={styles.cateLogoImage}
  resizeMode="cover"
  onError={() => {
    setImageErrors(prev => ({
      ...prev,
      [item?.uuid]: true,
    }));
  }}
/>
  
  )}
</View>
              <AppText
                numberOfLines={2}
                type={TWELVE}
                weight={MEDIUM}
                style={styles.cateText}
              >
                {item?.name}
              </AppText>
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
    paddingVertical: vs(9),
  },
  categoriesHeaderContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(16),
  },
  cateTitle: {
    width: "80%",
  },
  cateSeeAllBtn: {
    width: "20%",
    alignItems: 'flex-end',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingTop: vs(8),
    gap: vs(16),
    paddingHorizontal: vs(16),
  },
  categoryItem: {
    alignItems: 'center',
    width: 'auto',
    marginBottom: vs(16),
  },
  cateCardStyle: (borderColor: string) => ({
    borderWidth: s(0.5),
    borderColor: borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(60),
    width: ms(60),
    borderRadius: ms(30),
    backgroundColor: '#fff',
    overflow:'hidden'
  }),
  cateLogoImage: {
    width: s(50),
    height: vs(50),
    marginVertical: vs(10),
  },
  cateText: {
    marginTop:vs(10),
    textAlign: 'center',
  },
  svgIconContainer: {
    alignItems: 'center',
    overflow:'hidden'
  },
});