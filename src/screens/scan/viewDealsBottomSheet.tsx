import React, {forwardRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { AppText, BOLD, EIGHTEEN, FOURTEEN, SEMI_BOLD, THIRD, TWENTY_EIGHT } from '@components/AppText';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';
import { scanViewDealsDummyData } from '@helper/dumyData';
import DetailField from '@components/DetailField';


const ViewDealsBottomSheet = forwardRef((props, ref) => {
     const { heading, subHeading ,data,height} = props;
  return (
    <RBSheet
      ref={ref}
      useNativeDriver={false}
      height={height}
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

        <AppText type={TWENTY_EIGHT} weight={BOLD} style={ styles.viewTextStyle}>{heading}</AppText>
        <AppText color={THIRD} type={EIGHTEEN} weight={SEMI_BOLD} style={{marginTop:20,textAlign:'center'}}>{subHeading}</AppText>
       {
        data?.map((item)=>{
            
            return(
                <View style={{marginTop: 15,paddingVertical:10}}>
                    <DetailField title={item?.title} value={item?.value}/>
                </View>

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
viewTextStyle:{
    alignSelf:'center',
    paddingTop:20
},
blankView:{
backgroundColor:colors.forth,height:4,width:'40%',alignSelf:'center',marginTop:20,borderRadius:10
}
})
