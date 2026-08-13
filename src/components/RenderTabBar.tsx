import { TabBar } from "react-native-tab-view";
import { AppText, FOURTEEN, MEDIUM, NORMAL, TEN } from "./AppText";
import { colors } from "@theme/colors";

export const RenderTabBar = (props: any) => {
  const { tabTextType } = props;
  return (
    <TabBar
      {...props}
      scrollEnabled
      renderLabel={({ route, focused }: any) => (
        <AppText
          type={tabTextType ?? FOURTEEN}
          weight={focused ? MEDIUM : NORMAL}
          style={{
            color: focused ? colors.buttonBg : colors.disTextColor,
            textTransform: 'capitalize',
            paddingVertical: 0,
          }}
        >
          {route.title}
        </AppText>
      )}
      indicatorStyle={{
        backgroundColor: colors.buttonBg,
        height: 2,
        borderRadius: 20,
        bottom: -1,
      }}
      activeColor={colors.placeholder}
      inactiveColor={colors.disTextColor}
      style={{
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.disTextColor,
        height: 40,
      }}
      tabStyle={{
        height: 40,
        width: 'auto',
        minWidth: 90,
        paddingHorizontal: 10,
      }}
      pressColor={colors.transparent}
    />
  );
};
