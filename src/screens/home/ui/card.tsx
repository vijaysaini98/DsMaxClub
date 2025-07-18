import React from 'react';
import { Image, ScrollView, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { AppText, BOLD, BUTTON_BG, EIGHTEEN, FOURTEEN, MEDIUM, PLACEHOLDER, SEMI_BOLD, TWELVE, TWENTY_TWO, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';
import { nearByIcon, restro2, starIcon } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';

export interface CardItem {
  id?: string | number;
  image: ImageSourcePropType;
  stars: number;
}

export interface CardProps {
  data: CardItem[];
  title: string;
  handleCardOnPress: (item: CardItem) => void;
  imageBaseUrl: string
}

const Card: React.FC<CardProps> = ({ handleCardOnPress, item, index, cardContainerStyle, imageStyle, imageBaseUrl }) => {
  return (
    <TouchableOpacityView
  onPress={() => handleCardOnPress(item)}
  key={item.id ?? index}
  style={[styles.cardInner, cardContainerStyle]}
>
        <Image
          source={item.booklet ? { uri: imageBaseUrl + item.booklet } : restro2}
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
            <AppText type={EIGHTEEN} weight={MEDIUM}  >
              {item?.name}
            </AppText>
            <AppText type={FOURTEEN} weight={BOLD} color={BUTTON_BG}>
              {`Rs. ${item?.price}`}
            </AppText>
          </View>
          <View style={styles.locationContainer}>
            <Image
              source={nearByIcon}
              style={styles.locationIconStyle}
              resizeMode='contain'
            />
            <AppText type={TWELVE} weight={MEDIUM} style={styles.locationText}>
              {item?.city || item?.state ? item?.city?.name + item?.state?.name : "---"}
            </AppText>
          </View>
        </View>
    </TouchableOpacityView>
  );
};

export default Card;

const styles = StyleSheet.create({
 
  bannerImage: {
    height: 210,
    width: 300,
  },
  cardInner: {
  borderRadius: 10,
  backgroundColor: colors.white,
  overflow: 'hidden',
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.white
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
    justifyContent: 'space-between',
    marginTop: 10
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5
  },
  locationIconStyle: {
    width: 15,
    height: 15,
    tintColor: colors.disTextColor
  },
  locationText: {
    color: colors.disTextColor
  }
});