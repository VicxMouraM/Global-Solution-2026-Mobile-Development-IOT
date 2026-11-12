import { StyleSheet } from "react-native";
import { cores, espacos, fontes } from "./theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: espacos.pp,
        paddingHorizontal: espacos.p + 2,
        paddingVertical: espacos.pp,
        borderRadius: 999,
    },
    texto: {
        color: cores.branco,
        fontSize: fontes.pequena,
        fontWeight: "700",
    },
});
