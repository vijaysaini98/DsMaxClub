import {StyleSheet, View} from 'react-native';
import {commonStyles} from '../theme/commonStyles';
import {AppText, SEMI_BOLD, SIXTEEN} from './AppText';
import {DetailFieldProps} from '../types/common';
import React from 'react';
const DetailField = ({
  title,
  containerStyle,
  value,
  titleStyle,
  valueStyle,
}: DetailFieldProps) => {
  return (
    <View
      style={[
        commonStyles.flexDirectionRow,
        containerStyle,
        {flex: 1, marginVertical: 2, flexWrap: 'wrap',justifyContent:'space-between'},
      ]}>
      <AppText type={SIXTEEN} >
        {title}
      </AppText>
      <AppText
        type={SIXTEEN}
        weight={SEMI_BOLD}
        
        numberOfLines={2}>
        {value}
      </AppText>
    </View>
  );
};

export default DetailField;

const styles = StyleSheet.create({
//   titleStyle: {flex: 0.6},
//   valueStyle: {flex: 1},
});
