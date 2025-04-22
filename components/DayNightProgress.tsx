import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import moment from "moment";

import { Indicator } from "@/components/Indicator";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { SECONDS_IN_DAY } from "@/constants";

type FeatherIconName = keyof typeof Feather.glyphMap

interface DayNightProgressProps {
    sunset: string;
    sunrise: string
    daylightDuration: number
}

const Duration = ({ duration }: { duration: number }) => (
    <ThemedText>
        <Feather name="arrow-left" size={16} />
        {moment.utc(duration * 1000).format("HH:mm")}
        <Feather name="arrow-right" size={16} />
    </ThemedText>
)

const IconTime = ({ time, iconName }: { time: string; iconName: FeatherIconName }) => (
    <>
        <Feather name={iconName} size={20} />
        {moment(time).format("HH:mm")}
    </>
)

const TimeIcon = ({ time, iconName }: { time: string; iconName: FeatherIconName }) => (
    <>
        {moment(time).format("HH:mm")}
        <Feather name={iconName} size={20} />
    </>
)

export const DayNightProgress = ({ sunset, sunrise, daylightDuration }: DayNightProgressProps) => {
    const nightDuration = SECONDS_IN_DAY - daylightDuration;
    const now = moment();

    const startOfDay = moment().startOf('day');

    const sunriseSeconds = moment(sunrise).diff(startOfDay, 'seconds');
    const sunsetSeconds = moment(sunset).diff(startOfDay, 'seconds');
    const nowSeconds = now.diff(startOfDay, 'seconds');

    const isDay = nowSeconds > sunriseSeconds && nowSeconds < sunsetSeconds;

    return (
        <ThemedView style={styles.wrapper} >
            {isDay ?
                <>
                    <Indicator min={0} max={daylightDuration} value={Math.abs(nowSeconds - sunriseSeconds)} indicatorLength={65} />
                    <ThemedText style={styles.row}>
                        <IconTime time={sunrise} iconName="sunrise" />

                        <Duration duration={daylightDuration} />

                        <TimeIcon time={sunset} iconName="sunset" />
                    </ThemedText>
                </>
                :
                <>
                    <Indicator min={0} max={nightDuration} value={Math.abs(nowSeconds - sunsetSeconds)} indicatorLength={65} />
                    <ThemedText style={styles.row}>
                        <IconTime time={sunset} iconName="sunset" />

                        <Duration duration={nightDuration} />

                        <TimeIcon time={sunrise} iconName="sunrise" />
                    </ThemedText>
                </>
            }
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        gap: 12
    },
})
