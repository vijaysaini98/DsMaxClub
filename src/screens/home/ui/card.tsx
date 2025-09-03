import React from 'react';
import { Image, ScrollView, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { AppText, BOLD, BUTTON_BG, BUTTON_TEXT, EIGHTEEN, FOURTEEN, MEDIUM, PLACEHOLDER, SEMI_BOLD, SIXTEEN, THIRTEEN, TWELVE, TWENTY_TWO, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';
import { defaultBookletImage, nearByIcon, restro2, starIcon } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import { ms, s, vs } from 'react-native-size-matters/extend';

export interface CardItem {
  id?: string | number;
  image: ImageSourcePropType;
  stars: number;
}

export interface CardProps {
  data?: CardItem[];
  title?: string;
  handleCardOnPress: (item: CardItem) => void;
  imageBaseUrl?: string,
  status?: string,
  date?:string

}

const Card: React.FC<CardProps> = ({
  handleCardOnPress,
  item,
  index,
  cardContainerStyle,
  imageStyle,
  imageUrl,
  name,
  price,
  address,
  status,
  date
}) => {
  return (
    <TouchableOpacityView
      onPress={() => handleCardOnPress(item)}
      key={item.id ?? index}
      style={[styles.cardInner, cardContainerStyle]}
    >
      <FastImage
        source={imageUrl}
        // source={item.booklet ? { uri: imageBaseUrl + item.booklet } : restro2}
        style={[styles.bannerImage, imageStyle]}
        resizeMode='cover'
      />
      {/* <View style={styles.tagContainer}>
          <AppText type={TWELVE} weight={SEMI_BOLD}>Guest Favourite</AppText>
        </View> */}
      {/* details container */}
      <View style={styles.detailContainer}>
        {/* <View style={styles.ratingContainer}>
                  <View style={styles.ratingContainer2}>
                    <View style={styles.ratingViewBox}>
                      <AppText type={FOURTEEN} color={WHITE} weight={BOLD}>4.3</AppText>
                    </View>
                    <AppText type={FOURTEEN} weight={BOLD} color={PLACEHOLDER}>
                      Excellent
                      <AppText type={FOURTEEN} weight={MEDIUM} style={{ color: colors.disTextColor }}> (552 Ratings)</AppText>
                    </AppText>
                  </View>
                  <View style={styles.ratingIconContainer}>
                    {[...Array(item.stars)].map((_, idx) => (
                      <Image
                        key={idx}
                        source={starIcon}
                        style={styles.ratingIconStyle}
                        resizeMode="contain"
                      />
                    ))}
                  </View>
                </View> */}
        <View style={[styles.priceContainer]}>
          <AppText type={FOURTEEN} weight={MEDIUM}
            style={{ width: "70%" }}
          >
            {name}
          </AppText>
          <AppText type={TWELVE} weight={BOLD} color={BUTTON_BG}>
            {`Rs. ${price}`}
          </AppText>
        </View>
        
        <View style={styles.locationContainer}>
          <FastImage
            source={nearByIcon}
            style={styles.locationIconStyle}
            resizeMode='contain'
          />
          <AppText
            numberOfLines={2}
            type={TWELVE} weight={MEDIUM} style={styles.locationText}>
            {address}
          </AppText>
        </View>
         {date && <AppText type={TWELVE} 
        weight={MEDIUM}
        style={{marginLeft:s(15),marginVertical:vs(5),color:colors.disTextColor}}>
          {date}
        </AppText>}
      </View>
     
      {status && (<View style={styles.statusContainer}>
        <AppText type={FOURTEEN} weight={MEDIUM} color={BUTTON_TEXT} style={{ textTransform: 'capitalize' }}>{status}</AppText>
      </View>)}
    </TouchableOpacityView>
  );
};

export default Card;

const styles = StyleSheet.create({

  bannerImage: {
    // height: vs(210),
    height:vs(150),
    width: s(280),
  },
  cardInner: {
    borderRadius: ms(10),
    backgroundColor: colors.white,
    overflow: 'hidden',
    width: s(280)
  },
  tagContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 5,
    position: "absolute",
    borderRadius: 12,
    top: 12,
    left: 12
  },
  detailContainer: {
    marginHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.white
    // backgroundColor:"yellow"
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ratingContainer2: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center'
  },
  ratingViewBox: {
    backgroundColor: colors.placeholder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15
  },
  ratingIconContainer: {
    flexDirection: 'row',
  },
  ratingIconStyle: {
    width: 9,
    height: 9
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 5,
    gap: 10
  },
  locationContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  locationIconStyle: {
    marginTop: vs(2),
    width: 15,
    height: 15,
    tintColor: colors.disTextColor
  },
  locationText: {
    color: colors.disTextColor,
    marginRight: 5
  },
  statusContainer: {
    position: 'absolute',
    top: vs(10),
    right: s(10),
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingVertical: vs(5),
    paddingHorizontal: s(8),
    borderRadius: ms(12)
  }
});