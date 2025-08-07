import React, { forwardRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { AppText, BOLD, EIGHTEEN, SEMI_BOLD, THIRD, TWENTY_EIGHT } from '@components/AppText';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';
import DetailField from '@components/DetailField';
import { ms, vs } from 'react-native-size-matters/extend';
import { vendorViewdetails } from '@utils/index';


const ViewDealsBottomSheet = forwardRef((props, ref) => {
  const { heading, subHeading, data, height } = props;

  const detailData = vendorViewdetails(data)

  return (
    <RBSheet
      ref={ref}
      useNativeDriver={false}
      height={height}
      draggable={true}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={styles.bottomSheetStyle}>
      <View style={commonStyles.marginHorizontal}>
        <AppText type={TWENTY_EIGHT} weight={BOLD} style={styles.viewTextStyle}>{heading}</AppText>
        <AppText color={THIRD} type={EIGHTEEN} weight={SEMI_BOLD} style={styles.subHeadingStyle}>{subHeading}</AppText>
        {
          detailData?.map((item) => {

            return (
              <DetailField title={item?.title} value={item?.value} />
            )
          })
        }
      </View>
    </RBSheet>
  );
});

export default ViewDealsBottomSheet;


const styles = StyleSheet.create
  ({
    bottomSheetStyle: {
      container: {
        borderRadius: 32
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
    },
    subHeadingStyle: {
      marginTop: vs(20),
      textAlign: 'center'
    },
    viewTextStyle: {
      alignSelf: 'center',
      paddingTop: vs(20)
    },
    blankView: {
      backgroundColor: colors.forth,
      height: vs(4),
      width: '40%',
      alignSelf: 'center',
      marginTop: vs(20),
      borderRadius: ms(10)
    }
  })
