import React, { forwardRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { AppText, BOLD, EIGHTEEN, FOURTEEN, SEMI_BOLD, SIXTEEN, THIRD, TWENTY_EIGHT, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';// ✅ make sure this constant is correct
import NavigationService from '@navigations/NavigationService';
import { REDEEM_SUCCESSFULL_SCREEN, REDEEM_SUCCESSFULL_SCREEN_USER } from '@navigations/routes';
import TouchableOpacityView from '@components/TouchableOpacityView';

const RedeemSheet = forwardRef((props, ref) => {
  const { handleContinueBtn } = props;

  const data = [
    { id: '1', title: 'Price :', value: 'Rs. 400/-' },
    { id: '2', title: 'Valid Till :', value: '31 July 2025' },
    { id: '3', title: 'Location : ', value: '25 A Tonk Road Jaipur' },
  ];

  const onPress = () => {
    ref?.current?.close();
    NavigationService.navigate(REDEEM_SUCCESSFULL_SCREEN_USER);
  };

  return (
    <RBSheet
      ref={ref}
      useNativeDriver={false}
      height={400}
      closeOnDragDown={true}
      closeOnPressMask={true}
      draggable={true}
      customStyles={styles.sheetCustomStyle}
    >
      <View style={styles.containerStyle}>
        <AppText type={TWENTY_EIGHT} weight={BOLD} style={styles.viewTextStyle}>
          Redeem Now
        </AppText>
        <AppText
          color={THIRD}
          type={EIGHTEEN}
          weight={SEMI_BOLD}
          style={styles.subTextStyle}
        >
          Two Breakfast Buffet Valid for 2 People One Time
        </AppText>

        <View style={styles.detailContainer}>
          {data.map((item) => (
            <View key={item.id} style={styles.detailRowStyle}>
              <AppText type={FOURTEEN}>{item.title}</AppText>
              <AppText type={FOURTEEN} weight={BOLD}>
                {item.value}
              </AppText>
            </View>
          ))}

          <View style={styles.btnContainer}>
            <TouchableOpacityView
              onPress={() => ref?.current?.close()}
              style={styles.cancelBtnStyle}
            >
              <AppText type={SIXTEEN} weight={BOLD}>
                CANCEL
              </AppText>
            </TouchableOpacityView>

            <TouchableOpacityView
              onPress={onPress}
              style={styles.continueBtnStyle}
            >
              <AppText type={SIXTEEN} weight={BOLD} color={WHITE}>
                CONTINUE
              </AppText>
            </TouchableOpacityView>
          </View>
        </View>
      </View>
    </RBSheet>
  );
});

export default RedeemSheet;

const styles = StyleSheet.create
    ({
        viewTextStyle: {
            alignSelf: 'center',
            paddingTop: 20
        },
        sheetCustomStyle: {
            container: {
                borderRadius: 32
            },
            wrapper: {
                backgroundColor: colors.fifth,
            },
            draggableIcon: {
                backgroundColor: colors.forth,
                height: 4,
                width: '40%',
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 10
            }
        },
        containerStyle: { paddingHorizontal: 16 },
        subTextStyle: {
            marginTop: 20, textAlign: 'center',
            width: 280,
            alignSelf: 'center',
        },
        cancelBtnStyle: {
            backgroundColor: colors.white,
            paddingVertical: 15,
            width: 170,
            alignItems: 'center',
            borderRadius: 100,
            borderWidth: 1,
            borderColor: colors.borderColor

        },
        continueBtnStyle: {
            backgroundColor: colors.buttonBg,
            paddingVertical: 15,
            width: 170,
            alignItems: 'center',
            borderRadius: 100
        },
        btnContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 32
        },
        detailRowStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12
        },
        detailContainer: {
            marginTop: 32
        }
    })