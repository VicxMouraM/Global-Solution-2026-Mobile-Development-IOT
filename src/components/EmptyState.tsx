import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/emptyState.styles";
import { cores } from "../styles/theme";
import { IconName } from "../types";

type EmptyStateProps = {
    title: string;
    text?: string;
    icon?: IconName;
};

export default function EmptyState({ title, text, icon = "file-tray-outline" }: EmptyStateProps) {
    return (
        <View style={styles.container} accessible accessibilityLabel={`${title}. ${text ?? ""}`}>
            <Ionicons name={icon} size={56} color={cores.borda} />
            <Text style={styles.titulo}>{title}</Text>
            {text && <Text style={styles.texto}>{text}</Text>}
        </View>
    );
}
