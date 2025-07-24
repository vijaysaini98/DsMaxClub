import React, {forwardRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView} from 'react-native';
import { AppText, BOLD, EIGHTEEN, FOURTEEN, SEMI_BOLD, THIRD, TWENTY_EIGHT } from '@components/AppText';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';
import RenderHtml from 'react-native-render-html';



const ViewDetailsBottomSheet = ({data,ref}, ) => {
  
  console.log("data",data?.description);
const { width } = useWindowDimensions();

  
  return (
    <RBSheet
      ref={ref}
      useNativeDriver={false}
      height={650}
      closeOnDragDown={true}
      closeOnPressMask={true}
      draggable={true}
      customStyles={
        {
          container: {
        borderRadius:32
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
        }
      }>

      {/* <View style={commonStyles.marginHorizontal}> */}
 <ScrollView 
 showsVerticalScrollIndicator={false}
 style={[commonStyles.marginHorizontal,{marginTop:20}]}>
        <AppText type={TWENTY_EIGHT} weight={BOLD} style={ styles.viewTextStyle}>View Details</AppText>
        <AppText color={THIRD} type={EIGHTEEN} weight={SEMI_BOLD} style={{marginTop:20}}>{data?.heading}</AppText>
        <AppText color={THIRD} type={FOURTEEN}  style={{marginTop:20}}>{`No of Coupons:  ${data?.no_of_coupons}`}</AppText>
        <AppText color={THIRD} type={FOURTEEN}  style={{marginTop:20}}>{`Maximum Redeem:  ${data?.maximum_redeem}`}</AppText>
        <AppText color={THIRD} type={FOURTEEN} style={{marginTop:20,marginBottom:5}}>{"Description: "} </AppText>
        <AppText color={THIRD} type={FOURTEEN}>{data?.description}</AppText>
         {/* <RenderHtml
      contentWidth={width}
source={{html:data?.description}}
 tagsStyles={{
    h2: { fontSize: 24, fontWeight: 'bold', color: 'green' },
    p: { marginBottom: 8, color: 'red' },
    a: { color: 'blue' ,textDecorationLine:'underline'},
  }}
    /> */}
    </ScrollView>
        {/* <AppText type={FOURTEEN} style={{color:colors.buttonText,marginTop:30}}>Valid till 31 July 2025*</AppText> */}
       {/* </View> */}
    </RBSheet>
  );
};

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
