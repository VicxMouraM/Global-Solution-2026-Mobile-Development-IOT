import { StyleSheet } from "react-native";
import { cores, espacos, fontes } from "./theme";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: espacos.gg,
        paddingHorizontal: espacos.m,
    },
    titulo: {
        fontSize: fontes.media,
        fontWeight: "700",
        color: cores.texto,
        marginTop: espacos.m,
        textAlign: "center",
    },
    texto: {
        fontSize: fontes.normal,
        color: cores.textoSuave,
        marginTop: espacos.p,
        textAlign: "center",
        lineHeight: 24,
    },
});
