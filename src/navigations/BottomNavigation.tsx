import { AppText, BUTTON_TEXT, MEDIUM } from "@components/AppText";
import { helpLineIcon, homeIcon, nearByIcon, proflieIcon } from "@helper/imagesAssets";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Help_Line from "@screens/helpLine";
import Home from "@screens/home";
import NearBy from "@screens/nearBy";
import Profile from "@screens/profile/inidex";
import { colors } from "@theme/colors";
import { Image, StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon, title }: any) => {
    return (
        <View style={styles.container}>
            {focused && <View style={styles.indicator} />}
            <Image
                source={icon}
                style={[styles.icon, { tintColor: focused ? colors.buttonBg : colors.black }]}
                resizeMode="contain"
            />
            <AppText
                weight={MEDIUM}
                color={focused ? BUTTON_TEXT : colors.black}
            >
                {title}
            </AppText>

        </View>
    );
};




export default function BottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: styles.tabBarStyle,
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
            <Tab.Screen
                name="NearBy"
                component={NearBy}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={nearByIcon} title="NEARRBY" />
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

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: colors.tabBg,
        height: 100,
        paddingTop: 10,
        borderTopWidth: 0,
        
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 100,
        gap: 10,
        paddingTop: 20,
    },
    icon: {
        width: 24,
        height: 24,
    },
    indicator: {
        position: 'absolute',
        top: 0,
        height: 4,
        width: 22,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: colors.buttonBg,
    },
});