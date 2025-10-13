import React, { } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { AppText, BOLD, TEN, THIRTEEN, WHITE } from "./AppText";
import { colors } from "@theme/colors";

export const NoInternetModal = ({ visible }: { visible: boolean }) => {
  return visible ? (
    <View style={styles.noInternet}>
      <AppText type={THIRTEEN} color={WHITE} weight={BOLD}>
        No Internet Connection
      </AppText>
    </View>
    // <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'red'}}>
    //   <Image
    //   source={noInternetIcon}
    //   style={{height:vs(200),width:'100%'}}
    //   resizeMode='contain'
    //   />
    //   <AppText>No Internet Connection</AppText>
    // </View>
  ) : (
    <></>
  );
};

export const ServerCheckComp = ({ visible }: { visible?: boolean | string }) => {
  return visible ? (
    <View style={styles.serverCheckContainer}>
      <AppText type={TEN} color={WHITE} weight={BOLD}>
        {"Staging"}
      </AppText>
    </View>
  ) : (
    <></>
  );
};




const styles = StyleSheet.create({
  noInternet: {
    flex: 1,
    height: 40,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  serverCheckContainer: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: Platform.OS === "android" ? 30 : 30,
    right: -10,
    borderRadius: 10,
    zIndex: 999,
    width: "20%",
    backgroundColor: colors.buttonBg,
    transform: [{ rotate: "25deg" }],
  },
})