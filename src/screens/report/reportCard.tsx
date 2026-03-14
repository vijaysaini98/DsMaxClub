import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';

const ReportCard = ({ item }:any) => {
    console.log(item,'itemmmmmmmms');
    
  return (
    <View style={styles.card}>

      <View style={styles.row}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{item?.user_name}</Text>
{item?.user_mobile ? (
  <>
    <Text style={[styles.label, { marginLeft: 20 }]}>Mobile:</Text>
    <Text style={styles.value}>{item?.user_mobile}</Text>
  </>
) : null}
       
      </View>

      <Text style={styles.text}>
        <Text style={styles.label}>Coupon Code: </Text>
        {item?.generated_code}
      </Text>

      <View style={styles.statusRow}>
        <View style={styles.redeemedBtn}>
          <Text style={styles.redeemedText}>Redeemed</Text>
        </View>

        <Text style={styles.offerText}>{item.offerName}</Text>
      </View>

 <Text style={styles.text}>
        <Text style={styles.label}>Heading: </Text>
        {item?.heading}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Short Description: </Text>
        {item?.short_desc}
      </Text>
      {/* <Text style={styles.text}>
        <Text style={styles.label}>Total Coupons: </Text>
        {item?.total_coupons}
      </Text>

      <Text style={styles.text}>
        <Text style={styles.label}>Used Coupons: </Text>
        {item.used_coupons}
      </Text> */}

      {/* <Text style={styles.text}>
        <Text style={styles.label}>Description: </Text>
        {item.description || '-'}
      </Text> */}

      {/* <Text style={styles.text}>
        <Text style={styles.label}>Date: </Text>
        {item?.valid_till}
      </Text> */}

    </View>
  );
};

export default ReportCard;


const styles = StyleSheet.create({  

    card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  label: {
    fontWeight: '600',
    color: '#000',
  },

  value: {
    color: '#333',
    marginLeft: 4,
  },

  text: {
    marginTop: 5,
    color: '#333',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  redeemedBtn: {
    backgroundColor: colors.buttonBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 10,
  },

  redeemedText: {
    color: '#fff',
    fontSize: 12,
  },

  offerText: {
    flex: 1,
    color: '#000',
  },
})