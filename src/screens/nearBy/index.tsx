import { Image, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import { commonStyles } from '@theme/commonStyles'
import Header from '@components/Header'
import { AppText, SEMI_BOLD, TWENTY_TWO } from '@components/AppText'
import Input from '@components/Input'
import { defaultBookletImage, rightArrowIcon, searchIcon } from '@helper/imagesAssets'
import TouchableOpacityView from '@components/TouchableOpacityView'
import { useAppSelector } from '@redux/hooks'
import Card from '@screens/home/ui/card'
import NavigationService from '@navigations/NavigationService'
import * as routes from '@navigations/routes'
import styles from './styles'

const NearBy = () => {

  const [searchText, setSeachText] = useState("")

  const { categoryBookletData } = useAppSelector((state) => state.home)

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header />
      <View style={{ marginHorizontal: 16 }}>
        <Input
          leftIcon={searchIcon}
          placeholder='Search...'
          placeholderTextColor={colors.placeholder}
          value={searchText}
          onChangeText={(text) => setSeachText(text)}
          inputContainerStyle={styles.searchContainer}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerStyle}
      
        {categoryBookletData?.category?.map((item, index) => {
          if (!item?.booklets || item?.booklets.length === 0) return null;

          return (
            <View key={item.id || index} style={styles.trendingContainer}>
              <AppText
                type={TWENTY_TWO}
                weight={SEMI_BOLD}
                style={styles.titleStyle}
              >
                {item.name}
              </AppText>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listStyle}
              >
                {item.booklets.map((booklet: any, i: number) => (
                  <View key={booklet.id || i} style={styles.categoryBookletContainer}>
                    <Card
                      item={booklet}
                      imageBaseUrl={categoryBookletData?.baseurl}
                      index={i}
                      handleCardOnPress={() => {
                        // Add navigation or logic here
                        NavigationService.navigate(routes.DETAILS_SCREEN, { data: booklet })
                      }}
                      imageUrl={booklet?.booklet ? { uri: categoryBookletData?.baseurl + booklet?.booklet } : defaultBookletImage}
                      name={booklet?.name}
                      price={booklet.price}
                      address={(booklet?.client?.address) ? booklet?.client?.address : "---"}
                    />

                  </View>
                ))}
                <View
                  style={
                    styles.seeAllContainer2
                  }
                >
                  <TouchableOpacityView
                    style={styles.seeAllBtn2Style}
                  >
                    <Image
                      source={rightArrowIcon}
                      style={styles.rightArrowIconStyle}
                      resizeMode='contain'
                    />
                  </TouchableOpacityView>
                </View>
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>

    </AppSafeAreaView>
  )
}

export default NearBy
