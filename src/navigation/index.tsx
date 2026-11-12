import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { styles } from "../styles/navigation.styles";
import { cores } from "../styles/theme";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";

export default function Navigation() {
    const { usuario, loading } = useAuth();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={cores.primaria} accessibilityLabel="Abrindo o app" />
            </View>
        );
    }

    return (
        <NavigationContainer key={usuario ? usuario.id : "visitante"}>
            {usuario ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
