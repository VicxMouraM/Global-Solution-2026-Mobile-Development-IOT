import { StyleSheet } from "react-native";
import { cores, espacos, fontes } from "./theme";

export const styles = StyleSheet.create({
    cabecalho: {
        alignItems: "center",
        marginVertical: espacos.m,
    },
    nome: {
        fontSize: fontes.grande,
        fontWeight: "700",
        color: cores.texto,
        marginTop: espacos.p,
    },
    linha: {
        paddingVertical: espacos.p,
    },
    rotulo: {
        fontSize: fontes.pequena,
        fontWeight: "700",
        color: cores.textoSuave,
    },
    aviso: {
        marginBottom: espacos.m,
    },
});
