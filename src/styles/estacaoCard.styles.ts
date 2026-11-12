import { StyleSheet } from "react-native";
import { cores, espacos, fontes } from "./theme";

export const styles = StyleSheet.create({
    topo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: espacos.p,
    },
    nomes: {
        flex: 1,
    },
    nome: {
        fontSize: fontes.media,
        fontWeight: "700",
        color: cores.texto,
    },
    barraFundo: {
        height: 12,
        borderRadius: 6,
        backgroundColor: cores.divisor,
        marginVertical: espacos.m,
        overflow: "hidden",
    },
    barra: {
        height: 12,
        borderRadius: 6,
    },
    medidas: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: espacos.p,
    },
    medida: {
        fontSize: fontes.normal,
        color: cores.textoSuave,
    },
    valor: {
        fontWeight: "700",
        color: cores.texto,
    },
});
