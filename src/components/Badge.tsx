import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/badge.styles";
import { cores } from "../styles/theme";
import { ItemSelo } from "../types";

type BadgeProps = {
    item: ItemSelo;
    prefix?: string;
};

export default function Badge({ item, prefix = "" }: BadgeProps) {
    return (
        <View
            style={[styles.container, { backgroundColor: item.cor }]}
            accessible
            accessibilityLabel={`${prefix}${item.rotulo}`}
        >
            <Ionicons name={item.icone} size={16} color={cores.branco} />
            <Text style={styles.texto}>{item.rotulo}</Text>
        </View>
    );
}
