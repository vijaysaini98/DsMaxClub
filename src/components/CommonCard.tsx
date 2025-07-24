import {StyleSheet, Image, View, TextInput, Dimensions} from 'react-native';
import React from 'react';

import {colors} from '../theme/colors';
import { AppText, BLACK, BOLD, FOURTEEN, MEDIUM, SEMI_BOLD, SIXTEEN } from './AppText';
import { CardProps } from 'src/types/common';
import TouchableOpacityView from './TouchableOpacityView';
import { shareIcon } from '@helper/imagesAssets';


const {width} = Dimensions.get('window');
const CommonCard = ({
  data,
  showRedeemBtn = false,
  onViewPress,
  onRedeemPress,
  rightIcon,
  status,
  btnStyle,
  btnTextColor,
  handleRightIcon,
  heading, description,
   price,
    actualPrice
}: CardProps) => {
   if (!data) return null; 

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <AppText type={SIXTEEN} weight={SEMI_BOLD}>
          {heading}
        </AppText>
        
        {status && (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  status === 'Active' ? colors.lightGreen : colors.buttonText,
              },
            ]}>
            <AppText style={styles.statusText}>{status}</AppText>
          </View>
        )}
        {
          rightIcon && (
            <TouchableOpacityView
            activeOpacity={handleRightIcon ? 0.8 : 1} 
            onPress={handleRightIcon}
            >
            <Image
            source={shareIcon}
            style={styles.shareIcon}
            tintColor={colors.disTextColor}
            />
            </TouchableOpacityView>
          )
        }
      </View>

      <View style={styles.rowContainer}>
        {/* <View > */}
          <AppText 
          // numberOfLines={2}
          style={styles.description}>{description}</AppText>
        {/* </View> */}

        {/* <View style={styles.priceRow}>
          <AppText weight={BOLD} type={FOURTEEN}
          color={BLACK}
          style={styles.price}>
            {`Rs. ${price}`}
            
          </AppText>
          {actualPrice && (
            <AppText weight={MEDIUM} style={styles.strikeThrough}>
              {`Rs.${actualPrice}`}
            </AppText>
          )}
        </View> */}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacityView
          style={[showRedeemBtn ? styles.viewButton2 : styles.viewButton1,btnStyle]}
          onPress={onViewPress}>
          <AppText
            type={SIXTEEN}
            weight={BOLD}
            color={btnTextColor ? btnTextColor :showRedeemBtn ? colors.third : colors.white}
            >
            VIEW
          </AppText>
        </TouchableOpacityView>

        {showRedeemBtn && (
          <TouchableOpacityView
            style={styles.redeemButton}
            onPress={onRedeemPress}>
            <AppText type={SIXTEEN} weight={BOLD} style={styles.redeemText}>
              REDEEM
            </AppText>
          </TouchableOpacityView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    width: width * 0.9,
    alignSelf: 'center',
    
    borderColor:colors.second,
    borderWidth: 1,

  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
  },
  description: {
    marginVertical: 8,
    width:"60%",
    letterSpacing:0.5
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap:5
  },
  price: {
    // marginRight: 8,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: colors.first,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:10
  },
  viewButton1: {
   marginTop:20,
    backgroundColor:colors.buttonText,
    borderRadius: 20,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  viewButton2: {
   marginTop:20,
    // backgroundColor:colors.buttonText,
    borderWidth:1,
    borderColor:colors.third,
    borderRadius: 20,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  // viewText: {
  //   color: colors.white,
  // },
  redeemButton: {
   marginTop:20,
backgroundColor: colors.buttonText,
    borderRadius: 20,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  redeemText: {
    color: colors.white,
  },
  shareIcon:{
    width:20,
    height:20
  },
  rowContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
  }
});

export default CommonCard;