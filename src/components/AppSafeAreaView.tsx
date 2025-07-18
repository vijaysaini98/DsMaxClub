// /* eslint-disable react-native/no-inline-styles */
// import React, { ReactNode } from "react";
// import {
//   ImageBackground,
//   ImageSourcePropType,
//   Platform,
//   StatusBar,
//   View,
//   ViewStyle,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { commonStyles } from "@theme/commonStyles";
// import { colors } from "@theme/colors";

// interface AppSafeAreaViewProps {
//   children: ReactNode;
//   style?: ViewStyle;
//   statusColor?: string;
//   isMargin?: boolean;
//   isSecond?: boolean;
//   isLight?: boolean;
//   imgBackImage?: ImageSourcePropType;
// }

// const AppSafeAreaView = ({
//   children,
//   style,
//   statusColor,
//   isSecond = false,
//   isLight = false,
//   imgBackImage,
// }: AppSafeAreaViewProps) => {

//   const Container = Platform.OS === "ios" ? SafeAreaView : View;
//   const containerProps =
//     Platform.OS === "ios"
//       ? { edges: ["right", "left", "bottom"] }
//       : {};

//   const backgroundColor =
//     statusColor || (isSecond ? colors.transparent : colors.mainBg);

//   const renderContent = () =>
//     isSecond && imgBackImage ? (
//       <ImageBackground
//         source={imgBackImage}
//         resizeMethod="auto"
//         style={commonStyles.imageBackgroundSize}
//       >
//         {children}
//       </ImageBackground>
//     ) : (
//       children
//     );

//   return (
//     <Container
//       {...containerProps}
//       style={[
//         { flex: 1, paddingTop: Platform.OS === "ios" ? 10 : 0 },
//         commonStyles.flex, // Fixed: use 'flex' instead of 'screenSize'
//         style,
//       ]}
//     >
//       <StatusBar
//         translucent={Platform.OS === "android"}
//         backgroundColor={backgroundColor}
//         barStyle={isLight ? "light-content" : "dark-content"}
//       />
//       {renderContent()}
//     </Container>
//   );
// };

// export { AppSafeAreaView };

/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from "react";
import {
  ImageBackground,
  ImageBackgroundProps,
  Platform,
  StatusBar,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../theme/commonStyles";
import { colors } from "../theme/colors";
// import { mainBg } from "../../helper/ImageAssets";

interface AppSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
  source?: string;
  isMargin?: boolean;
  statusColor?: string;
  isSecond?: boolean;
  isLight?: boolean;
  bgImage?:ImageBackgroundProps
}

const AppSafeAreaView = ({
  children,
  style,
  statusColor,
  isMargin = true,
  isSecond,
  isLight,
  bgImage,
}: AppSafeAreaViewProps) => {
  return Platform.OS === "ios" ? (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      style={[
        {
          flex: 1,
          // paddingTop: 40,
        //   paddingTop: 10,
        },
        style,
      ]}
    >
      <StatusBar translucent={false} />
      {isSecond ? (
        <ImageBackground
          source={bgImage}
          resizeMethod="auto"
          style={commonStyles.imageBackgroundSize}
        >
          {children}
        </ImageBackground>
      ) : (
        children
      )}
    </SafeAreaView>
  ) : (
    <View style={[commonStyles.screenSize, style]}>
      <StatusBar
        translucent
        backgroundColor={colors.white}
        // backgroundColor={
        //   statusColor
        //     ? statusColor
        //     : isSecond
        //     ? colors.transparent
        //     : colors.mainBg
        // }
        barStyle={isLight ? "light-content" : "dark-content"}
      />
      {isSecond ? (
        <ImageBackground
          source={bgImage}
          resizeMethod="auto"
          style={commonStyles.imageBackgroundSize}
        >
          {children}
        </ImageBackground>
      ) : (
        children
      )}
    </View>
  );
};

export { AppSafeAreaView };
