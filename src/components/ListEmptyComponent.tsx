import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText, BUTTON_BG, FOURTEEN, MEDIUM, SEMI_BOLD } from './AppText'
import { ms, vs } from 'react-native-size-matters/extend'
import { colors } from '@theme/colors'

const ListEmptyComponent = ({ title,containerStyle }:{title?:string,containerStyle?:any}) => {
    return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: "center" ,backgroundColor:colors.tabBg,height:vs(200),
        borderRadius:ms(10),
         shadowColor: colors.tabBg,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        // Android shadow
        elevation: 2,
        },containerStyle]}>
            <AppText type={FOURTEEN} weight={MEDIUM} color={BUTTON_BG}>{title ? title : "No Request Available"}</AppText>
        </View>
    )
}

export default ListEmptyComponent

const styles = StyleSheet.create({})