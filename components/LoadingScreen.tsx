import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

export const LoadingScreen = () => {

    return (
        <SafeAreaView style={styles.wrapper}>
            <ActivityIndicator size={'large'} color={'white'} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text: {
        padding: 20
    }
});
