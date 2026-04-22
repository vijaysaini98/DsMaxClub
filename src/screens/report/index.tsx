// import {
//   View,
//   FlatList,
//   RefreshControl,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Alert,
// } from 'react-native';

// import React, { useCallback, useEffect, useState, useMemo } from 'react';

// import DatePicker from 'react-native-date-picker';

// import { AppSafeAreaView } from '@components/AppSafeAreaView';
// import { commonStyles } from '@theme/commonStyles';
// import styles from './styles';

// import ToolBar from '@components/ToolBar';
// import Input from '@components/Input';
// import ReportCard from './reportCard';
// import ListEmptyComponent from '@components/ListEmptyComponent';

// import { filterIcon } from '@helper/imagesAssets';
// import { colors } from '@theme/colors';

// import { useAppDispatch, useAppSelector } from '@redux/hooks';
// import { getReportList } from '@actions/home/homeAction';

// import { AppText, BOLD, SIXTEEN } from '@components/AppText';

// const ReportScreen = () => {
//   const dispatch = useAppDispatch();
//   const { reportCouponList } = useAppSelector(state => state?.home);
//   // console.log(reportCouponList, 'report coupon list =======>');

//   const [refreshing, setRefreshing] = useState(false);
//   const [searchText, setSearchText] = useState('');

//   const [openFilter, setOpenFilter] = useState(false);

//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const [tempStartDate, setTempStartDate] = useState(new Date());
//   const [tempEndDate, setTempEndDate] = useState(new Date());

//   const today = new Date();

//   useEffect(() => {
//     dispatch(getReportList());
//   }, []);

//   useEffect(() => {
//     if (refreshing) {
//       setRefreshing(false);
//     }
//   }, [reportCouponList]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     dispatch(getReportList());
//   }, [dispatch]);

//   /**
//    * FILTER LOGIC
//    */
//   const filteredData = useMemo(() => {
//     let list = reportCouponList?.data || [];

//     // SEARCH FILTER
//     if (searchText) {
//       list = list.filter((item: any) => {
//         const name = item?.user_name?.toLowerCase() || '';
//         const mobile = item?.user_mobile?.toString() || '';

//         return (
//           name.includes(searchText.toLowerCase()) || mobile.includes(searchText)
//         );
//       });
//     }

//     // DATE RANGE FILTER
//     if (startDate && endDate) {
//       const start = new Date(startDate).setHours(0, 0, 0, 0);
//       const end = new Date(endDate).setHours(23, 59, 59, 999);

//       list = list.filter((item: any) => {
//         if (!item?.redeem_date) return false;

//         const itemDate = new Date(item.redeem_date).setHours(0, 0, 0, 0);

//         return itemDate >= start && itemDate <= end;
//       });
//     }

//     return list;
//   }, [searchText, reportCouponList, startDate, endDate]);


//   const downloadPDF = async () => {
//   try {

//     if (!filteredData || filteredData.length === 0) {
//       Alert.alert('No Data', 'No report available to download');
//       return;
//     }

//     let rows = '';

//     filteredData.forEach((item: any, index: number) => {

//       rows += `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${item?.user_name || ''}</td>
//           <td>${item?.user_mobile || ''}</td>
//           <td>${item?.redeem_date || ''}</td>
//         </tr>
//       `;

//     });

//     const html = `
//       <html>
//         <head>
//           <style>

//             body {
//               font-family: Arial;
//               padding: 10px;
//             }

//             h2 {
//               text-align: center;
//             }

//             table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-top: 20px;
//             }

//             th, td {
//               border: 1px solid black;
//               padding: 8px;
//               text-align: left;
//               font-size: 12px;
//             }

//             th {
//               background-color: #f2f2f2;
//             }

//           </style>
//         </head>

//         <body>

//           <h2>Report List</h2>

//           <table>

//             <tr>
//               <th>No</th>
//               <th>User Name</th>
//               <th>Mobile</th>
//               <th>Redeem Date</th>
//             </tr>

//             ${rows}

//           </table>

//         </body>
//       </html>
//     `;

//     const options = {
//       html,
//       fileName: `Report_${new Date().getTime()}`,
//       directory: 'Documents',
//     };

//     const file = await RNHTMLtoPDF.convert(options);

//     Alert.alert(
//       'Success',
//       `PDF Saved at:\n${file.filePath}`
//     );

//   } catch (error) {

//     console.log('PDF Error:', error);
//     Alert.alert('Error', 'Failed to generate PDF');

//   }
// };

//   return (
//     <AppSafeAreaView style={commonStyles.mainContainer}>
//       <View style={styles.containerStyle}>
//         <ToolBar isLeftIcon title={'Report'} />

//         {/* SEARCH + FILTER */}
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginTop: 30,
//           }}
//         >
//           <View style={{ flex: 1 }}>
//             <Input
//               placeholder="Search by username..."
//               placeholderTextColor={colors.placeholder}
//               value={searchText}
//               onChangeText={text => setSearchText(text)}
//               inputContainerStyle={styles.searchContainer}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={() => setOpenFilter(true)}
//             style={{ marginLeft: 10 }}
//           >
//             <Image
//               source={filterIcon}
//               style={{
//                 width: 30,
//                 height: 20,
//                 resizeMode: 'contain',
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* SHOW SELECTED DATE RANGE */}
//         {startDate && endDate && (
//           <View
//             style={{
//               flexDirection: 'row',
//               marginTop: 10,
//               marginHorizontal: 10,
//               alignItems: 'center',
//             }}
//           >
//             <AppText type={SIXTEEN}>
//               {`${new Date(startDate).toLocaleDateString()} - ${new Date(
//                 endDate,
//               ).toLocaleDateString()}`}
//             </AppText>

//             <TouchableOpacity
//               onPress={() => {
//                 setStartDate(null);
//                 setEndDate(null);
//               }}
//               style={{ marginLeft: 15 }}
//             >
//               <AppText type={SIXTEEN} weight={BOLD} color={colors.buttonBg}>
//                 Reset
//               </AppText>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* LIST */}
//         <FlatList
//           data={filteredData}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({ item }) => <ReportCard item={item} />}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingTop: 30,
//             paddingBottom: 100,
//             flexGrow: 1,
//           }}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[colors.buttonBg]}
//               tintColor={colors.buttonBg}
//             />
//           }
//           ListEmptyComponent={
//             <ListEmptyComponent
//               title="No Data Found"
//               containerStyle={{ marginTop: 80 }}
//             />
//           }
//         />

//         {/* FILTER MODAL */}
//         <Modal visible={openFilter} transparent animationType="slide">
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               backgroundColor: 'rgba(0,0,0,0.5)',
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: '#fff',
//                 margin: 20,
//                 borderRadius: 10,
//                 padding: 20,
//               }}
//             >
//               <AppText type={SIXTEEN} weight={BOLD}>
//                 Start Date
//               </AppText>

//               <DatePicker
//                 date={tempStartDate}
//                 mode="date"
//                 maximumDate={today}
//                 onDateChange={date => {
//                   setTempStartDate(date);

//                   if (date > tempEndDate) {
//                     setTempEndDate(date);
//                   }
//                 }}
//               />

//               <AppText type={SIXTEEN} weight={BOLD} style={{ marginTop: 10 }}>
//                 End Date
//               </AppText>

//               <DatePicker
//                 date={tempEndDate}
//                 mode="date"
//                 minimumDate={tempStartDate}
//                 maximumDate={today}
//                 onDateChange={setTempEndDate}
//               />

//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   marginTop: 20,
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={() => {
//                     setStartDate(null);
//                     setEndDate(null);
//                     setOpenFilter(false);
//                   }}
//                 >
//                   <AppText weight={BOLD}>Reset</AppText>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => setOpenFilter(false)}>
//                   <AppText weight={BOLD}>Cancel</AppText>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => {
//                     if (tempStartDate > tempEndDate) {
//                       Alert.alert('End date cannot be before start date');
//                       return;
//                     }

//                     setStartDate(tempStartDate);
//                     setEndDate(tempEndDate);
//                     setOpenFilter(false);
//                   }}
//                 >
//                   <AppText weight={BOLD} color={colors.buttonBg}>
//                     Apply
//                   </AppText>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
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

import { filterIcon, pdfIcon } from '@helper/imagesAssets';
import { colors } from '@theme/colors';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getReportList } from '@actions/home/homeAction';

import { AppText, BOLD, SIXTEEN } from '@components/AppText';

import RNPrint from 'react-native-print';
import RNBlobUtil from 'react-native-blob-util';
import { Platform, PermissionsAndroid } from 'react-native';

const ReportScreen = () => {
  const dispatch = useAppDispatch();
  const { reportCouponList } = useAppSelector(state => state?.home);

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

    // SEARCH
    if (searchText) {
      list = list.filter((item: any) => {
        const name = item?.user_name?.toLowerCase() || '';
        const mobile = item?.user_mobile?.toString() || '';

        return (
          name.includes(searchText.toLowerCase()) ||
          mobile.includes(searchText)
        );
      });
    }

    // DATE FILTER
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

  /**
   * DOWNLOAD PDF
   */


const downloadPDF = async () => {
  try {
    if (!filteredData || filteredData.length === 0) {
      Alert.alert('No Data', 'No report available');
      return;
    }

    let rows = '';

    filteredData.forEach((item, index) => {
      rows += `
        <tr>
          <td>${index + 1}</td>
          <td>${item?.user_name || ''}</td>
          <td>${item?.user_mobile || ''}</td>
          <td>${item?.redeem_date || ''}</td>
        </tr>
      `;
    });

    const html = `
      <html>
        <body>
          <h2 style="text-align:center;">Report List</h2>
          <table border="1" style="width:100%; border-collapse:collapse;">
            <tr>
              <th>No</th>
              <th>User Name</th>
              <th>Mobile</th>
              <th>Redeem Date</th>
            </tr>
            ${rows}
          </table>
        </body>
      </html>
    `;

    // 👇 THIS opens system print dialog (Save as PDF option)
    await RNPrint.print({
      html,
    });

  } catch (error) {
    console.log('PRINT ERROR:', error);
    Alert.alert('Error', 'Failed to generate PDF');
  }
};
  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <View style={styles.containerStyle}>
        <ToolBar isLeftIcon title={'Report'} />

        {/* SEARCH + ICONS */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          <View style={{ flex: 1 }}>
            <Input
              placeholder="Search by username..."
              placeholderTextColor={colors.placeholder}
              value={searchText}
              onChangeText={text => setSearchText(text)}
              inputContainerStyle={styles.searchContainer}
            />
          </View>

          {/* PDF ICON */}
          <TouchableOpacity onPress={downloadPDF} style={{ marginLeft: 10 }}>
            <Image
              source={pdfIcon}
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
            />
          </TouchableOpacity>

          {/* FILTER ICON */}
          <TouchableOpacity
            onPress={() => setOpenFilter(true)}
            style={{ marginLeft: 10 }}
          >
            <Image
              source={filterIcon}
              style={{ width: 30, height: 20, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>

        {/* DATE RANGE DISPLAY */}
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
                  if (date > tempEndDate) setTempEndDate(date);
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