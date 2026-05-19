import React, { useCallback, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { colors } from "@theme/colors";
import { AppText, EIGHTEEN, FOURTEEN, SEMI_BOLD, SIXTEEN, TWELVE, WHITE } from "@components/AppText";
import { ms, s, vs } from "react-native-size-matters/extend";

type HotelBottomSheetProps = {
  snapPoints: string[];
  onDismiss?: () => void;
  onClose: () => void;
  onDone?: (data: { rooms: number; adults: number; childern: number }) => void;
};

const dataNumbers = Array.from({ length: 6 }, (_, i) => ({
  label: String(i + 1).padStart(2, "0"),
  value: i + 1,
}));

const dataChildren = Array.from({ length: 5 }, (_, i) => ({
  label: String(i),
  value: i,
}));

const HotelBottomSheet = ({ snapPoints, onClose, onDone, onDismiss, bottomSheetRef, rooms }) => {
  const [state, setState] = useState({
    rooms: 1,
    adults: 1,
    childern: 0,
  });

  const handleDone = () => {
    if (onDone) onDone(state);
    onClose();
    bottomSheetRef?.current?.close();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onDismiss={onDismiss}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.container}>
        <AppText
          type={EIGHTEEN}
          weight={SEMI_BOLD}
          style={styles.title}>{rooms ? "Select Rooms and Guests" : "Select no of Person"} </AppText>

        {/* Rooms */}
        {rooms &&
          <View style={styles.row}>
            <AppText type={SIXTEEN} weight={SEMI_BOLD} >Rooms</AppText>
            <Dropdown
              style={styles.dropdown}
              data={dataNumbers}
              labelField="label"
              valueField="value"
              value={state.rooms}
              dropdownPosition="top"
              onChange={(item) => setState({ ...state, rooms: item.value })}
            />
          </View>}

        {/* Adults */}
        <View style={styles.row}>
          <AppText type={SIXTEEN} weight={SEMI_BOLD} >Adults</AppText>
          <Dropdown
            style={styles.dropdown}
            data={dataNumbers}
            labelField="label"
            valueField="value"
            dropdownPosition="top"
            value={state.adults}
            onChange={(item) => setState({ ...state, adults: item.value })}
          />
        </View>

        {/* Children */}
        {/* <View style={styles.row}>
          <AppText type={SIXTEEN} weight={SEMI_BOLD} >Children</AppText>
          
          <Dropdown
            style={styles.dropdown}
            data={dataChildren}
            labelField="label"
            valueField="value"
            dropdownPosition="top"
            value={state.childern}
            onChange={(item) => setState({ ...state, childern: item.value })}
          />
        </View>
        <AppText type={TWELVE} >(Below 12 years)</AppText> */}
        <View style={[styles.row, { alignItems: 'flex-start' }]}>
  <View style={{ flex: 1 }}>
    <AppText type={SIXTEEN} weight={SEMI_BOLD}>
      Children
    </AppText>

    <AppText type={TWELVE}>
      (Below 12 years)
    </AppText>
  </View>

  <Dropdown
    style={styles.dropdown}
    data={dataChildren}
    labelField="label"
    valueField="value"
    dropdownPosition="top"
    value={state.childern}
    onChange={(item) =>
      setState({ ...state, childern: item.value })
    }
  />
</View>

        {/* Done Button */}
        <TouchableOpacity style={styles.button} onPress={handleDone}>
          <AppText type={SIXTEEN} weight={SEMI_BOLD} color={WHITE}>SAVE</AppText>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: ms(16),
    borderTopRightRadius: ms(16),
    paddingHorizontal: s(16),
  },
  title: {
    marginBottom: vs(20),
    textAlign: 'center'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(15),
  },
  dropdown: {
    width: s(120),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: ms(8),
    paddingHorizontal: s(8),
    height: vs(40),
  },
  button: {
    backgroundColor: colors.buttonBg,
    padding: ms(15),
    borderRadius: ms(8),
    alignItems: "center",
    marginTop: vs(20),
  },
  handleIndicator: {
    backgroundColor: colors.buttonBg,
  },
});

export default HotelBottomSheet;
