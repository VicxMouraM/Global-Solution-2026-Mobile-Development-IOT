import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { useSensores } from "../contexts/SensorContext";
import {
    AbrigosScreen,
    AlertasScreen,
    DetalheOcorrenciaScreen,
    NovaOcorrenciaScreen,
    OcorrenciasScreen,
    PainelScreen,
    PerfilScreen,
} from "../screens";
import { styles } from "../styles/navigation.styles";
import { cores } from "../styles/theme";
import { IconName } from "../types";
import { headerOptions } from "./options";
import { AppTabParamList, OcorrenciasStackParamList } from "./types";

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createNativeStackNavigator<OcorrenciasStackParamList>();

type IconesAba = {
    ativo: IconName;
    inativo: IconName;
};

const ICONES: Record<keyof AppTabParamList, IconesAba> = {
    Painel: { ativo: "speedometer", inativo: "speedometer-outline" },
    Alertas: { ativo: "notifications", inativo: "notifications-outline" },
    OcorrenciasTab: { ativo: "megaphone", inativo: "megaphone-outline" },
    Abrigos: { ativo: "home", inativo: "home-outline" },
    Perfil: { ativo: "person", inativo: "person-outline" },
};

function OcorrenciasRoutes() {
    const { isAgente } = useAuth();

    return (
        <Stack.Navigator screenOptions={headerOptions}>
            <Stack.Screen
                name="Ocorrencias"
                component={OcorrenciasScreen}
                options={{ title: isAgente ? "Ocorrências do bairro" : "Meus avisos" }}
            />
            <Stack.Screen
                name="NovaOcorrencia"
                component={NovaOcorrenciaScreen}
                options={{ title: "Avisar um problema" }}
            />
            <Stack.Screen
                name="DetalheOcorrencia"
                component={DetalheOcorrenciaScreen}
                options={{ title: "Detalhes do aviso" }}
            />
        </Stack.Navigator>
    );
}

export default function AppRoutes() {
    const { isAgente } = useAuth();
    const { alertas } = useSensores();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                ...headerOptions,
                tabBarActiveTintColor: cores.primaria,
                tabBarInactiveTintColor: cores.textoSuave,
                tabBarLabelStyle: styles.tabLabel,
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons
                        name={focused ? ICONES[route.name].ativo : ICONES[route.name].inativo}
                        size={size}
                        color={color}
                    />
                ),
            })}
        >
            <Tab.Screen
                name="Painel"
                component={PainelScreen}
                options={{ title: isAgente ? "Painel do agente" : "Meu bairro", tabBarLabel: "Início" }}
            />
            <Tab.Screen
                name="Alertas"
                component={AlertasScreen}
                options={{
                    title: "Alertas",
                    tabBarBadge: alertas.length > 0 ? alertas.length : undefined,
                    tabBarAccessibilityLabel: `Alertas, ${alertas.length} registrados`,
                }}
            />
            <Tab.Screen
                name="OcorrenciasTab"
                component={OcorrenciasRoutes}
                options={{ headerShown: false, tabBarLabel: isAgente ? "Ocorrências" : "Avisos" }}
            />
            {!isAgente && (
                <Tab.Screen
                    name="Abrigos"
                    component={AbrigosScreen}
                    options={{ title: "Para onde ir", tabBarLabel: "Abrigos" }}
                />
            )}
            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{ title: "Meu perfil", tabBarLabel: "Perfil" }}
            />
        </Tab.Navigator>
    );
}
