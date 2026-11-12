import React from "react";
import { ScrollView } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/screen.styles";

type ScreenProps = {
    children: React.ReactNode;
    edges?: Edge[];
};

export default function Screen({ children, edges = [] }: ScreenProps) {
    return (
        <SafeAreaView style={styles.fundo} edges={edges}>
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}
