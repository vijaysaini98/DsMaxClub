import { AppText, BOLD, BUTTON_BG, TEN } from '@components/AppText';
import {
  helpLineIcon,
  homeIcon,
  myCardIcon,
  nearByIcon,
  proflieIcon,
} from '@helper/imagesAssets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Help_Line from '@screens/helpLine';
import Home from '@screens/home';
import NearBy from '@screens/nearBy';
import Profile from '@screens/profile';
import { colors } from '@theme/colors';
import { Image, Platform, View } from 'react-native';
import bottomNavigationStyles from './bottomNavigationStyles';
import MyCard from '@screens/myCard';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Cart from '@screens/cart';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();


export const TabIcon = ({ focused, icon, title, isHighlight }: any) => {
  return (
    <View
      style={[
        bottomNavigationStyles.container,
        isHighlight && bottomNavigationStyles.hightLightContainer,
      ]}
    >
      {/* TOP INDICATOR */}
      {focused && !isHighlight && (
        <View style={bottomNavigationStyles.indicator} />
      )}

      {/* ICON */}
      <Image
        source={icon}
        style={[
          isHighlight
            ? { height: vs(30), width: s(30), tintColor: colors.white }
            : bottomNavigationStyles.icon(focused),
        ]}
        resizeMode="contain"
      />

      {/* <SvgIcon name="home" size={30} color={colors.transparent} /> */}

      {/* TEXT */}
      {!isHighlight && (
        <AppText
          weight={BOLD}
          color={focused ? BUTTON_BG : colors.black}
    
          type={TEN}
          style={bottomNavigationStyles.tabTitleStyle}
        >
          {title}
        </AppText>
      )}
    </View>
  );
};
// export const TabIcon = ({ focused, icon, title, isHighlight }: any) => {
//   return (
//     <View
//       style={[
//         bottomNavigationStyles.container,
//         isHighlight && bottomNavigationStyles.hightLightContainer,
//       ]}
//     >
//       {/* TOP INDICATOR */}
//       {focused && !isHighlight && (
//         <View style={bottomNavigationStyles.indicator} />
//       )}

//       {/* ICON BOX (white when focused) */}
//       <View
//         style={[
//           bottomNavigationStyles.iconWrapper,
//           focused && bottomNavigationStyles.activeIconWrapper,
//         ]}
//       >
//         <Image
//           source={icon}
//           resizeMode="contain"
//           style={[
//             bottomNavigationStyles.icon(focused),
//             {
//                 tintColor: focused
//                     ? colors.buttonBg
//                     : colors.white,
//             }

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
//           style={bottomNavigationStyles.tabTitleStyle}
//         >
//           {title}
//         </AppText>
//       )}
//     </View>
//   );
// };


export default function BottomNavigation({
  route,
}: any) {
  const insets = useSafeAreaInsets();
   const navigation = useNavigation();
  const bottomPadding =
    Platform.OS === 'android' || insets.bottom > 0 ? insets.bottom : 10;
useEffect(() => {
    const targetTab = route?.params?.targetTab;

    if (targetTab) {
      navigation.navigate(targetTab as never);
    }
  }, [route?.params?.targetTab, navigation]);

  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: false,
        tabBarAllowFontScaling: false,
        tabBarStyle: bottomNavigationStyles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={homeIcon} title="HOME" />
          ),
        }}
      />
      <Tab.Screen
        name="HelpLine"
        component={Help_Line}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={helpLineIcon} title="HELPLINE" />
          ),
        }}
      />
      {/* <Tab.Screen
                name="NearBy"
                component={NearBy}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={nearByIcon} title="NEARRBY" />
                    ),
                }}
            /> */}
      <Tab.Screen
        name={'MyCard'}
        component={MyCard}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={myCardIcon} title="MY BOOKLETS" />
          ),
        }}
      />
       
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
