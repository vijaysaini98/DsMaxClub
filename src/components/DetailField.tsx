import { StyleSheet, View } from 'react-native';
import { AppText, FOURTEEN, SEMI_BOLD } from './AppText';
import { DetailFieldProps } from '../types/common';
import React from 'react';
const DetailField = ({
  title,
  containerStyle,
  value,
}: DetailFieldProps) => {
  return (
    <View
      style={[
        containerStyle,
        styles.containerStyle,
      ]}>
      <AppText type={FOURTEEN} >
        {title}
      </AppText>
      <AppText
        type={FOURTEEN}
        weight={SEMI_BOLD}
        numberOfLines={2}
        style={styles.rightTextStyle}
      >
        {value}
      </AppText>
    </View>
  );
};

export default DetailField;

const styles = StyleSheet.create({
  //   titleStyle: {flex: 0.6},
  //   valueStyle: {flex: 1},
  rightTextStyle: {
    width: "60%",
    textAlign: 'right'
  },
  containerStyle: {
    marginVertical: 10,
    // paddingHorizontal:s(16),
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
  }

});
