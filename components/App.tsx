import { useContext } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { LocationContext, LocationStatus } from '@/contexts/LocationContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWeatherQuery } from '@/hooks/useWeatherQuery';
import { LoadingScreen } from './LoadingScreen';

export const App = () => {
    const { location, status } = useContext(LocationContext);

    const { isLoading } = useWeatherQuery({
        latitude: location.latitude,
        longitude: location.longitude,
        enabled: status === LocationStatus.READY
    })

    if (status === LocationStatus.REQUESTED) {
        return (
            <SafeAreaView style={styles.wrapper}>
                <MaterialCommunityIcons name="map-marker-outline" size={32} color="white" />
                <ThemedText style={styles.text}>{'Enable location to check weather'}</ThemedText>
            </SafeAreaView>
        )
    }

    if (status === LocationStatus.REJECTED) {
        return (
            <SafeAreaView style={styles.wrapper}>
                <ThemedText style={styles.text}>  {'Permission to access location was denied'}  </ThemedText>
                <MaterialCommunityIcons name="map-marker-off-outline" size={32} color="white" />
                <ThemedText style={styles.text}>{'Enable location to check weather'}</ThemedText>
            </SafeAreaView>
        )
    }

    if (status === LocationStatus.PENDING || isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
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
