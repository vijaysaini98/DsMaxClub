import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { StyleSheet, ScrollView } from 'react-native';
import { AppText, BOLD, EIGHTEEN, FOURTEEN, ITALIC, SEMI_BOLD, THIRD, TWENTY, TWENTY_EIGHT, TWENTY_TWO } from '@components/AppText';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';
import { RenderHTML } from 'react-native-render-html';
import { ms, vs } from 'react-native-size-matters/extend';
import { width } from '@utils/index';
import moment from 'moment';

const ViewDetailsBottomSheet = ({ data, ref },) => {
  return (
    <RBSheet
      ref={ref}
      useNativeDriver={false}
      height={vs(357)}
      closeOnDragDown={true}
      closeOnPressMask={true}
      draggable={true}
      customStyles={styles.sheetStyle}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[commonStyles.marginHorizontal, styles.containerStyle]}>
        <AppText type={TWENTY_EIGHT} weight={BOLD} style={styles.viewTextStyle}>View Details</AppText>
        <AppText color={THIRD} type={EIGHTEEN} weight={SEMI_BOLD} style={{ marginVertical: vs(20) }}>{"Things To Remember :-"}</AppText>

        <RenderHTML
          contentWidth={width}
          source={{ html: data?.description }}
          tagsStyles={{
            h1: { fontSize: TWENTY_TWO, fontWeight: 'bold', color: colors.black },
            h2: { fontSize: TWENTY, fontWeight: 'bold', color: colors.black },
            h3: { fontSize: EIGHTEEN, fontWeight: 'bold', color: colors.black },
            // p: { , color: 'red' },
            i: { fontFamily: ITALIC },
            a: { color: 'blue', textDecorationLine: 'underline' },
            b: { fontWeight: 'bold' }
          }}
        />
         <AppText
          type={FOURTEEN}
          style={{marginTop:vs(10)}}
          >{`Reedem Coupon: ${data?.used_coupons}`}</AppText>
        <AppText
          type={FOURTEEN}
          style={styles.validityTextStyle}>{`Valid till: ${moment(data?.valid_till).format('DD MMM YYYY')}`}</AppText>
      </ScrollView>
    </RBSheet>
  );
};

export default ViewDetailsBottomSheet;


const styles = StyleSheet.create
  ({
    viewTextStyle: {
      alignSelf: 'center',
    },
    containerStyle: {
      // marginTop: 20
    },
    validityTextStyle: {
      marginTop: vs(10),
      color: colors.activeTab
    },
    sheetStyle:
    {
      container: {
        // borderT: ms(32)
        borderTopLeftRadius:ms(32),
         borderTopRightRadius:ms(32)
      },
      wrapper: {
        backgroundColor: colors.fifth,
      },
      draggableIcon: {
        backgroundColor: colors.forth,
        height: vs(4),
        // width: '40%',
        alignSelf: 'center',
        marginTop: vs(20),
        borderRadius: ms(10)
      }
    }

  })
