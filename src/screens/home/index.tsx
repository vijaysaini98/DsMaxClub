import React, { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { AppText, BOLD, BUTTON_TEXT, SEMI_BOLD, SIXTEEN, TWENTY_TWO } from '@components/AppText';
import { colors } from '@theme/colors';
import { downArrowIcon, locationIcon, searchIcon } from '@helper/imagesAssets';
import { cities } from '@helper/dumyData';
import TouchableOpacityView from '@components/TouchableOpacityView';
import CityDropDown, { CityOption } from '@components/cityDropDown';
import RBSheet from 'react-native-raw-bottom-sheet';
import Input from '@components/Input';

interface HomeHeaderProps {
  handleOnPress: () => void;
  userName: string;
  city: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ handleOnPress, userName, city }) => (
  <View style={styles.headerContainer}>
    <View>
      <AppText type={SIXTEEN}>Hello!</AppText>
      <AppText type={SIXTEEN} weight={BOLD}>
        {userName}
      </AppText>
    </View>
    <TouchableOpacityView
      style={styles.locationContainer}
      onPress={handleOnPress}
    >
      <Image
        source={locationIcon}
        style={styles.locationIcon}
        resizeMode="contain"
      />
      <AppText type={SIXTEEN} style={styles.cityText}>
        {city}
      </AppText>
      <Image
        source={downArrowIcon}
        style={styles.downArrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacityView>
  </View>
);

const Home: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityOption>(cities[0]);
  const [searchCityText, setSearchCityText] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<CityOption[]>(cities);
  const [searchText,setSeachText] = useState<string>('');

  const bottomSheetRef = useRef<RBSheet>(null);

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

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <HomeHeader
        handleOnPress={openBottomSheet}
        city={selectedCity?.label}
        userName="Anil Kumawat"
      />
      <View style={{paddingHorizontal:16,marginTop:8}}>
      <Input
      leftIcon={searchIcon}
      placeholder='Search...'
      placeholderTextColor={colors.placeholder}
     value= {searchText}
     onChangeText={(text)=> setSeachText(text)}
      />
      </View>
      <ScrollView>
        <View style={{paddingVertical:18}}>
            <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',paddingHorizontal:16}}>
                <AppText type={TWENTY_TWO} weight={SEMI_BOLD}>Categories</AppText>
                <TouchableOpacityView>
                    <AppText type={SIXTEEN} color={BUTTON_TEXT}>See All</AppText>
                </TouchableOpacityView>
                
            </View>
        </View>
      </ScrollView>
      <CityDropDown
        bottomSheetRef={bottomSheetRef}
        value={searchCityText}
        handleSearch={handleSearch}
        data={filteredLocations}
        handleSelectOption={selectLocation}
      />
    </AppSafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 40,
  },
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
});