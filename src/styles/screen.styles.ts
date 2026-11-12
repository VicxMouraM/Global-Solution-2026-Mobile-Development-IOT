import { StyleSheet } from "react-native";
import { cores, espacos } from "./theme";

export const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: cores.fundo,
    },
    conteudo: {
        padding: espacos.m,
        paddingBottom: espacos.gg,
        width: "100%",
        maxWidth: 640,
        alignSelf: "center",
    },
    centro: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: cores.fundo,
    },
});
