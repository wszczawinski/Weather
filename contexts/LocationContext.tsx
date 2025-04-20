import { createContext, ReactNode, useEffect, useState } from "react"

import * as Location from 'expo-location';

export enum LocationStatus {
    READY = "READY",
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    REQUESTED = "REQUESTED",
}

type LocationType = { latitude: number, longitude: number }

type LocationContextType = {
    location: LocationType;
    status: LocationStatus;
};

export const LocationContext = createContext<LocationContextType>({
    location: { latitude: 0, longitude: 0 },
    status: LocationStatus.PENDING,
});

export const LocationContextProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState<LocationType>({ latitude: 0, longitude: 0 });
    const [status, setStatus] = useState<LocationStatus>(LocationStatus.PENDING);

    useEffect(() => {
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setStatus(LocationStatus.REJECTED);
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Lowest
            })
            console.log("🚀 -> getCurrentLocation -> location:", location)

            setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            setStatus(LocationStatus.READY);
        }

        getCurrentLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ location, status }}>
            {children}
        </LocationContext.Provider>
    );
}