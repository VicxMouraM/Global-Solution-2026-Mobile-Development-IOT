import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/button.styles";
import { cores } from "../styles/theme";
import { IconName } from "../types";

type ButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primario" | "secundario" | "perigo";
    icon?: IconName;
    loading?: boolean;
    disabled?: boolean;
    hint?: string;
};

export default function Button({
    title,
    onPress,
    variant = "primario",
    icon,
    loading = false,
    disabled = false,
    hint,
}: ButtonProps) {
    const inativo = disabled || loading;
    const corTexto = variant === "secundario" ? cores.primaria : cores.branco;

    return (
        <Pressable
            onPress={onPress}
            disabled={inativo}
            accessibilityRole="button"
            accessibilityLabel={title}
            accessibilityHint={hint}
            accessibilityState={{ disabled: inativo, busy: loading }}
            style={({ pressed }) => [
                styles.base,
                styles[variant],
                pressed && styles.pressionado,
                inativo && styles.inativo,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={corTexto} />
            ) : (
                <>
                    {icon && <Ionicons name={icon} size={22} color={corTexto} style={styles.icone} />}
                    <Text style={[styles.texto, { color: corTexto }]}>{title}</Text>
                </>
            )}
        </Pressable>
    );
}
