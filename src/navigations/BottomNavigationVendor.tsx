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
                style={[isHighlight ? { height: vs(30), width: s(30), tintColor: colors.white } :
                    styles.icon(focused),
                ]}
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
        backgroundColor: colors.transparent,

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
        top:vs(3)
    },
    tabTitleStyle: {
        marginTop: 4
    },
    hightLightContainer: {
        // top:vs(5),
        // position:'absolute',
        // bottom:0,
        padding:5,
        height: s(60),
        width: s(60),
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.buttonBg,
        borderRadius: ms(20),
        elevation: 2,
        // borderLeftWidth:5,
        // borderBottomWidth:5,
        // borderRightWidth:5,
        // borderColor:colors.white
        // marginTop: 7
    }
});