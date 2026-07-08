import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { AppText, BOLD, FOURTEEN, MEDIUM, TWELVE } from '@components/AppText';
import { colors } from '@theme/colors';
import { blackDownArrow, downArrowIcon, upArrow } from '@helper/imagesAssets'; // Change according to your image names

interface Props {
  value: string;
  data: string[];
  onSelect: (item: string) => void;
}

const OrderStatusDropdown = ({ value, data, onSelect }: Props) => {
  const [visible, setVisible] = useState(false);
const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        activeOpacity={0.8}
        onPress={() => setVisible(!visible)}
      >
      <AppText
  weight={BOLD}
  type={TWELVE}
  style={{
    color: colors.buttonBg,
  }}
>
   {capitalize(value)}
</AppText>

        <Image
          source={visible ? upArrow : blackDownArrow}
          style={styles.arrow}
        />
      </TouchableOpacity>

      {visible && (
        <View style={styles.menu}>
          <FlatList
            data={data}
            keyExtractor={item => item}
            renderItem={({ item }) => {
              const isSelected = item === value;

              return (
                <TouchableOpacity
                  style={[styles.item, isSelected && styles.selectedItem]}
                  onPress={() => {
                    setVisible(false);
                    onSelect(item);
                  }}
                >
                  <AppText
                    weight={BOLD}
                    style={{
                      color: isSelected ? colors.buttonBg : colors.black,
                    }}
                  >
                    {capitalize(item)}
                  </AppText>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default OrderStatusDropdown;

const styles = StyleSheet.create({
container: {
  zIndex: 9999,
  elevation: 9999,
  position: 'relative',
},
dropdown: {
  width: 160,
  height: 50,
  borderWidth: 1,
  borderColor: '#E5E5E5',
  borderRadius: 10,
  backgroundColor: '#fff',
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

menu: {
  position: 'absolute',
  top: 55,
  left: 0,
  width: 160,

  backgroundColor: '#fff',
  borderRadius: 10,

  elevation: 12,
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 4,
  },

  zIndex: 99999,
},
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ECECEC',
  },

  selectedItem: {
    backgroundColor: '#F5F5F5',
  },

  arrow: {
    width: 15, 
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.black, 
  },
});
