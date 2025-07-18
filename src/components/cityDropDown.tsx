import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
  ListRenderItemInfo,
} from 'react-native';
import { AppText, THIRTEEN } from './AppText';
import TouchableOpacityView from './TouchableOpacityView';
import { colors } from '@theme/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import Input from './Input';

export interface CityOption {
  label: string;
  value: string;
}

export interface CityDropDownProps {
  bottomSheetRef: React.RefObject<RBSheet>;
  value: string;
  handleSearch: (text: string) => void;
  data: CityOption[];
  handleSelectOption: (item: CityOption) => void;
}

const CityDropDown: React.FC<CityDropDownProps> = ({
  bottomSheetRef,
  value,
  handleSearch,
  data,
  handleSelectOption,
}) => {
  return (
    <RBSheet
      ref={bottomSheetRef}
      height={600}
      openDuration={250}
      closeOnDragDown={true}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 16,
          paddingTop: 20,
        },
      }}
    >
      <View style={styles.container}>
        <Input
          placeholder="Search city..."
          value={value}
          onChangeText={handleSearch}
          placeholderTextColor={colors.placeholder}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.value}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({ item,index }: ListRenderItemInfo<CityOption>) => (
            <TouchableOpacityView
            key={index}
              onPress={() => handleSelectOption(item)}
              style={styles.option}
            >
              <AppText
               type={THIRTEEN}>{item.name}</AppText>
            </TouchableOpacityView>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <AppText>No City Available</AppText>
            </View>
          )}
        />
      </View>
    </RBSheet>
  );
};

export default CityDropDown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical:20,
  },
})