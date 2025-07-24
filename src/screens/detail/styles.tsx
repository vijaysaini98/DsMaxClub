import { colors } from "@theme/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.white
    },
    coverImageStyle: {
        width: "100%",
        height: 240,
    },
    toolBarStyle: {
        marginTop: 40,
        marginLeft: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingContainer2: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    ratingViewBox: {
        backgroundColor: colors.placeholder,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 15,
    },
    ratingIconContainer: {
        // width:'100%',
        flexDirection: 'row',
        // justifyContent:'flex-end',
        // alignItems:'flex-end',
        // backgroundColor:'red',
        // alignSelf:"flex-end",
        gap: 12,
    },
    iconsStyle: {
        width: 20,
        height: 20
    },
    secondContainer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        flex: 1
    },
    thridContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    buyBtnStyle: {
        backgroundColor: colors.buttonBg,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 100
    },
    bottomBtnContainer: {
        justifyContent: 'center',
        height: 80,
        borderTopWidth: 1,
        borderTopColor: colors.borderColor,
        paddingHorizontal: 16,
    },
    titleTextStyle: {
        marginTop: 15
    },
    disTextStyle: {
        marginVertical: 10
    },
});

export default styles;
