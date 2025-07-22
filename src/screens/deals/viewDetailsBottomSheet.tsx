import React, {forwardRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { AppText, BOLD, EIGHTEEN, FOURTEEN, SEMI_BOLD, THIRD, TWENTY_EIGHT } from '@components/AppText';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';


const ViewDetailsBottomSheet = forwardRef((props, ref) => {
  return (
    <RBSheet
      ref={ref}
      useNativeDriver={false}
      height={350}
      closeOnDragDown={true}
      closeOnPressMask={true}
    
      customStyles={
        {
          container: {
        borderRadius:32
          },
           wrapper: {
      backgroundColor: colors.fifth,
    },
        }
      }>
        <TouchableOpacity
        style={styles.blankView}
        onPress={() => ref?.current?.close()}
        activeOpacity={0.7}
      />

      <View style={commonStyles.marginHorizontal}>

        <AppText type={TWENTY_EIGHT} weight={BOLD} style={ styles.viewTextStyle}>View Details</AppText>
        <AppText color={THIRD} type={EIGHTEEN} weight={SEMI_BOLD} style={{marginTop:20}}>Things To Remember :-</AppText>
        <AppText color={THIRD} type={FOURTEEN}  style={{marginTop:20}}>1. Two Dinner Buffet/ TDH</AppText>
        <AppText color={THIRD} type={FOURTEEN}  style={{marginTop:20}}>2. Valid for 2 Person</AppText>
        <AppText color={THIRD} type={FOURTEEN} style={{marginTop:20}}>3. One Time Two Coupons can be used. </AppText>
        <AppText type={FOURTEEN} style={{color:colors.buttonText,marginTop:30}}>Valid till 31 July 2025*</AppText>
      </View>
    </RBSheet>
  );
});

export default ViewDetailsBottomSheet;


const styles = StyleSheet.create
({
viewTextStyle:{
    alignSelf:'center',
    paddingTop:20
},
blankView:{
backgroundColor:colors.forth,height:4,width:'40%',alignSelf:'center',marginTop:20,borderRadius:10
}
})
