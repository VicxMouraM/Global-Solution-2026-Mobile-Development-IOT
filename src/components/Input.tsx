import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "../styles/input.styles";
import { cores } from "../styles/theme";

type InputProps = TextInputProps & {
    label: string;
    error?: string;
    help?: string;
};

export default function Input({ label, error, help, style, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {help && <Text style={styles.ajuda}>{help}</Text>}
            <TextInput
                accessibilityLabel={label}
                accessibilityHint={error || help}
                placeholderTextColor={cores.textoSuave}
                style={[styles.input, error ? styles.inputError : null, style]}
                {...props}
            />
            {error ? (
                <Text style={styles.errorText} accessibilityRole="alert" accessibilityLiveRegion="polite">
                    {error}
                </Text>
            ) : null}
        </View>
    );
}
