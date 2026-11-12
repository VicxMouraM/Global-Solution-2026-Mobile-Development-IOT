import { StyleSheet } from "react-native";
import { cores, espacos, fontes, raio } from "./theme";

export const styles = StyleSheet.create({
    situacao: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacos.m,
        borderRadius: raio,
        padding: espacos.m,
        marginVertical: espacos.m,
    },
    situacaoTextos: {
        flex: 1,
    },
    situacaoRotulo: {
        color: cores.branco,
        fontSize: fontes.pequena,
        fontWeight: "600",
    },
    situacaoNivel: {
        color: cores.branco,
        fontSize: fontes.titulo,
        fontWeight: "800",
    },
    situacaoOrientacao: {
        color: cores.branco,
        fontSize: fontes.normal,
        lineHeight: 22,
        marginTop: espacos.pp,
    },
    atalhos: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: espacos.p,
    },
    atalho: {
        flexGrow: 1,
        flexBasis: 150,
    },
    numero: {
        fontSize: 40,
        fontWeight: "800",
        color: cores.primaria,
    },
    simulacao: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacos.m,
    },
    simulacaoTextos: {
        flex: 1,
    },
    simulacaoTitulo: {
        fontSize: fontes.media,
        fontWeight: "700",
        color: cores.texto,
    },
    legenda: {
        marginBottom: espacos.m,
    },
});
