import { StyleSheet } from "react-native";
import { cores, espacos, fontes, raio, toqueMinimo } from "./theme";

export const styles = StyleSheet.create({
    base: {
        minHeight: toqueMinimo + 4,
        borderRadius: raio,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: espacos.m,
        paddingVertical: espacos.p,
        marginBottom: espacos.m,
    },
    primario: {
        backgroundColor: cores.primaria,
    },
    secundario: {
        backgroundColor: cores.branco,
        borderWidth: 2,
        borderColor: cores.primaria,
    },
    perigo: {
        backgroundColor: cores.erro,
    },
    pressionado: {
        opacity: 0.8,
    },
    inativo: {
        opacity: 0.5,
    },
    icone: {
        marginRight: espacos.p,
    },
    texto: {
        fontSize: fontes.media,
        fontWeight: "700",
        textAlign: "center",
    },
});
