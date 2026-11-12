import { StyleSheet } from "react-native";
import { cores, espacos, fontes } from "./theme";

export const styles = StyleSheet.create({
    pressionado: {
        opacity: 0.7,
    },
    topo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: espacos.p,
        marginBottom: espacos.p,
    },
    tipo: {
        flex: 1,
        fontSize: fontes.media,
        fontWeight: "700",
        color: cores.texto,
    },
    rodape: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: espacos.p,
    },
});
