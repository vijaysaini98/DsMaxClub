import {StyleSheet, Image, View, TextInput, Dimensions} from 'react-native';
import React from 'react';

import {colors} from '../theme/colors';
import { AppText, BOLD, FOURTEEN, MEDIUM, SEMI_BOLD, SIXTEEN } from './AppText';
import { CardProps } from 'src/types/common';
import TouchableOpacityView from './TouchableOpacityView';


const {width} = Dimensions.get('window');
const CommonCard = ({
  data,
  showRedeemBtn = false,
  onViewPress,
  onRedeemPress,
}: CardProps) => {
   if (!data) return null; 
  const { heading, description, price, actualPrice, status } = data;

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
      </View>

      <View style={{flexDirection: 'row',gap:10}}>
        <View style={{width: '60%'}}>
          <AppText style={styles.description}>{description}</AppText>
        </View>

        <View style={styles.priceRow}>
          <AppText weight={BOLD} type={FOURTEEN} style={styles.price}>
            {`Rs. ${price}`}
          </AppText>
          {actualPrice && (
            <AppText weight={MEDIUM} style={styles.strikeThrough}>
              {`Rs.${actualPrice}`}
            </AppText>
          )}
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacityView
          style={showRedeemBtn ? styles.viewButton2 : styles.viewButton1}
          onPress={onViewPress}>
          <AppText
            type={SIXTEEN}
            weight={BOLD}
            style={[
              styles.viewText,
              {color: showRedeemBtn ? colors.third : colors.white},
            ]}>
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
    color:colors.third
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15
  },
  price: {
    // fontSize: 16,
    color: colors.black,
    marginRight: 8,
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
  viewText: {
    color: colors.white,
  },
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
});

export default CommonCard;