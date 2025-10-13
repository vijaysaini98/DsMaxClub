// import { Image, StyleSheet, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { AppSafeAreaView } from '@components/AppSafeAreaView';
// import { colors } from '@theme/colors';
// import { commonStyles } from '@theme/commonStyles';
// import ToolBar from '@components/ToolBar';
// import { AppText, BOLD, SEMI_BOLD, SIXTEEN, TWENTY_SIX } from '@components/AppText';
// import { checkReedemIcon } from '@helper/imagesAssets';
// import { useNavigation } from '@react-navigation/native';

// const RedeemSuccessfull = () => {
//   const navigation = useNavigation();
//   const [seconds, setSeconds] = useState(5);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           navigation.goBack(); // 👈 navigate back when 0
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [navigation]);

//   return (
//     <AppSafeAreaView style={commonStyles.mainContainer}>
//       <ToolBar isLeftIcon title="Redeem" mainContainerStyle={styles.containerStyle} />
//       <View style={styles.secondContainerStyle}>
//         <Image source={checkReedemIcon} resizeMode="contain" style={styles.imageStyle} />
//         <AppText type={TWENTY_SIX} weight={BOLD} style={styles.title}>
//           Redemption Successful!
//         </AppText>
//         <AppText type={SIXTEEN} style={styles.subtitle}>
//           This deal has{"\n"}been marked as redeemed.
//         </AppText>

//         {/* Countdown Timer Display */}
//         <AppText type={SIXTEEN} style={styles.timer} weight={SEMI_BOLD}>
//           Going back in {seconds} sec...
//         </AppText>
//       </View>
//     </AppSafeAreaView>
//   );
// };

// export default RedeemSuccessfull;

// const styles = StyleSheet.create({
//   containerStyle: {
//     paddingHorizontal: 20,
//   },
//   secondContainerStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//   },
//   imageStyle: {
//     width: 138,
//     height: 132,
//     marginBottom: 30,
//   },
//   title: {
//     color: colors.black,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     textAlign: 'center',
//     color: colors.placeholder2,
//     lineHeight: 24,
//     marginBottom: 20,
//   },
//   timer: {
//     textAlign: 'center',
//     color: colors.buttonBg, // 👈 change if needed
//   },
// });



import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';
import ToolBar from '@components/ToolBar';
import { AppText, BOLD, SEMI_BOLD, SIXTEEN, TWENTY_SIX } from '@components/AppText';
import { checkReedemIcon } from '@helper/imagesAssets';
import { useNavigation } from '@react-navigation/native';

const RedeemSuccessfull = () => {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(5);

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Navigate back when timer finishes
  useEffect(() => {
    if (seconds === 0) {
      navigation.goBack();
    }
  }, [seconds, navigation]);

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <ToolBar isLeftIcon title="Redeem" mainContainerStyle={styles.containerStyle} />
      <View style={styles.secondContainerStyle}>
        <Image source={checkReedemIcon} resizeMode="contain" style={styles.imageStyle} />
        <AppText type={TWENTY_SIX} weight={BOLD} style={styles.title}>
          Redemption Successful!
        </AppText>
        <AppText type={SIXTEEN} style={styles.subtitle}>
          This deal has{"\n"}been marked as redeemed.
        </AppText>

        {/* Countdown Timer Display */}
        <AppText type={SIXTEEN} style={styles.timer} weight={SEMI_BOLD}>
          Going back in {seconds} sec...
        </AppText>
      </View>
    </AppSafeAreaView>
  );
};

export default RedeemSuccessfull;

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 20,
  },
  secondContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 138,
    height: 132,
    marginBottom: 30,
  },
  title: {
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.placeholder2,
    lineHeight: 24,
    marginBottom: 20,
  },
  timer: {
    textAlign: 'center',
    color: colors.buttonBg,
  },
});
