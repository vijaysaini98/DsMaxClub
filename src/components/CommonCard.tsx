import { StyleSheet, Image, View, TextInput, Dimensions } from 'react-native';
import React from 'react';
import { colors } from '../theme/colors';
import { AppText, BLACK, BOLD, BUTTON_TEXT, ELEVEN, FOURTEEN, MEDIUM, PLACEHOLDER, SEMI_BOLD, SIXTEEN, TEN, TWELVE, WHITE } from './AppText';
import { CardProps } from 'src/types/common';
import TouchableOpacityView from './TouchableOpacityView';
import { shareIcon } from '@helper/imagesAssets';
import { ms, s, vs } from 'react-native-size-matters/extend';
import RenderHTML from 'react-native-render-html';


const { width } = Dimensions.get('window');
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
  actualPrice,
  buttonTitle,
  buttonTitle2,
  couponCount,
  htmlContent,
  viewBtnDisabled,
  redeemButtonStyle,
  redeemDisabled,
  viewBtnLoader,
  statusBg,
  statusTextColor
}: CardProps) => {
  if (!data) return null;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={{width:status ? "80%":"100%"}}>
          {heading}
        </AppText>

        {status && (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                statusBg? statusBg :
                  status === 'Active' ? colors.lightGreen : colors.disabledBtn,
              },
            ]}>
            <AppText 
            type={TWELVE} 
            color={statusTextColor? statusTextColor: status === 'Active' ? WHITE : BUTTON_TEXT} 
            weight={SEMI_BOLD}
            style={{ textTransform: 'capitalize' }}>{status}</AppText>
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
        {htmlContent ?

          (
            <View style={{ marginVertical: vs(8) }}>
              <RenderHTML
                contentWidth={width}
                source={{ html: htmlContent }}

              // tagsStyles={{
              //     h1: { fontSize: TWENTY_TW, fontWeight: 'bold', color: colors.black },
              //     h2: { fontSize: TWENTY, fontWeight: 'bold', color: colors.black },
              //     h3: { fontSize: EIGHTEEN, fontWeight: 'bold', color: colors.black },
              //     // p: { , color: 'red' },
              //     i: { fontFamily: ITALIC },
              //     a: { color: 'blue', textDecorationLine: 'underline' },
              //     b: { fontWeight: 'bold' }
              // }}
              />
            </View>
          ) :
          (<AppText
            // numberOfLines={2}
            style={styles.description}>{description}</AppText>)
        }
        {/* </View> */}

        {price && (
          <View style={styles.priceRow}>
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
          </View>
        )}
      </View>
      {couponCount && (
        <View style={styles.couponCountContainer}>
          <AppText type={TEN}
            weight={MEDIUM}
            // color={WHITE}
            style={{ color: colors.placeholder2 }}
          >{`No of Coupons: ${couponCount}`}</AppText>

        </View>)}

      <View style={styles.buttonRow}>
        <TouchableOpacityView
          style={[showRedeemBtn ? styles.viewButton2 : styles.viewButton1(viewBtnDisabled), btnStyle]}
          onPress={onViewPress}
          disabled={viewBtnDisabled}
          loader={viewBtnLoader}
          >
          <AppText
            type={SIXTEEN}
            weight={BOLD}
            color={btnTextColor ? btnTextColor : showRedeemBtn ? colors.third : colors.white}
          >
            {buttonTitle ? buttonTitle : "VIEW"}
          </AppText>
        </TouchableOpacityView>

        {showRedeemBtn && (
          <TouchableOpacityView
            style={[styles.redeemButton,redeemButtonStyle]}
            onPress={onRedeemPress}
            disabled={redeemDisabled}
            >
            <AppText type={SIXTEEN} weight={BOLD} style={styles.redeemText}>
              {buttonTitle2 ? buttonTitle2 : "REDEEM"}
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

    borderColor: colors.second,
    borderWidth: 3,
    borderStyle: "dotted"

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
    // color: colors.white,
    // fontSize: ms(12),
  },
  description: {
    marginVertical: vs(8),
    // width: "90%",
    letterSpacing: (0.5)
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: ms(5)
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
    gap: ms(10)
  },
  viewButton1:(disabledBtn:boolean)=>( {
    marginTop: vs(20),
    backgroundColor:disabledBtn ? colors.disabledBtn :  colors.buttonText,
    borderRadius: ms(20),
    paddingVertical: vs(10),
    flex: 1,
    alignItems: 'center',
  }),
  viewButton2: {
    marginTop: vs(20),
    // backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.third,
    borderRadius: ms(20),
    paddingVertical: vs(10),
    flex: 1,
    alignItems: 'center',
  },
  // viewText: {
  //   color: colors.white,
  // },
  redeemButton: {
    marginTop: vs(20),
    backgroundColor: colors.buttonText,
    borderRadius: ms(20),
    paddingVertical: vs(10),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  redeemText: {
    color: colors.white,
  },
  shareIcon: {
    width: s(20),
    height: vs(20)
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  couponCountContainer: {
    borderWidth: ms(1),
    borderStyle: 'dashed',
    borderRadius: ms(6),
    backgroundColor: colors.tabBg,
    borderColor: colors.tabBag,
    maxWidth: s(120),
    padding: ms(10),
    marginTop: vs(10)
  }
});

export default CommonCard;