import { colors } from "@theme/colors";
import { Image, StyleSheet, View } from "react-native";
import { AppText, ERROR_TEXT, MEDIUM, THIRTEEN, TWELVE } from "./AppText";
import { Dropdown } from "react-native-element-dropdown";
import { downArrowIcon } from "@helper/imagesAssets";
import { ms, vs, s } from "react-native-size-matters";

const DropdownComponent = ({
  xyz,
  isFocus,
  onFocus,
  onBlur,
  onChange,
  placeholder,
  data,
  customPlaceholderStyle,
  dropdownPosition,
  title,
  required,
  mainContainer,
}: any) => {
  return (
    <View style={[styles.container, mainContainer]}>
      {title && (
        <AppText type={THIRTEEN} weight={MEDIUM}>
          {title}
          {required && (
            <AppText
              type={TWELVE}
              weight={MEDIUM}
              color={ERROR_TEXT}
            >
              {" *"}
            </AppText>
          )}
        </AppText>
      )}

      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.buttonBg }]}
        placeholderStyle={[styles.placeholderStyle, customPlaceholderStyle]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={vs(250)}
        labelField="name"   // ✅ Match your data keys
        valueField="id"     // ✅ Match your data keys
        placeholder={placeholder}
        dropdownPosition={dropdownPosition}
        searchPlaceholder="Search..."
        itemTextStyle={{ color: colors.black, fontSize: ms(14) }}
        value={xyz}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        renderRightIcon={() => (
          <Image
            source={downArrowIcon}
            resizeMode="contain"
            style={styles.icon}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    gap: vs(5),
    width: "100%",
  },
  dropdown: {
    height: vs(50),
    borderColor: colors.borderColor,
    borderWidth: ms(1),
    borderRadius: ms(12),
    paddingHorizontal: s(16),
    width: "100%",
  },
  icon: {
    width: ms(18),
    height: ms(10),
  },
  placeholderStyle: {
    fontSize: ms(14),
    color: colors.placeholder,
  },
  selectedTextStyle: {
    fontSize: ms(15),
    color: colors.black,
  },
  iconStyle: {
    width: ms(20),
    height: ms(20),
  },
  inputSearchStyle: {
    height: vs(40),
    fontSize: ms(14),
  },
});

