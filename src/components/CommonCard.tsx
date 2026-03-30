import { StyleSheet, Image, View, Dimensions } from 'react-native';
import React, { useRef } from 'react';
import { colors } from '../theme/colors';
import { AppText, BLACK, BOLD, BUTTON_TEXT, EIGHTEEN, FOURTEEN, MEDIUM, PLACEHOLDER, SEMI_BOLD, SIXTEEN, TEN, THIRD, TWELVE, WHITE } from './AppText';
import { CardProps } from 'src/types/common';
import TouchableOpacityView from './TouchableOpacityView';
import { contactIcon, downArrowIcon, locationIcon, shareIcon } from '@helper/imagesAssets';
import { ms, s, vs } from 'react-native-size-matters/extend';
import RenderHTML from 'react-native-render-html';
import MultiLocationSheet from '@screens/detail/ui/multiLoctionSheet';


const { width } = Dimensions.get('window');
const CommonCard = ({
  hideViewButton,
  data,
  showRedeemBtn = false,
  onViewPress,
  onRedeemPress,
  rightIcon,
  status,
  vendorName,
  btnStyle,
  btnTextColor,
  handleRightIcon,
  heading, description,
  price,
  actualPrice,
  location,
  buttonTitle,
  buttonTitle2,
  couponCount,
  htmlContent,
  viewBtnDisabled,
  redeemButtonStyle,
  redeemDisabled,
  viewBtnLoader,
  statusBg,
  statusTextColor,
  usedCoupon,
  shortDesc,
  completeShortDesc,
  onContactPress,
}: CardProps) => {
  if (!data) return null;

  const sheetRef = useRef<any>(null);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={{ width: status ? "80%" : "100%" }}>
          {heading}
        </AppText>

        {status && (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  statusBg ? statusBg :
                    status === 'Active' ? colors.lightGreen : colors.tabBg,
              },
            ]}>
            <AppText
              type={TWELVE}
              color={statusTextColor ? statusTextColor : status === 'Active' ? WHITE : BUTTON_TEXT}
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
      {/* {vendorName &&
        <AppText weight={MEDIUM}>{vendorName}</AppText>
      } */}
      {/* {
        shortDesc && (
          <AppText type={TEN} weight={MEDIUM} color={PLACEHOLDER}>{shortDesc}</AppText>
        )
      } */}
       <AppText style={{ width: status ? "80%" : "100%",marginVertical: vs(4) }} color={PLACEHOLDER} weight={BOLD}>
          {couponCount ? `No. of Coupons: ${couponCount}` : null}
        </AppText>
      <View style={styles.rowContainer}>
        {/* <View > */}
        {htmlContent ?

          (
            <View style={{ marginVertical: vs(4) }}>
              <RenderHTML
                contentWidth={width}
                source={{ html: htmlContent }}
                baseStyle={{ color: colors.buttonText }}
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
            style={styles.description} type={EIGHTEEN} weight={BOLD}>{description}</AppText>)
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
      {/* {couponCount && (
        <View style={styles.couponCountContainer}>
          <AppText type={TEN}
            weight={BOLD}
            // color={WHITE}
            style={{ color: colors.placeholder2 }}
          >{`No of Coupons: ${couponCount}`}</AppText>

        </View>)}
        {
          onContactPress &&  (
<TouchableOpacityView style={{paddingVertical: vs(4)}} onPress={onContactPress}>
  <Image source={contactIcon} style={{tintColor:colors.buttonBg, width: s(30), height: vs(30),marginTop: vs(4)}}/>
</TouchableOpacityView>
          )
        }

        </View>)} */}

      {usedCoupon && usedCoupon > 0 && (
        <View style={styles.usedCouponCountContainer}>
          <AppText type={TEN}
            weight={MEDIUM}
            // color={WHITE}
            style={{ color: colors.placeholder2 }}
          >{`No of Used Coupons: ${usedCoupon}`}</AppText>

        </View>)}

      {
        (location && location?.length > 0) && (
          <View
            // onPress={()=> openInGoogleMaps(data?.client?.location_url)}

            style={{ flexDirection: 'row', gap: 2, alignItems: 'center',marginTop: vs(10) }}
          >
            {/* <TouchableOpacityView
              // onPress={() => handleRedirection(data?.locations[0]?.location_url)}
              style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
            > */}
            <Image
              source={locationIcon}
              style={{ height: vs(15), width: s(15) }}
              tintColor={colors.borderColor}
              resizeMode='contain'
            />
            <AppText

              type={TWELVE} color={BUTTON_TEXT}
              numberOfLines={2}
              style={{
                letterSpacing: 0.8,
                width: "90%"
              }} >{location[0]?.location}</AppText>
            {/* </TouchableOpacityView> */}
            <TouchableOpacityView
              onPress={() => sheetRef.current?.present()}
            >
              <Image
                source={downArrowIcon}
                style={{ height: vs(15), width: s(15), marginTop: 3 }}
                resizeMode='contain'
              />
            </TouchableOpacityView>
          </View>
        )
      }

        <AppText style={{ width: status ? "80%" : "100%",marginVertical: vs(4) }} color={PLACEHOLDER}>
          {completeShortDesc ? completeShortDesc : null}
        </AppText>
<TouchableOpacityView style={{paddingVertical: vs(4)}} onPress={onContactPress}>
  <Image source={contactIcon} style={{tintColor:colors.buttonBg, width: s(30), height: vs(30)}}/>
</TouchableOpacityView>

      <View style={styles.buttonRow}>
        {!hideViewButton && (
  <TouchableOpacityView
    style={[
      showRedeemBtn
        ? styles.viewButton2
        : styles.viewButton1(viewBtnDisabled),
      btnStyle,
    ]}
    onPress={onViewPress}
    disabled={viewBtnDisabled}
    loader={viewBtnLoader}
  >
    <AppText
      type={SIXTEEN}
      weight={BOLD}
      color={
        btnTextColor
          ? btnTextColor
          : showRedeemBtn
          ? colors.third
          : colors.white
      }
    >
      {buttonTitle ? buttonTitle : "VIEW"}
    </AppText>
  </TouchableOpacityView>
)}
        {/* <TouchableOpacityView
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
        </TouchableOpacityView> */}
       

        {showRedeemBtn && (
          <TouchableOpacityView
            style={[styles.redeemButton, redeemButtonStyle]}
            onPress={onRedeemPress}
            disabled={redeemDisabled}
          >
            <AppText type={SIXTEEN} weight={BOLD} style={styles.redeemText}>
              {buttonTitle2 ? buttonTitle2 : "REDEEM"}
            </AppText>
          </TouchableOpacityView>
        )}
      </View>
      <MultiLocationSheet
        sheetRef={sheetRef}
        data={location}
        title={data?.vendor?.name ? data?.vendor?.name : data?.client_name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    width: width * 0.9,
    alignSelf: 'center',
    borderColor: colors.black,
    borderWidth: 2,
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
    position: 'absolute',
    right: -5,
    top: -10
  },
  statusText: {
    // color: colors.white,
    // fontSize: ms(12),
  },
  description: {
    // marginVertical: vs(8),
    marginVertical: vs(8),
    // width: "90%",
    letterSpacing: (0.5),
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
  viewButton1: (disabledBtn: boolean) => ({
    marginTop: vs(20),
    backgroundColor: disabledBtn ? colors.disabledBtn : colors.buttonText,
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
    borderWidth: 0.5,
    borderStyle: 'dashed',
    borderRadius: ms(6),
    backgroundColor: colors.tabBg,
    maxWidth: s(120),
    padding: ms(10),
    marginTop: vs(10)
  },
  usedCouponCountContainer: {
    borderWidth: 0.5,
    borderStyle: 'dashed',
    borderRadius: ms(6),
    backgroundColor: colors.mainBg,
    maxWidth: s(150),
    padding: ms(10),
    marginVertical: vs(5)
  }
});

export default CommonCard;