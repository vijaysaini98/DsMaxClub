// import {
//   View,
//   FlatList,
//   RefreshControl,
//   TouchableOpacity,
//   Image
// } from 'react-native';

// import React, {
//   useCallback,
//   useEffect,
//   useState,
//   useMemo
// } from 'react';

// import DatePicker from 'react-native-date-picker';

// import { AppSafeAreaView } from '@components/AppSafeAreaView';
// import { commonStyles } from '@theme/commonStyles';
// import styles from './styles';

// import ToolBar from '@components/ToolBar';
// import Input from '@components/Input';
// import ReportCard from './reportCard';

// import { searchIcon, filterIcon } from '@helper/imagesAssets';
// import { colors } from '@theme/colors';

// import { useAppDispatch, useAppSelector } from '@redux/hooks';
// import { getReportList } from '@actions/home/homeAction';
// import ListEmptyComponent from '@components/ListEmptyComponent';

// const ReportScreen = () => {

//   const dispatch = useAppDispatch();
//   const { reportCouponList } = useAppSelector(state => state?.home);

//   const [refreshing, setRefreshing] = useState(false);
//   const [searchText, setSearchText] = useState('');

//   const [openDatePicker, setOpenDatePicker] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);

//   /**
//    * INITIAL API CALL
//    */
//   useEffect(() => {
//     dispatch(getReportList());
//   }, []);

//   /**
//    * STOP REFRESH LOADER
//    */
//   useEffect(() => {
//     if (refreshing) {
//       setRefreshing(false);
//     }
//   }, [reportCouponList]);

//   /**
//    * PULL TO REFRESH
//    */
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     dispatch(getReportList());
//   }, [dispatch]);

//   /**
//    * FILTER DATA (SEARCH + DATE)
//    */
//   const filteredData = useMemo(() => {

//     let list = reportCouponList?.data || [];

//     /** SEARCH FILTER */
//     if (searchText) {
//       list = list.filter(item => {

//         const name = item?.user_name?.toLowerCase() || '';
//         const mobile = item?.user_mobile?.toString() || '';

//         return (
//           name.includes(searchText.toLowerCase()) ||
//           mobile.includes(searchText)
//         );
//       });
//     }

//     /** DATE FILTER */
//     if (selectedDate) {

//       const selected = new Date(selectedDate).toDateString();

//       list = list.filter(item => {

//         if (!item?.valid_till) return false;

//         const itemDate = new Date(item.valid_till).toDateString();

//         return itemDate === selected;
//       });
//     }

//     return list;

//   }, [searchText, reportCouponList, selectedDate]);

//   return (
//     <AppSafeAreaView style={commonStyles.mainContainer}>
//       <View style={styles.containerStyle}>

//         <ToolBar isLeftIcon title={'Report'} />

//         {/* SEARCH + FILTER */}
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginTop: 30
//           }}
//         >

//           <View style={{ flex: 1 }}>
//             <Input
//             //   leftIcon={searchIcon}
//               placeholder="Search by username, mobile..."
//               placeholderTextColor={colors.placeholder}
//               value={searchText}
//               onChangeText={text => setSearchText(text)}
//               inputContainerStyle={styles.searchContainer}
//             />
//           </View>

//           {/* FILTER ICON */}
//           <TouchableOpacity
//             onPress={() => setOpenDatePicker(true)}
//             style={{ marginLeft: 10 }}
//           >
//             <Image
//               source={filterIcon}
//               style={{
//                 width: 30,
//                 height: 20,
//                 resizeMode: 'contain'
//               }}
//             />
//           </TouchableOpacity>

//         </View>

//         {/* REPORT LIST */}
//         <FlatList
//           data={filteredData}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({ item }) => <ReportCard item={item} />}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingTop: 30,
//             paddingBottom: 100
//           }}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[colors.buttonBg]}
//               tintColor={colors.buttonBg}
//             />
//           }

//   ListEmptyComponent={
//     <ListEmptyComponent
//       title="No Data Found"
//       containerStyle={{ marginTop: 80 }}
//     />
//   }
//         />

//         {/* DATE PICKER */}
//         <DatePicker
//           modal
//           open={openDatePicker}
//           date={date}
//           mode="date"
//           onConfirm={(selected) => {

//             setOpenDatePicker(false);
//             setDate(selected);
//             setSelectedDate(selected);

//           }}
//           onCancel={() => {
//             setOpenDatePicker(false);
//           }}
//         />

//       </View>
//     </AppSafeAreaView>
//   );
// };

// export default ReportScreen;

import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';

import React, { useCallback, useEffect, useState, useMemo } from 'react';

import DatePicker from 'react-native-date-picker';

import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import styles from './styles';

import ToolBar from '@components/ToolBar';
import Input from '@components/Input';
import ReportCard from './reportCard';
import ListEmptyComponent from '@components/ListEmptyComponent';

import { filterIcon } from '@helper/imagesAssets';
import { colors } from '@theme/colors';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getReportList } from '@actions/home/homeAction';

import { AppText, BOLD, SIXTEEN } from '@components/AppText';

const ReportScreen = () => {
  const dispatch = useAppDispatch();
  const { reportCouponList } = useAppSelector(state => state?.home);
  // console.log(reportCouponList, 'report coupon list =======>');

  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [openFilter, setOpenFilter] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [tempStartDate, setTempStartDate] = useState(new Date());
  const [tempEndDate, setTempEndDate] = useState(new Date());

  const today = new Date();

  useEffect(() => {
    dispatch(getReportList());
  }, []);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }
  }, [reportCouponList]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getReportList());
  }, [dispatch]);

  /**
   * FILTER LOGIC
   */
  const filteredData = useMemo(() => {
    let list = reportCouponList?.data || [];

    // SEARCH FILTER
    if (searchText) {
      list = list.filter((item: any) => {
        const name = item?.user_name?.toLowerCase() || '';
        const mobile = item?.user_mobile?.toString() || '';

        return (
          name.includes(searchText.toLowerCase()) || mobile.includes(searchText)
        );
      });
    }

    // DATE RANGE FILTER
    if (startDate && endDate) {
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      const end = new Date(endDate).setHours(23, 59, 59, 999);

      list = list.filter((item: any) => {
        if (!item?.redeem_date) return false;

        const itemDate = new Date(item.redeem_date).setHours(0, 0, 0, 0);

        return itemDate >= start && itemDate <= end;
      });
    }

    return list;
  }, [searchText, reportCouponList, startDate, endDate]);

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <View style={styles.containerStyle}>
        <ToolBar isLeftIcon title={'Report'} />

        {/* SEARCH + FILTER */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          <View style={{ flex: 1 }}>
            <Input
              placeholder="Search by username, mobile..."
              placeholderTextColor={colors.placeholder}
              value={searchText}
              onChangeText={text => setSearchText(text)}
              inputContainerStyle={styles.searchContainer}
            />
          </View>

          <TouchableOpacity
            onPress={() => setOpenFilter(true)}
            style={{ marginLeft: 10 }}
          >
            <Image
              source={filterIcon}
              style={{
                width: 30,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* SHOW SELECTED DATE RANGE */}
        {startDate && endDate && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 10,
              alignItems: 'center',
            }}
          >
            <AppText type={SIXTEEN}>
              {`${new Date(startDate).toLocaleDateString()} - ${new Date(
                endDate,
              ).toLocaleDateString()}`}
            </AppText>

            <TouchableOpacity
              onPress={() => {
                setStartDate(null);
                setEndDate(null);
              }}
              style={{ marginLeft: 15 }}
            >
              <AppText type={SIXTEEN} weight={BOLD} color={colors.buttonBg}>
                Reset
              </AppText>
            </TouchableOpacity>
          </View>
        )}

        {/* LIST */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ReportCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 30,
            paddingBottom: 100,
            flexGrow: 1,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
          ListEmptyComponent={
            <ListEmptyComponent
              title="No Data Found"
              containerStyle={{ marginTop: 80 }}
            />
          }
        />

        {/* FILTER MODAL */}
        <Modal visible={openFilter} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                margin: 20,
                borderRadius: 10,
                padding: 20,
              }}
            >
              <AppText type={SIXTEEN} weight={BOLD}>
                Start Date
              </AppText>

              <DatePicker
                date={tempStartDate}
                mode="date"
                maximumDate={today}
                onDateChange={date => {
                  setTempStartDate(date);

                  if (date > tempEndDate) {
                    setTempEndDate(date);
                  }
                }}
              />

              <AppText type={SIXTEEN} weight={BOLD} style={{ marginTop: 10 }}>
                End Date
              </AppText>

              <DatePicker
                date={tempEndDate}
                mode="date"
                minimumDate={tempStartDate}
                maximumDate={today}
                onDateChange={setTempEndDate}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setStartDate(null);
                    setEndDate(null);
                    setOpenFilter(false);
                  }}
                >
                  <AppText weight={BOLD}>Reset</AppText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOpenFilter(false)}>
                  <AppText weight={BOLD}>Cancel</AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (tempStartDate > tempEndDate) {
                      Alert.alert('End date cannot be before start date');
                      return;
                    }

                    setStartDate(tempStartDate);
                    setEndDate(tempEndDate);
                    setOpenFilter(false);
                  }}
                >
                  <AppText weight={BOLD} color={colors.buttonBg}>
                    Apply
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </AppSafeAreaView>
  );
};

export default ReportScreen;
