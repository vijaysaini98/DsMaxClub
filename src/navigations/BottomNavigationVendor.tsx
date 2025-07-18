import { dealIcon, historyIcon, proflieIcon, scanIcon } from "@helper/imagesAssets";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NearBy from "@screens/nearBy";
import Profile from "@screens/profile/index";
import { colors } from "@theme/colors";
import { StyleSheet } from "react-native";
import { TabIcon } from "./BottomNavigation";
import Deal from "@screens/deals";
import Scan from "@screens/scan";

const Tab = createBottomTabNavigator();



export default function BottomNavigationVendor() {
    return (
        <Tab.Navigator
            initialRouteName="Deal"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: styles.tabBarStyle,
            }}
        >
            <Tab.Screen
                name="Deal"
                component={Deal}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={dealIcon} title="DEAL" />
                    ),
                }}
            />
            <Tab.Screen
                name="Scan"
                component={Scan}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={scanIcon} title="SCAN" />
                    ),
                }}
            />
            <Tab.Screen
                name="History"
                component={NearBy}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={historyIcon} title="HISTORY" />
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