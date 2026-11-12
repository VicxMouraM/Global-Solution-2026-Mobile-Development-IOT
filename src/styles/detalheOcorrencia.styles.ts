import { StyleSheet } from "react-native";
import { cores, espacos, fontes } from "./theme";

export const styles = StyleSheet.create({
    topo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: espacos.p,
    },
    tipo: {
        fontSize: fontes.grande,
        fontWeight: "700",
        color: cores.texto,
    },
    rotulo: {
        fontSize: fontes.pequena,
        fontWeight: "700",
        color: cores.textoSuave,
        marginTop: espacos.m,
        marginBottom: espacos.pp,
    },
    passo: {
        paddingVertical: espacos.p,
    },
    passoComLinha: {
        borderTopWidth: 1,
        borderTopColor: cores.divisor,
    },
    passoTitulo: {
        fontSize: fontes.normal,
        fontWeight: "700",
        color: cores.texto,
    },
});
