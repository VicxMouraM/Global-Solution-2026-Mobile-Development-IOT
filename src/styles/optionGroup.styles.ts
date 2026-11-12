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
        marginBottom: espacos.p,
    },
    lista: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: espacos.p,
    },
    opcao: {
        minHeight: toqueMinimo,
        flexDirection: "row",
        alignItems: "center",
        gap: espacos.p,
        paddingHorizontal: espacos.m,
        borderRadius: raio,
        borderWidth: 2,
        borderColor: cores.primaria,
        backgroundColor: cores.branco,
    },
    opcaoMarcada: {
        backgroundColor: cores.primaria,
    },
    texto: {
        fontSize: fontes.normal,
        fontWeight: "600",
        color: cores.primaria,
    },
    textoMarcado: {
        color: cores.branco,
    },
    errorText: {
        color: cores.erro,
        fontSize: fontes.pequena,
        marginTop: espacos.pp,
        fontWeight: "600",
    },
});
