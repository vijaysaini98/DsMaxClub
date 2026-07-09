// import {
//   NoInternetModal,
//   ServerCheckComp,
// } from '@components/NoInternetConnections';
// import UpdateModal from '@components/UpdateModel';
// import { BaseUrlConfig } from '@config/config';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { useAppDispatch, useAppSelector } from '@redux/hooks';
// import { useEffect, useState } from 'react';
// import { Platform, StatusBar, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { isNewerVersion } from './utils';
// // import ReactNativeVersionInfo from "react-native-version-info";
// import { colors } from '@theme/colors';
// import { getAppVersion } from '@actions/auth/authAction';

// import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
// import MaintenanceModal from '@components/UnderMaintainance';
// import DeviceInfo from 'react-native-device-info';

// let version = DeviceInfo.getVersion();
// let buildVersion = DeviceInfo.getBuildNumber();
// const RootComponent = ({ children }) => {
//   const { appInfo } = useAppSelector(state => state.auth);

//   const dispatch = useAppDispatch();

//   const [netConnected, setNetConnected] = useState(true);
//   const [visible, setVisible] = useState(false);
//   const netInfo = useNetInfo();
//   const [isUpdate, setIsUpdate] = useState(false);
//   const [isMaintainess, setIsMaintainess] = useState(false);

//   useEffect(() => {
//     dispatch(getAppVersion());
//   }, [dispatch]);

//   useEffect(() => {
//     if (appInfo && Array.isArray(appInfo)) {
//       const platform = Platform.OS === 'android' ? 'Android' : 'IOS';
//       const latestVersionInfo = appInfo.find(
//         info => info.param_name === platform,
//       );
//       setIsMaintainess(latestVersionInfo?.status);
//       const latestVersion = latestVersionInfo?.param_description;

//       if (latestVersion && isNewerVersion(version, latestVersion)) {
//         setIsUpdate(true);
//       } else {
//         setIsUpdate(false);
//       }
//     }
//   }, [appInfo, version, isUpdate, isMaintainess]);

//   useEffect(() => {
//     if (!netConnected) {
//       setVisible(true);
//     } else {
//       setVisible(false);
//     }
//   }, [netConnected]);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state: any) => {
//       setNetConnected(state?.isConnected);
//     });
//     return unsubscribe;
//   }, [visible]);

//   return (
//     <BottomSheetModalProvider>
//       <SafeAreaView style={styles.safeArea} edges={['bottom']}>
//         <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
//         <NoInternetModal
//           visible={!(netInfo.isConnected && netInfo.isInternetReachable)}
//         />
//         <ServerCheckComp visible={BaseUrlConfig.ENVIRONMENT} />
//         {isMaintainess && <MaintenanceModal isVisible={isMaintainess} />}
//         {isUpdate && <UpdateModal isVisible={isUpdate} />}
//         {children}
//       </SafeAreaView>
//     </BottomSheetModalProvider>
//   );
// };

// export default RootComponent;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: colors?.white || '#FFFFFF', // use your app's default bg color
//   },
// });

import {
  NoInternetModal,
  ServerCheckComp,
} from '@components/NoInternetConnections';
import { Alert, AppState } from 'react-native';
import UpdateModal from '@components/UpdateModel';

import MaintenanceModal from '@components/UnderMaintainance';

import { BaseUrlConfig } from '@config/config';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { useAppDispatch, useAppSelector } from '@redux/hooks';

import { useEffect, useState } from 'react';

import { Platform, StatusBar, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { isNewerVersion } from './utils';

import { colors } from '@theme/colors';

import {
  announcementDismiss,
  getAppVersion,
  getMaintenanceStatus,
} from '@actions/auth/authAction';

import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

import DeviceInfo from 'react-native-device-info';

let version = DeviceInfo.getVersion();

let buildVersion = DeviceInfo.getBuildNumber();

const RootComponent = ({ children }: any) => {
  const { appInfo, maintenanceInfo,userData } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const netInfo = useNetInfo();

  const [isUpdate, setIsUpdate] = useState(false);

  const [isMaintainess, setIsMaintainess] = useState(false);

  useEffect(() => {
    dispatch(getAppVersion());

    dispatch(getMaintenanceStatus());
  }, [dispatch]);

  const [announcementText, setAnnouncementText] = useState('');
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    dispatch(getMaintenanceStatus());
  }, [appInfo]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        dispatch(getMaintenanceStatus());
      }
    });

    return () => subscription.remove();
  }, []);
  /**
   * App Update Check
   */
  useEffect(() => {
    if (appInfo && Array.isArray(appInfo)) {
      const platform = Platform.OS === 'android' ? 'Android' : 'IOS';

      const latestVersionInfo = appInfo.find(
        info => info.param_name === platform,
      );

      const latestVersion = latestVersionInfo?.param_description;

      if (latestVersion && isNewerVersion(version, latestVersion)) {
        setIsUpdate(true);
      } else {
        setIsUpdate(false);
      }
    }
  }, [appInfo]);

  /**
   * Maintenance Check
   */
  // useEffect(() => {
  //   if (maintenanceInfo) { 
  //     setIsMaintainess(
  //       maintenanceInfo?.maintenance_mode === true,
  //     );
  //   }
  // }, [maintenanceInfo]);

  /**
   * Internet Check
   */
  useEffect(() => {
    if (!maintenanceInfo) return;

    const maintenance = maintenanceInfo.maintenance_mode === true;

    setIsMaintainess(maintenance);

    if (maintenance) {
      setShowAnnouncement(false);
      return;
    }

    if (maintenanceInfo.announcement?.trim()) {
      setAnnouncementText(maintenanceInfo.announcement);
      setShowAnnouncement(true);
    } else {
      setShowAnnouncement(false);
    }
  }, [maintenanceInfo]);

  const onCloseAnnouncement = () => {
 
    dispatch(announcementDismiss());
    setShowAnnouncement(false);

    console.log('After dispatch');
  };
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

        <NoInternetModal
          visible={!(netInfo.isConnected && netInfo.isInternetReachable)}
        />

        <ServerCheckComp visible={BaseUrlConfig.ENVIRONMENT} />
        {/* Maintenance has highest priority */}
      {isMaintainess ? (
  <MaintenanceModal
    visible={true}
    imageUrl={maintenanceInfo?.image}
  />
) : showAnnouncement && userData?.user_type === '2' ? (
  <MaintenanceModal
    visible={true}
    title="📢 Announcement"
    message={announcementText}
    showMessage={true}
    onClose={onCloseAnnouncement}
  />
) : null}

        {isUpdate && <UpdateModal isVisible={isUpdate} />}

        {children}
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default RootComponent;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors?.white || '#FFFFFF',
  },
});
