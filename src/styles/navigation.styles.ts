import { StyleSheet } from "react-native";
import { cores, fontes } from "./theme";

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: cores.fundo,
    },
    header: {
        backgroundColor: cores.primaria,
    },
    headerTitle: {
        fontWeight: "700",
        fontSize: fontes.media,
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: "600",
    },
});
