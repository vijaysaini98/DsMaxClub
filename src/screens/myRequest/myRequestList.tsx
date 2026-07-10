
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import {
  AppText,
  BOLD,
  BUTTON_TEXT,
  MEDIUM,
  TWELVE,
} from '@components/AppText';

import { colors } from '@theme/colors';
import { ms, s, vs } from 'react-native-size-matters/extend';

import { IMGE_URL } from '@services/config';
import { defaultBookletImage } from '@helper/imagesAssets';
import moment from 'moment';

const BookletList = ({ data }: { data: any[] }) => {

    const [imageError, setImageError] = useState(false);
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approve':
      case 'completed':
        return {
          bg: '#E8F7EE',
          color: '#1AA053',
          label: 'Payment Success',
        };

      case 'pending':
        return {
          bg: '#FFF4DD',
          color: '#F59E0B',
          label: 'Payment Pending',
        };

      default:
        return {
          bg: '#FDECEC',
          color: '#DC2626',
          label: 'Payment Failed',
        };
    }
  };

  const renderItem = ({ item }: any) => {
    console.log(item,'item in booklet list');
    console.log(item?.booklet,'item?.booklet in booklet list');
    
    
    const status = getStatusStyle(item?.status);

    return (

<View style={styles.card}>
  <Image
    source={
      !imageError && item?.booklet
        ? { uri: IMGE_URL + item.booklet }
        : defaultBookletImage
    }
    style={styles.image}
    onError={() => setImageError(true)}
  />

  <View style={styles.center}>
    <AppText
      weight={BOLD}
      style={styles.title}>
      {item?.name}
    </AppText>

    <AppText color={BUTTON_TEXT} style={styles.date}>
      Valid {moment(item?.start_date).format('D MMMM YYYY')} -{' '}
      {moment(item?.end_date).format('D MMMM YYYY')}
    </AppText>

    {/* Code & Status Row */}
    <View style={styles.bottomRow}>
      <View style={styles.codeRow}>
        <AppText type={TWELVE} weight={BOLD}>
          Code:
        </AppText>

        <AppText type={TWELVE}>
          {' '}
          {item?.unique_code}
        </AppText>
      </View>

      <View
        style={[
          styles.status,
          {
            backgroundColor: status.bg,
          },
        ]}>
        <AppText
          style={{
            color: status.color,
            fontSize: 11,
          }}>
          {item?.status
            ? item.status.charAt(0).toUpperCase() +
              item.status.slice(1).toLowerCase()
            : '--'}
        </AppText>
      </View>
    </View>
  </View>
</View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
       keyExtractor={(item, index) =>
    `${item.uuid}-${index}`
  }
      scrollEnabled={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 16 }} />
      )}
    />
  );
};

export default BookletList;


const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: ms(18),
    padding: s(14),
    flexDirection: 'row',
    alignItems: 'flex-start', // Changed from center
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  image: {
   width: 72,
  height: 72,
  borderRadius: 14,
  backgroundColor: colors.white,
  },

  center: {
    flex: 1,
    marginLeft: s(14),
    minWidth: 0, // Important for text wrapping
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 16,
    color: colors.buttonBg,
    flexShrink: 1,
    flexWrap: 'wrap',
    lineHeight: 22,
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    flexWrap: 'wrap',
  },

  status: {
  paddingHorizontal: 12,
  paddingVertical: 5,
  borderRadius: 8,
  marginLeft: 10,
  },

  right: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: s(10),
  },

  price: {
    color: colors.buttonBg,
  },

  codeRow: {
     flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  },
  bottomRow: {
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
});