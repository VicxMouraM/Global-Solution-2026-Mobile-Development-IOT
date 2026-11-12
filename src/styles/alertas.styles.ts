import { StyleSheet } from "react-native";
import { cores, espacos, fontes } from "./theme";

export const styles = StyleSheet.create({
    contagem: {
        marginBottom: espacos.m,
    },
    cartao: {
        borderLeftWidth: 6,
    },
    topo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: espacos.p,
        marginBottom: espacos.p,
    },
    local: {
        fontSize: fontes.media,
        fontWeight: "700",
        color: cores.texto,
    },
    orientacao: {
        marginTop: espacos.p,
    },
});
