import { colors } from "@theme/colors";
import { Platform, StyleSheet } from "react-native";
import { ms, s, vs } from "react-native-size-matters/extend";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    coverImageStyle: {
        width: "100%",
        height: vs(300),
    },
    toolBarStyle: {
        marginTop: vs(50),
        marginLeft: s(16),
        backgroundColor: colors.semiTransprent,
        width: "30%",
        height: vs(40),
        paddingTop: 0,
        borderRadius:5
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingContainer2: {
        flexDirection: 'row',
        gap: s(6),
        alignItems: 'center',
    },
    ratingViewBox: {
        backgroundColor: colors.placeholder,
        paddingHorizontal: s(10),
        paddingVertical: vs(4),
        borderRadius: ms(15),
    },
    ratingIconContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // alignItems:'flex-end',
        // backgroundColor:'red',
        // alignSelf:"flex-end",
        gap: s(12),
    },
    iconsStyle: {
        width: s(20),
        height: s(20)
    },
    secondContainer: {
        paddingHorizontal: s(16),
        paddingTop: vs(12),
        flex: 1,
        borderTopLeftRadius: ms(20),
        borderTopRightRadius: ms(20),
        overflow: 'hidden',
        top: vs(-20),
        backgroundColor: colors.white,
    },
    thridContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    buyBtnStyle: (disable:boolean)=>({
        backgroundColor: disable ? colors.disabledBtn :colors.buttonBg,
        paddingVertical: vs(15),
        width: '100%',
        alignItems: 'center',
        borderRadius: ms(100)
    }),
    bottomBtnContainer: {
        // justifyContent: 'center',
        // height: vs(80),
        // borderTopWidth: 1,
        // borderTopColor: colors.borderColor,
        // paddingHorizontal: s(16),
        // backgroundColor:'green',
        // bottom:0
        position: 'absolute',

        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: s(16),
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: colors.borderColor,
        //   paddingBottom: Platform.OS === 'ios' ? vs(10) : vs(10), 
        backgroundColor: colors.white,
    },
    titleTextStyle: {
        marginTop: vs(15)
    },
    disTextStyle: {
        marginVertical: vs(10)
    },
});

export default styles;
