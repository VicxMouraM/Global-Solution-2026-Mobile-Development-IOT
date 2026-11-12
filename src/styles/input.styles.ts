import { StyleSheet } from "react-native";
import { cores, espacos, fontes, raio, toqueMinimo } from "./theme";

export const styles = StyleSheet.create({
    container: {
        marginBottom: espacos.m,
    },
    label: {
        fontSize: fontes.normal,
        fontWeight: "700",
        color: cores.texto,
        marginBottom: espacos.pp,
    },
    ajuda: {
        fontSize: fontes.pequena,
        color: cores.textoSuave,
        marginBottom: espacos.pp,
    },
    input: {
        minHeight: toqueMinimo + 4,
        borderWidth: 1.5,
        borderColor: cores.borda,
        borderRadius: raio,
        paddingHorizontal: espacos.m,
        paddingVertical: espacos.p,
        fontSize: fontes.media,
        color: cores.texto,
        backgroundColor: cores.branco,
    },
    inputError: {
        borderColor: cores.erro,
        borderWidth: 2,
    },
    errorText: {
        color: cores.erro,
        fontSize: fontes.pequena,
        marginTop: espacos.pp,
        fontWeight: "600",
    },
});
