// import {
//   View,
//   FlatList,
//   RefreshControl,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Alert,
//   Platform,
//   PermissionsAndroid,
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

// import { filterIcon, pdfIcon, resetIcon } from '@helper/imagesAssets';
// import { colors } from '@theme/colors';

// import { useAppDispatch, useAppSelector } from '@redux/hooks';
// import { getReportList, getReportPdf } from '@actions/home/homeAction';

// import { AppText, BOLD, SIXTEEN } from '@components/AppText';
// import RNFS from 'react-native-fs';

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
//   const [pdfUrl, setPdfUrl] = useState('');

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

//   const formatDate = (date: Date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = `0${d.getMonth() + 1}`.slice(-2);
//     const day = `0${d.getDate()}`.slice(-2);

//     return `${year}-${month}-${day}`;
//   };

//   // ✅ STORAGE PERMISSION
//   const requestStoragePermission = async () => {
//     if (Platform.OS === 'android') {
//       if (Platform.Version >= 33) {
//         return true; // Android 13+ no permission needed
//       }

//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       );

//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const downloadPDF = async (url: string) => {
//     try {
//       console.log('Downloading from =>', url);

//       if (!url) {
//         Alert.alert('Error', 'No PDF URL found');
//         return;
//       }

//       const hasPermission = await requestStoragePermission();
//       if (!hasPermission) {
//         Alert.alert('Permission denied');
//         return;
//       }

//       const fileName = `Report_${Date.now()}.pdf`;

//       const filePath =
//         Platform.OS === 'android'
//           ? `${RNFS.DownloadDirectoryPath}/${fileName}`
//           : `${RNFS.DocumentDirectoryPath}/${fileName}`;

//       const result = await RNFS.downloadFile({
//         fromUrl: url,
//         toFile: filePath,
//       }).promise;

//       console.log('Download result =>', result);

//       if (result.statusCode === 200) {
//         const exists = await RNFS.exists(filePath);

//         if (exists) {
//           Alert.alert('Success', `PDF saved at:\n${filePath}`);
//         } else {
//           Alert.alert('Error', 'File not found after download');
//         }
//       } else {
//         Alert.alert('Download failed');
//       }
//     } catch (error) {
//       console.log('Download error =>', error);
//       Alert.alert('Download error');
//     }
//   };

//   const callPdfApi = (from?: Date | null, to?: Date | null) => {
//     // ✅ Always start with base payload
//     const payload: any = {
//       export_pdf: 1,
//     };

//     // ✅ Add dates ONLY if both exist
//     if (from && to) {
//       payload.from_date = `${formatDate(from)} 00:00:00`;
//       payload.to_date = `${formatDate(to)} 23:59:59`;
//     }

//     dispatch(
//       getReportPdf(payload, (res: any) => {
//         console.log('PDF FULL RESPONSE =>', res);

//         const url = res?.pdf_url;

//         if (!url) {
//           Alert.alert('Error', 'PDF URL not received');
//           return;
//         }

//         setPdfUrl(url);

//         // ✅ Direct download
//         downloadPDF(url);
//       }),
//     );
//   };
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
//             onPress={() => {
//               // ✅ CASE 1: Filter applied
//               if (startDate && endDate) {
//                 callPdfApi(startDate, endDate);
//               }
//               // ✅ CASE 2: No filter → FULL REPORT
//               else {
//                 callPdfApi();
//               }
//             }}
//             style={{ marginLeft: 10 }}
//           >
//             <Image
//               source={pdfIcon}
//               style={{
//                 width: 30,
//                 height: 20,
//                 resizeMode: 'contain',
//               }}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => setOpenFilter(true)}
//             style={{ marginLeft: 10 }}
//           >
//             <Image
//               source={filterIcon}
//               style={{
//                 width: 30,
//                 height: 30,
//                 resizeMode: 'contain',
//               }}
//             />
//           </TouchableOpacity>
//         </View>

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

//                 {/* <TouchableOpacity
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
//                 </TouchableOpacity> */}
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
  Platform,
  PermissionsAndroid,
} from 'react-native';

import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';

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

import {
  useAppDispatch,
  useAppSelector,
} from '@redux/hooks';

import {
  getReportList,
  getReportPdf,
} from '@actions/home/homeAction';

import {
  AppText,
  BOLD,
  SIXTEEN,
} from '@components/AppText';

import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

const ReportScreen = () => {
  const dispatch = useAppDispatch();

  const { reportCouponList } = useAppSelector(
    state => state?.home,
  );

  const [refreshing, setRefreshing] =
    useState(false);

  const [searchText, setSearchText] =
    useState('');

  const [openFilter, setOpenFilter] =
    useState(false);

  const [startDate, setStartDate] =
    useState<any>(null);

  const [endDate, setEndDate] =
    useState<any>(null);

  const [tempStartDate, setTempStartDate] =
    useState(new Date());

  const [tempEndDate, setTempEndDate] =
    useState(new Date());

  const today = new Date();

  /**
   * INITIAL API
   */
  useEffect(() => {
    dispatch(getReportList());
  }, []);

  /**
   * STOP REFRESH
   */
  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }
  }, [reportCouponList]);

  /**
   * REFRESH
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    dispatch(getReportList());
  }, [dispatch]);

  /**
   * FORMAT DATE
   */
  const formatDate = (date: Date) => {
    const d = new Date(date);

    const year = d.getFullYear();

    const month = `0${d.getMonth() + 1}`.slice(
      -2,
    );

    const day = `0${d.getDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  };

  /**
   * STORAGE PERMISSION
   */
  const requestStoragePermission =
    async () => {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          return true;
        }

        const granted =
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS
              .WRITE_EXTERNAL_STORAGE,
          );

        return (
          granted ===
          PermissionsAndroid.RESULTS.GRANTED
        );
      }

      return true;
    };

  /**
   * DOWNLOAD EXCEL
   */
  const callExcelApi = async (
    from?: Date | null,
    to?: Date | null,
  ) => {
    const payload: any = {
      export_excel: 1,
    };

    /**
     * DATE FILTER
     */
    if (from && to) {
      payload.from_date = `${formatDate(
        from,
      )} 00:00:00`;

      payload.to_date = `${formatDate(
        to,
      )} 23:59:59`;
    }


    dispatch(
      getReportPdf(payload, async (res: any) => {
        console.log(
          'EXCEL RESPONSE =>',
          res,
        );

        const reportData = res?.data || [];

        if (!reportData.length) {
          Alert.alert('No data found');
          return;
        }

        try {
          const hasPermission =
            await requestStoragePermission();

          if (!hasPermission) {
            Alert.alert('Permission denied');
            return;
          }

          /**
           * EXCEL DATA
           */
         const excelData = reportData.map(
  (item: any, index: number) => {



    return {
      'User Name':
        item?.user_name || '',

      'Booklet Code':
        item?.booklet_code || '',

      'Coupon Code':
        item?.generated_code ||
        item?.coupon_code ||
        '',

      Heading:
        item?.heading || '',

      Description:
        item?.short_desc ||
        item?.description ||
        '',

      'Redeem Date':
        item?.generated_date ||
        item?.redeem_date ||
        '',

      Type:
       item?.coupon_type_id === 1
          ? 'Free' : ''
    };
  },
);

          /**
           * CREATE WORKBOOK
           */
          const workbook =
            XLSX.utils.book_new();

          const worksheet =
            XLSX.utils.json_to_sheet(
              excelData,
            );

          XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            'Report',
          );

          /**
           * GENERATE EXCEL
           */
          const excelOutput = XLSX.write(
            workbook,
            {
              type: 'binary',
              bookType: 'xlsx',
            },
          );

          /**
           * FILE PATH
           */
          const filePath =
            Platform.OS === 'android'
              ? `${RNFS.DownloadDirectoryPath}/Report_${Date.now()}.xlsx`
              : `${RNFS.DocumentDirectoryPath}/Report_${Date.now()}.xlsx`;

          /**
           * WRITE FILE
           */
          await RNFS.writeFile(
            filePath,
            excelOutput,
            'ascii',
          );

          console.log(
            'EXCEL SAVED =>',
            filePath,
          );

          Alert.alert(
            'Success',
            'Excel downloaded successfully',
          );
        } catch (error) {
          console.log(
            'EXCEL ERROR =>',
            error,
          );

          Alert.alert(
            'Error',
            'Excel generation failed',
          );
        }
      }),
    );
  };

  /**
   * FILTERED DATA
   */
  const filteredData = useMemo(() => {
    let list = reportCouponList?.data || [];

    /**
     * SEARCH FILTER
     */
    if (searchText) {
      list = list.filter((item: any) => {
        const name =
          item?.user_name?.toLowerCase() || '';

        const mobile =
          item?.user_mobile?.toString() || '';

        return (
          name.includes(
            searchText.toLowerCase(),
          ) || mobile.includes(searchText)
        );
      });
    }

    /**
     * DATE FILTER
     */
    if (startDate && endDate) {
      const start = new Date(
        startDate,
      ).setHours(0, 0, 0, 0);

      const end = new Date(endDate).setHours(
        23,
        59,
        59,
        999,
      );

      list = list.filter((item: any) => {
        if (!item?.redeem_date) {
          return false;
        }

        const itemDate = new Date(
          item.redeem_date,
        ).setHours(0, 0, 0, 0);

        return (
          itemDate >= start &&
          itemDate <= end
        );
      });
    }

    return list;
  }, [
    searchText,
    reportCouponList,
    startDate,
    endDate,
  ]);

  return (
    <AppSafeAreaView
      style={commonStyles.mainContainer}
    >
      <View style={styles.containerStyle}>
        <ToolBar
          isLeftIcon
          title={'Report'}
        />

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
              placeholder="Search by username..."
              placeholderTextColor={
                colors.placeholder
              }
              value={searchText}
              onChangeText={text =>
                setSearchText(text)
              }
              inputContainerStyle={
                styles.searchContainer
              }
            />
          </View>

          {/* DOWNLOAD EXCEL */}
          <TouchableOpacity
            onPress={() => {
              if (startDate && endDate) {
                callExcelApi(
                  startDate,
                  endDate,
                );
              } else {
                callExcelApi();
              }
            }}
            style={{ marginLeft: 10 }}
          >
            <Image
              source={pdfIcon}
              style={{
                width: 30,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

          {/* FILTER BUTTON */}
          <TouchableOpacity
            onPress={() =>
              setOpenFilter(true)
            }
            style={{ marginLeft: 10 }}
          >
            <Image
              source={filterIcon}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* REPORT LIST */}
        <FlatList
          data={filteredData}
          keyExtractor={item =>
            item.id.toString()
          }
          renderItem={({ item }) => (
            <ReportCard item={item} />
          )}
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
              containerStyle={{
                marginTop: 80,
              }}
            />
          }
        />

        {/* FILTER MODAL */}
        <Modal
          visible={openFilter}
          transparent
          animationType="slide"
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor:
                'rgba(0,0,0,0.5)',
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
              {/* START DATE */}
              <AppText
                type={SIXTEEN}
                weight={BOLD}
              >
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

              {/* END DATE */}
              <AppText
                type={SIXTEEN}
                weight={BOLD}
                style={{ marginTop: 10 }}
              >
                End Date
              </AppText>

              <DatePicker
                date={tempEndDate}
                mode="date"
                minimumDate={
                  tempStartDate
                }
                maximumDate={today}
                onDateChange={
                  setTempEndDate
                }
              />

              {/* BUTTONS */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent:
                    'space-between',
                  marginTop: 20,
                }}
              >
                {/* RESET */}
                <TouchableOpacity
                  onPress={() => {
                    setStartDate(null);

                    setEndDate(null);

                    setTempStartDate(
                      new Date(),
                    );

                    setTempEndDate(
                      new Date(),
                    );

                    setOpenFilter(false);
                  }}
                >
                  <AppText weight={BOLD}>
                    Reset
                  </AppText>
                </TouchableOpacity>

                {/* CANCEL */}
                <TouchableOpacity
                  onPress={() =>
                    setOpenFilter(false)
                  }
                >
                  <AppText weight={BOLD}>
                    Cancel
                  </AppText>
                </TouchableOpacity>

                {/* APPLY */}
                <TouchableOpacity
                  onPress={() => {
                    if (
                      tempStartDate >
                      tempEndDate
                    ) {
                      Alert.alert(
                        'Error',
                        'End date cannot be before start date',
                      );

                      return;
                    }

                    setStartDate(
                      tempStartDate,
                    );

                    setEndDate(
                      tempEndDate,
                    );

                    setOpenFilter(false);
                  }}
                >
                  <AppText
                    weight={BOLD}
                    color={
                      colors.buttonBg
                    }
                  >
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

// {startDate && endDate && (
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
//               {/* <AppText type={SIXTEEN} weight={BOLD} color={colors.buttonBg}>
//                 Reset
//               </AppText> */}
//               <Image source={resetIcon} resizeMode='contain' style={{width:20,height:20}}/>
//             </TouchableOpacity>
//           </View>
//         )}
