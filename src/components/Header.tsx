import { useRef, useState } from "react";
import CityDropDown, { CityOption } from "./cityDropDown";
import { cities } from "@helper/dumyData";
import { Image, StyleSheet, View } from "react-native";
import { AppText, BOLD, SIXTEEN, THIRTEEN } from "./AppText";
import TouchableOpacityView from "./TouchableOpacityView";
import { downArrowIcon, locationIcon } from "@helper/imagesAssets";
import { colors } from "@theme/colors";
import { useAppSelector } from "@redux/hooks";

interface HeaderProps {
  userName?: string;
  city?: string;
}

const Header: React.FC<HeaderProps> = ({ userName, city, }) => {

  const { userData, cityList } = useAppSelector((state) => state.auth)
  const bottomSheetRef = useRef<RBSheet>(null);

  const [selectedCity, setSelectedCity] = useState<CityOption>(userData?.city_name);
  const [searchCityText, setSearchCityText] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<CityOption[]>(cityList);

  const openBottomSheet = () => {
    setSearchCityText('');
    setFilteredLocations(cityList);
    bottomSheetRef.current?.open();
  };

  const handleSearch = (text: string) => {
    setSearchCityText(text);
    const filtered = cityList.filter((location) =>
      location?.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const selectLocation = (location) => {
    setSelectedCity(location?.name);
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.nameContainer} >
          <AppText type={SIXTEEN}>Hello!</AppText>
          <AppText
            numberOfLines={2}
            type={SIXTEEN} weight={BOLD}>
            {userData?.name?.charAt(0)?.toUpperCase() + userData?.name?.slice(1).toLowerCase() || "UserName"}
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
          <AppText type={selectedCity ?  SIXTEEN: THIRTEEN}
            numberOfLines={1}
            style={styles.cityText}
            color={!selectedCity ?? colors.placeholder}
            >
            {selectedCity || "Select your city"}
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
  )
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    width: "50%"
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: "50%",
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  cityText: {
    marginRight: 6,
    maxWidth: "60%"
  },
  downArrowIcon: {
    width: 20,
    height: 8,
    tintColor: colors.placeholder,
  },
})