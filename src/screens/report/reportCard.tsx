import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { AppText, BOLD, FOURTEEN, TWELVE } from '@components/AppText';

const ReportCard = ({ item }: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <AppText weight={BOLD} type={FOURTEEN}>
          Username:
        </AppText>
        <AppText style={styles.value} type={FOURTEEN}>
          {item?.user_name}({item?.booklet_code})
        </AppText>

        {item?.user_mobile && (
          <>
            <AppText style={[styles.label, { marginLeft: 20 }]}>
              Mobile:
            </AppText>

            <AppText style={styles.value}>{item?.user_mobile}</AppText>
          </>
        )}
      </View>

      <AppText style={styles.text} type={FOURTEEN}>
        <AppText style={styles.label} type={FOURTEEN}>
          Coupon Code:{' '}
        </AppText>
        {item?.generated_code}
      </AppText>

      <AppText style={styles.text} type={FOURTEEN} weight={BOLD}>
        {item?.heading}
      </AppText>

      <AppText style={styles.text} type={TWELVE}>
        {item?.short_desc}
      </AppText>

      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
      >
        <AppText weight={BOLD} type={FOURTEEN}>
          Redeemed Date:
        </AppText>
        <AppText style={styles.value} type={FOURTEEN}>
          {item?.redeem_date?.split(' ')[0]}
        </AppText>
      </View>

      {/* BUTTON ROW */}
      <View style={styles.buttonRow}>
        {/* FREE BUTTON (API BASED) */}
        {item?.coupon_type_id === 1 && (
          <View style={styles.freeBtn}>
            <AppText style={styles.freeText}>Free</AppText>
          </View>
        )}

        {/* REDEEMED BUTTON (STATIC) */}
        <View style={styles.redeemedBtn}>
          <AppText style={styles.redeemedText}>Redeemed</AppText>
        </View>
      </View>
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  freeBtn: {
    backgroundColor: colors.buttonBg,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 10,
  },

  freeText: {
    color: '#fff',
    fontSize: 12,
  },

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
    // marginBottom: 6,
  },

  label: {
    // fontWeight: '600',
    color: '#000',
    marginLeft: 7,
  },

  value: {
    color: '#333',
    marginLeft: 7,
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
    backgroundColor: colors.red,
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
});
