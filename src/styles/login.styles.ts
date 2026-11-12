import { StyleSheet } from "react-native";
import { cores, espacos, fontes, raio } from "./theme";

export const styles = StyleSheet.create({
    cabecalho: {
        alignItems: "center",
        marginTop: espacos.g,
        marginBottom: espacos.g,
    },
    frase: {
        fontSize: fontes.normal,
        color: cores.textoSuave,
        marginTop: espacos.pp,
        textAlign: "center",
    },
    demo: {
        marginTop: espacos.m,
        padding: espacos.m,
        borderRadius: raio,
        backgroundColor: cores.primariaClara,
    },
    demoTitulo: {
        fontSize: fontes.normal,
        fontWeight: "700",
        color: cores.texto,
        marginBottom: espacos.pp,
    },
    demoBotoes: {
        flexDirection: "row",
        gap: espacos.p,
        marginTop: espacos.m,
    },
    demoBotao: {
        flex: 1,
    },
});
