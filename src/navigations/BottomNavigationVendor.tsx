import { dealIcon, proflieIcon, scanIcon } from "@helper/imagesAssets";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "@screens/profile/index";
import Deal from "@screens/deals";
import Scan from "@screens/scan";
import { colors } from "@theme/colors";
import { Image, Platform, StyleSheet, View } from "react-native";
import { ms, s, vs } from "react-native-size-matters/extend";
import { AppText, MEDIUM, TWELVE } from "@components/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon, title, isHighlight }: any) => {
    return (
        <View style={[styles.container, isHighlight && styles.hightLightContainer]}>
            {/* TOP INDICATOR */}
            {(focused && !isHighlight) && <View style={styles.indicator} />}

            {/* ICON */}
            <Image
                source={icon}
                style={[isHighlight ? styles.hightLightIcon : styles.icon(focused)]}
                resizeMode="contain"
            />

            {/* <SvgIcon name="home" size={30} color={colors.transparent} /> */}

            {/* TEXT */}
            {!isHighlight && <AppText
                weight={MEDIUM}
                color={focused ? colors.buttonBg : colors.black}
                type={TWELVE}
                style={styles.tabTitleStyle}
            >
                {title}
            </AppText>}
        </View>
    );
};


export default function BottomNavigationVendor() {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: false,
                tabBarAllowFontScaling: false,
                tabBarStyle: styles.tabBarStyle,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Deal}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={dealIcon} title="Home" />
                    ),
                }}
            />
            <Tab.Screen
                name="Scan"
                component={Scan}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={scanIcon} title="SCAN" isHighlight={true} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={historyIcon} title="HISTORY" />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={proflieIcon} title="PROFILE" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: colors.tabBg,
        height: Platform.OS !== 'ios' ? vs(70) : vs(70),
        borderTopWidth: 0,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5
    },
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        height: vs(50),
        paddingVertical: vs(10),
        width: s(100),
        gap: ms(4),
        backgroundColor: colors.transparent
    },
    icon: (focused: boolean) => ({
        width: s(24),
        height: vs(24),
        tintColor: focused ? colors.buttonBg : colors.black
    }),
    hightLightIcon: {
        height: vs(30),
        width: s(30),
        tintColor: colors.white
    },
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
        top: vs(5),
        padding: 5,
        height: s(60),
        width: s(60),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.buttonBg,
        borderRadius: ms(20),
        elevation: 2,
    }
});



// import { dealIcon, proflieIcon, scanIcon } from '@helper/imagesAssets';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Profile from '@screens/profile/index';
// import Deal from '@screens/deals';
// import Scan from '@screens/scan';
// import { colors } from '@theme/colors';
// import { Image, Platform, StyleSheet, View } from 'react-native';
// import { ms, s, vs } from 'react-native-size-matters/extend';
// import { AppText, BOLD, MEDIUM, TEN, TWELVE, WHITE } from '@components/AppText';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const Tab = createBottomTabNavigator();

// export const TabIcon = ({ focused, icon, title, isHighlight }: any) => {
//   return (
//     <View style={[styles.container, isHighlight && styles.hightLightContainer]}>
//       {/* TOP INDICATOR */}
//       {focused && !isHighlight && <View style={styles.indicator} />}

//       {/* ICON BOX (white when focused) */}
//       <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
//         <Image
//           source={icon}
//           resizeMode="contain"
//           style={[
//             styles.icon(focused),
//             {
//               tintColor: focused ? colors.buttonBg : colors.white,
//             },
//           ]}
//         />
//       </View>

//       {/* TEXT */}
//       {!isHighlight && (
//         <AppText
//           weight={BOLD}
//           // color={focused ? WHITE : colors.black}
//           color={WHITE}
//           type={TEN}
//           numberOfLines={1}
//           style={styles.tabTitleStyle}
//         >
//           {title}
//         </AppText>
//       )}
//     </View>
//   );
// };
// export default function BottomNavigationVendor() {
//   const insets = useSafeAreaInsets();
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarHideOnKeyboard: false,
//         tabBarAllowFontScaling: false,
//         tabBarStyle: styles.tabBarStyle,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Deal}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={dealIcon} title="Home" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Scan"
//         component={Scan}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={scanIcon} title="SCAN" />
//           ),
//         }}
//       />
//       {/* <Tab.Screen
//                 name="History"
//                 component={History}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <TabIcon focused={focused} icon={historyIcon} title="HISTORY" />
//                     ),
//                 }}
//             /> */}
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={proflieIcon} title="PROFILE" />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
// const insets = useSafeAreaInsets();
// const styles = StyleSheet.create({
//   tabBarStyle: {
//     backgroundColor: colors.buttonBg,
//     borderTopWidth: 0,
//     width: '100%',
//     position: 'absolute',
//     elevation: 10,
//     // height: vs(50)
//     height: Platform.OS === 'android' ? vs(60) : vs(70),
//     //   paddingBottom: Platform.OS === 'android' ? 6 : 12,
//     //  height: vs(50) + insets.bottom,   // 👈 dynamic
//     paddingBottom: insets.bottom,
//   },
//   container: {
//     alignItems: 'center',
//     alignSelf: 'center',
//     height: vs(50),
//     paddingVertical: vs(10),
//     width: s(100),
//     gap: ms(4),
//     // backgroundColor: colors.buttonBg
//   },
//   icon: (focused: boolean) => ({
//     width: s(24),
//     height: vs(24),
//     tintColor: focused ? colors.buttonBg : colors.black,
//   }),
//   hightLightIcon: {
//     height: vs(30),
//     width: s(30),
//     tintColor: colors.white,
//   },
//   indicator: {
//     position: 'absolute',
//     top: 0,
//     height: vs(4),
//     width: s(22),
//     borderBottomLeftRadius: ms(4),
//     borderBottomRightRadius: ms(4),
//     // backgroundColor: colors.buttonBg,
//   },
//   tabTitleStyle: {
//     marginTop: 4,
//   },
//   hightLightContainer: {
//     top: vs(5),
//     padding: 5,
//     height: s(60),
//     width: s(60),
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.buttonBg,
//     borderRadius: ms(20),
//     elevation: 2,
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