import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/optionGroup.styles";
import { cores } from "../styles/theme";

type Option<T extends string> = {
    chave: T;
    rotulo: string;
};

type OptionGroupProps<T extends string> = {
    label: string;
    options: Option<T>[];
    value: T | "";
    onChange: (chave: T) => void;
    error?: string;
};

export default function OptionGroup<T extends string>({
    label,
    options,
    value,
    onChange,
    error,
}: OptionGroupProps<T>) {
    return (
        <View style={styles.container} accessibilityRole="radiogroup" accessibilityLabel={label}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.lista}>
                {options.map((option) => {
                    const marcada = option.chave === value;
                    return (
                        <Pressable
                            key={option.chave}
                            onPress={() => onChange(option.chave)}
                            accessibilityRole="radio"
                            accessibilityLabel={option.rotulo}
                            accessibilityState={{ selected: marcada, checked: marcada }}
                            style={[styles.opcao, marcada && styles.opcaoMarcada]}
                        >
                            <Ionicons
                                name={marcada ? "radio-button-on" : "radio-button-off"}
                                size={20}
                                color={marcada ? cores.branco : cores.primaria}
                            />
                            <Text style={[styles.texto, marcada && styles.textoMarcado]}>{option.rotulo}</Text>
                        </Pressable>
                    );
                })}
            </View>
            {error ? (
                <Text style={styles.errorText} accessibilityRole="alert">
                    {error}
                </Text>
            ) : null}
        </View>
    );
}
