import { useRef, useState } from "react";
import CityDropDown, { CityOption } from "./cityDropDown";
import { cities } from "@helper/dumyData";
import { Image, StyleSheet, View } from "react-native";
import { AppText, BOLD, SIXTEEN } from "./AppText";
import TouchableOpacityView from "./TouchableOpacityView";
import { downArrowIcon, locationIcon } from "@helper/imagesAssets";
import { colors } from "@theme/colors";

interface HeaderProps {
  userName: string;
  city?: string;
}

const Header: React.FC<HeaderProps> = ({ userName, city, }) => {

  const bottomSheetRef = useRef<RBSheet>(null);

  const [selectedCity, setSelectedCity] = useState<CityOption>(cities[0]);
  const [searchCityText, setSearchCityText] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<CityOption[]>(cities);

  const openBottomSheet = () => {
  setSearchCityText('');
    setFilteredLocations(cities);
    bottomSheetRef.current?.open();
  };

  const handleSearch = (text: string) => {
    setSearchCityText(text);
    const filtered = cities.filter((location) =>
      location.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const selectLocation = (location: CityOption) => {
    setSelectedCity(location);
    bottomSheetRef.current?.close();
  };

  return(
  <>
  <View style={styles.headerContainer}>
    <View>
      <AppText type={SIXTEEN}>Hello!</AppText>
      <AppText type={SIXTEEN} weight={BOLD}>
        {userName}
      </AppText>
    </View>
    <TouchableOpacityView
      style={styles.locationContainer}
      onPress={openBottomSheet}
    >
      <Image
        source={locationIcon}
        style={styles.locationIcon}
        resizeMode="contain"
      />
      <AppText type={SIXTEEN} style={styles.cityText}>
        {city ? city : selectedCity?.label}
        
      </AppText>
      <Image
        source={downArrowIcon}
        style={styles.downArrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacityView>
  </View>
  <CityDropDown
        bottomSheetRef={bottomSheetRef}
        value={searchCityText}
        handleSearch={handleSearch}
        data={filteredLocations}
        handleSelectOption={selectLocation}
      />
      </>
)};

export default Header;

const styles =StyleSheet.create({
    headerContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  cityText: {
    marginRight: 6,
  },
  downArrowIcon: {
    width: 20,
    height: 8,
    tintColor: colors.placeholder,
  },
})