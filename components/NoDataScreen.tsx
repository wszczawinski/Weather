import { Feather } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export const NoDataScreen = () => {

    return (
        <SafeAreaView style={styles.wrapper}>
            <ThemedText style={styles.text}>
                {'Oops! Something went wrong with fetching the data'}
            </ThemedText>
            <Feather name={'zap-off'} size={24} color="white" />
            <ThemedText style={styles.text}>
                {'Please try again later or check your internet connection'}
            </ThemedText>
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
    text: { padding: 20 }
});
