import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { colors } from '@theme/colors'
import Header from '@components/Header'
import Card from '@screens/home/ui/card'
import CommonCard from '@components/CommonCard'
import { cardDummyData } from '@helper/dumyData'
import ViewDetailsBottomSheet from '@screens/home/ui/viewDetailsBottomSheet'

const Deal = () => {
    const ViewDetailsSheet = useRef();
  const onViewPress=()=>{
 ViewDetailsSheet.current.open();
  }
  return (
   <View style={styles.mainContainer}>
      <Header userName="Anil Kumawat" />
     
              {cardDummyData.map(item => {
  return (
    <View style={{paddingVertical:10}}>
    <CommonCard
      key={item.id}
      data={item}
      // showRedeemBtn={item.status === 'Active'}
      onViewPress={() => onViewPress()}
      onRedeemPress={() => console.log('Redeem Pressed:', item.id)}
    />
    </View>
  );
})}
            
            <ViewDetailsBottomSheet ref={ViewDetailsSheet} />
    </View>
  )
}

export default Deal

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: 40,
    }
})