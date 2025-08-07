import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from './AppText'

const ListEmptyComponent = ({ title }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
            <AppText>{title ? title : "No Request Availble"}</AppText>
        </View>
    )
}

export default ListEmptyComponent

const styles = StyleSheet.create({})