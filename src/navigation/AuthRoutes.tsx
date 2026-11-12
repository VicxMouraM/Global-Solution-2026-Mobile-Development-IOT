import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CadastroScreen, LoginScreen } from "../screens";
import { headerOptions } from "./options";
import { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthRoutes() {
    return (
        <Stack.Navigator screenOptions={headerOptions}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: "Criar conta" }} />
        </Stack.Navigator>
    );
}
