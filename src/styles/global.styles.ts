import { StyleSheet } from "react-native";
import { cores, espacos, fontes, raio } from "./theme";

export const globalStyles = StyleSheet.create({
    titulo: {
        fontSize: fontes.titulo,
        fontWeight: "700",
        color: cores.texto,
    },
    subtitulo: {
        fontSize: fontes.media,
        fontWeight: "700",
        color: cores.texto,
        marginTop: espacos.g,
        marginBottom: espacos.p,
    },
    texto: {
        fontSize: fontes.normal,
        color: cores.texto,
        lineHeight: 24,
    },
    textoSuave: {
        fontSize: fontes.pequena,
        color: cores.textoSuave,
        lineHeight: 20,
    },
    introducao: {
        fontSize: fontes.normal,
        color: cores.textoSuave,
        lineHeight: 24,
        marginBottom: espacos.m,
    },
    cartao: {
        backgroundColor: cores.cartao,
        borderRadius: raio,
        padding: espacos.m,
        marginBottom: espacos.m,
        borderWidth: 1,
        borderColor: cores.divisor,
    },
    mensagemErro: {
        color: cores.erro,
        fontSize: fontes.normal,
        marginBottom: espacos.m,
        fontWeight: "600",
    },
    mensagemSucesso: {
        color: cores.sucesso,
        fontSize: fontes.normal,
        marginBottom: espacos.m,
        fontWeight: "600",
    },
});
