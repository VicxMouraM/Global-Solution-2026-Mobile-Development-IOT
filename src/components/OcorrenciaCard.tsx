import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { STATUS, rotuloTipo } from "../constants/ocorrencia";
import { globalStyles } from "../styles/global.styles";
import { styles } from "../styles/ocorrenciaCard.styles";
import { cores } from "../styles/theme";
import { Ocorrencia } from "../types";
import { formatarDataHora } from "../utils/formatters";
import Badge from "./Badge";

type OcorrenciaCardProps = {
    ocorrencia: Ocorrencia;
    showAuthor?: boolean;
    onPress: () => void;
};

export default function OcorrenciaCard({ ocorrencia, showAuthor = false, onPress }: OcorrenciaCardProps) {
    const status = STATUS[ocorrencia.status];
    const tipo = rotuloTipo(ocorrencia.tipo);
    const endereco = `${ocorrencia.endereco}, ${ocorrencia.numero}`;
    const data = formatarDataHora(ocorrencia.criadaEm);

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${tipo} em ${endereco}. Situação: ${status.rotulo}. Registrada em ${data}.`}
            accessibilityHint="Abre os detalhes da ocorrência"
            style={({ pressed }) => [globalStyles.cartao, pressed && styles.pressionado]}
        >
            <View style={styles.topo}>
                <Text style={styles.tipo}>{tipo}</Text>
                <Badge item={status} />
            </View>
            <Text style={globalStyles.texto}>{endereco}</Text>
            {showAuthor && <Text style={globalStyles.textoSuave}>Por: {ocorrencia.usuarioNome}</Text>}
            <View style={styles.rodape}>
                <Text style={globalStyles.textoSuave}>{data}</Text>
                <Ionicons name="chevron-forward" size={20} color={cores.textoSuave} />
            </View>
        </Pressable>
    );
}
