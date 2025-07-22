import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { colors } from '@theme/colors';
import Header from '@components/Header';
import Card from '@screens/home/ui/card';
import CommonCard from '@components/CommonCard';
import { cardDummyData } from '@helper/dumyData';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import ViewDetailsBottomSheet from './viewDetailsBottomSheet';

const Deal = () => {
  const ViewDetailsSheet = useRef();
  const onViewPress = () => {
    ViewDetailsSheet.current.open();
  };

  const renderItem = ({ item }) => {
    return (
      //  <View style={{paddingVertical:10}}>
      <CommonCard
        key={item.id}
        data={item}
        // showRedeemBtn={item.status === 'Active'}
        onViewPress={() => onViewPress()}
        onRedeemPress={() => console.log('Redeem Pressed:', item.id)}
      />
      // </View>
    );
  };
  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header userName="Anil Kumawat" />

      <FlatList
        data={cardDummyData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        // numColumns={3}

        contentContainerStyle={{ paddingVertical: 20, gap: 10 }}
        showsVerticalScrollIndicator={false}
      />

     

      <ViewDetailsBottomSheet ref={ViewDetailsSheet} />
    </AppSafeAreaView>
  );
};

export default Deal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 40,
  },
});
