import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/contexts/AuthContext";
import { SensorProvider } from "./src/contexts/SensorContext";
import Navigation from "./src/navigation";

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <SensorProvider>
                    <Navigation />
                    <StatusBar style="auto" />
                </SensorProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
