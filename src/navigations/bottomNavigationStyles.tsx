import { colors } from "@theme/colors";
import { Platform, StyleSheet } from "react-native";
import { ms, s, vs } from "react-native-size-matters/extend";

const bottomNavigationStyles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: colors.tabBg,
        // height: Platform.OS !== 'ios' ? vs(0) : vs(80),
        borderTopWidth: 0,
        width: "100%",
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        height: Platform.OS == 'ios' ? vs(20) : vs(50),
        paddingTop: vs(10),
        width: s(100),
        gap: ms(4),
        backgroundColor: colors.tabBg,
    },
    icon: (focused: boolean) => ({
        width: s(24),
        height: vs(24),
        tintColor: focused ? colors.buttonBg : colors.black
    }),
    indicator: {
        position: 'absolute',
        height: vs(4),
        width: s(22),
        borderBottomLeftRadius: ms(4),
        borderBottomRightRadius: ms(4),
        backgroundColor: colors.buttonBg,
    },
    tabTitleStyle: {
        marginTop: 4
    },
    hightLightContainer: {
        height: s(60),
        width: s(60),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.buttonBg,
        borderRadius: ms(20),
        elevation: 2,
        marginTop: 10
    }
});

export default bottomNavigationStyles;

// import { colors } from '@theme/colors';
// import { Platform, StyleSheet } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { ms, s, vs } from 'react-native-size-matters/extend';

// const insets = useSafeAreaInsets();

// const bottomNavigationStyles = StyleSheet.create({
//   tabBarStyle: {
//     backgroundColor: colors.buttonBg,
//     borderTopWidth: 0,
//     width: '100%',
//     position: 'absolute',
//     elevation: 10,
//     // height: vs(50)
//    height: Platform.OS === 'android' ? vs(60) : vs(70), 
// //   paddingBottom: Platform.OS === 'android' ? 6 : 12,   
// //  height: vs(50) + insets.bottom,   // 👈 dynamic
//       paddingBottom: insets.bottom,
//   },
//   container: {
//     alignItems: 'center',
//     paddingTop: vs(10),
//     width: s(100),
//     gap: ms(4),
//     // backgroundColor: colors.tabBg,
//     backgroundColor: colors.buttonBg,
//   },
//   icon: (focused: boolean) => ({
//     width: s(24),
//     height: vs(24),
//     tintColor: focused ? colors.buttonBg : colors.black,
//     // tintColor: colors.white,
//   }),
//   indicator: {
//     position: 'absolute',
//     top: 0,
//     height: vs(4),
//     width: s(22),
//     borderBottomLeftRadius: ms(4),
//     borderBottomRightRadius: ms(4),
//     backgroundColor: colors.buttonBg,
//     // backgroundColor: colors.white,
//   },
//   // tabTitleStyle: {
//   //     letterSpacing: -0.5,
//   //     marginTop: 4,
//   //     // width:'100%',textAlign:'center'
//   // },
//   tabTitleStyle: {
//     letterSpacing: -0.3,

//     // marginTop: 4,

//     textAlign: 'center',
//   },
//   hightLightContainer: {
//     height: s(60),
//     width: s(60),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.buttonBg,
//     borderRadius: ms(30),
//     elevation: 4,
//     marginTop: -vs(20),
//   },
//   iconWrapper: {
//     height: s(36),
//     width: s(36),

//     borderRadius: ms(10),

//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   activeIconWrapper: {
//     backgroundColor: '#c9bab9',
//   },
// });

// export default bottomNavigationStyles;
