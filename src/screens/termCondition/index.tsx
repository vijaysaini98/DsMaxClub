import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { WebView } from "react-native-webview";
import { Loader } from '@components/Spinner';
import { commonStyles } from '@theme/commonStyles';
import { getPrivacy_TermCondition } from '@actions/auth/authAction';
import ToolBar from '@components/ToolBar';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { s, vs } from 'react-native-size-matters/extend';

const TermCondition = () => {
    const dispatch = useAppDispatch();

    const webRef = useRef();
    const { termsCondition, isLoading } = useAppSelector((state) => state?.auth)


    const handleUrlNavigation = (event) => {
        const url = event.url;

        // Prevent WebView from loading external links
        const isExternalLink = !url.includes('yourdomain.com'); // adjust your domain

        if (isExternalLink) {
            Linking.openURL(url); // Open in device browser
            return false; // Block WebView from loading it
        }

        return true; // Allow WebView to load the URL
    };

    useEffect(() => {
        dispatch(getPrivacy_TermCondition("terms-conditions"))
    }, [])

    return (
        <AppSafeAreaView style={[commonStyles.mainContainer]}>
            <View style={styles.containerStyle}>
                <ToolBar isLeftIcon title={"Terms Condition"} />
                {isLoading ? (
                    <Loader />
                ) : (

                    <WebView
                        ref={webRef}
                        source={{ uri: termsCondition?.url }}
                        // onScroll={_onScroll}
                        showsVerticalScrollIndicator={false}
                        style={styles.webView}
                        onLoad={() => <Loader />}
                        onShouldStartLoadWithRequest={handleUrlNavigation}
                    // originWhitelist={['*']}
                    />

                )}
            </View>
        </AppSafeAreaView>
    )
}

export default TermCondition

const styles = StyleSheet.create({
    containerStyle: {
        paddingHorizontal: vs(20),
        flex: 1
    },
    webView: {
        marginTop: vs(20)
    }
})