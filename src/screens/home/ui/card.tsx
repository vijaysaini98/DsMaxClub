import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AppText,
  BOLD,
  FOURTEEN,
  MEDIUM,
  TWELVE,
  WHITE,
  NORMAL,
  TEN,
  PLACEHOLDER,
} from '@components/AppText';
import { colors } from '@theme/colors';
import {
  defaultBookletImage,
  helpLineIcon,
  nearByIcon,
  restro2,
} from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { openPhoneDialer } from '@utils/index';

export interface CardItem {
  id?: string | number;
  name?: string;
  booklet?: string;
  image?: ImageSourcePropType;
  stars?: number;
  [key: string]: any;
}

export interface CardProps {
  item: CardItem;
  index?: number;
  handleCardOnPress: (item: CardItem) => void;
  cardContainerStyle?: ViewStyle | ViewStyle[];
  imageStyle?: ImageStyle | ImageStyle[];
  imageUrl?: ImageSourcePropType;
  imageBaseUrl?: string;
  name?: string;
  price?: string | number;
  address?: string;
  status?: string;
  cardDisabled?: boolean;
  date?: string;
  mobile?: string;
  shortDesc?: string
}

const Card: React.FC<CardProps> = ({
  handleCardOnPress,
  item,
  index,
  cardContainerStyle,
  imageStyle,
  imageUrl,
  imageBaseUrl,
  name,
  price,
  address,
  status,
  cardDisabled,
  date,
  shortDesc
  // mobile,
}) => {
  const source: ImageSourcePropType =
    imageUrl ||
    item?.image ||
    (item?.booklet ? { uri: `${imageBaseUrl ?? ''}${item.booklet}` } : restro2) ||
    defaultBookletImage;

  const displayName = name ?? item?.name ?? '';
  const displayPrice = price !== undefined && price !== null ? `Rs. ${price}` : '';

  return (
    <TouchableOpacityView
      onPress={() => handleCardOnPress(item)}
      disabled={cardDisabled}
      style={[styles.cardInner, cardContainerStyle]}
    >
      <FastImage
        source={source}
        style={[styles.bannerImage, imageStyle]}
        resizeMode="cover" />

      <View style={styles.detailContainer}>
        <View style={styles.priceContainer}>
          <AppText type={FOURTEEN} weight={MEDIUM} style={styles.nameText}>
            {displayName}
          </AppText>

          {displayPrice ? (
            <AppText type={TWELVE} weight={BOLD} color={colors.buttonBg} style={styles.priceText}>
              {displayPrice}
            </AppText>
          ) : null}
        </View>

        {/* {mobile ? (
          <TouchableOpacityView onPress={() => openPhoneDialer(mobile)} style={styles.phoneContainerStyle}>
            <Image source={helpLineIcon} style={styles.phoneIconStyle} resizeMode="contain" />
            <AppText type={TWELVE} weight={NORMAL} style={styles.phoneText}>
              {mobile}
            </AppText>
          </TouchableOpacityView>
        ) : null} */}
        {
          shortDesc && (
            <AppText type={TEN} weight={MEDIUM} color={PLACEHOLDER}>{shortDesc}</AppText>
          )
        }
        {date ? (
          <AppText type={TWELVE} weight={MEDIUM} style={styles.dateText}>
            {date}
          </AppText>
        ) : null}
        <View style={styles.locationContainer}>
          <FastImage source={nearByIcon} style={styles.locationIconStyle} resizeMode="contain" />
          <AppText numberOfLines={2} type={TWELVE} weight={MEDIUM} style={styles.locationText}>
            {address}
          </AppText>
        </View>


      </View>

      {status ? (
        <View style={styles.statusContainer}>
          <AppText type={FOURTEEN} weight={MEDIUM} color={WHITE} style={styles.statusText}>
            {status}
          </AppText>
        </View>
      ) : null}
    </TouchableOpacityView>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  bannerImage: {
    height: vs(150),
    width: s(280),
  },
  cardInner: {
    borderRadius: ms(10),
    backgroundColor: colors.white,
    overflow: 'hidden',
    width: s(280),
  },
  detailContainer: {
    paddingHorizontal: s(12),
    paddingVertical: vs(10),
    backgroundColor: colors.white,
    width: '100%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vs(5),
    gap: s(10),
  },
  nameText: {
    width: '70%',
  } as TextStyle,
  priceText: {
    textAlign: 'right',
  } as TextStyle,
  phoneContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(4),
    gap: s(5),
  },
  phoneIconStyle: {
    width: s(12),
    height: s(12),
    tintColor: colors.buttonBg,
    marginRight: s(6),
  },
  phoneText: {
    color: colors.disTextColor,
  } as TextStyle,
  locationContainer: {
    flexDirection: 'row',
    gap: s(5),
    marginTop: vs(5),
  },
  locationIconStyle: {
    marginTop: vs(2),
    width: s(15),
    height: s(15),
    tintColor: colors.disTextColor,
  },
  locationText: {
    color: colors.disTextColor,
    marginRight: s(5),
    flex: 1,
  },
  dateText: {
    marginTop: vs(5),
    color: colors.first,
  },
  statusContainer: {
    position: 'absolute',
    top: vs(10),
    right: s(10),
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    paddingVertical: vs(5),
    paddingHorizontal: s(8),
    borderRadius: ms(12),
  },
  statusText: {
    textTransform: 'capitalize',
  } as TextStyle,
});