import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "../styles/screen.styles";
import { cores } from "../styles/theme";

type LoadingProps = {
    label?: string;
};

export default function Loading({ label = "Carregando" }: LoadingProps) {
    return (
        <View style={styles.centro}>
            <ActivityIndicator size="large" color={cores.primaria} accessibilityLabel={label} />
        </View>
    );
}
