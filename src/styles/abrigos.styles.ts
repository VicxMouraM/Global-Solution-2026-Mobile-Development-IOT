import { StyleSheet } from "react-native";
import { cores, espacos, fontes } from "./theme";

export const styles = StyleSheet.create({
    topo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: espacos.p,
    },
    nome: {
        flex: 1,
        fontSize: fontes.media,
        fontWeight: "700",
        color: cores.texto,
    },
    distancia: {
        fontSize: fontes.normal,
        fontWeight: "700",
        color: cores.primaria,
    },
    linha: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacos.p,
        marginTop: espacos.p,
    },
    recursos: {
        marginTop: espacos.p,
        marginBottom: espacos.m,
    },
});
