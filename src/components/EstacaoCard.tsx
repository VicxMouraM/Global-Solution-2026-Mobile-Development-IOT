import React from "react";
import { Text, View } from "react-native";
import { NIVEIS } from "../constants/risco";
import { styles } from "../styles/estacaoCard.styles";
import { globalStyles } from "../styles/global.styles";
import { Estacao } from "../types";
import Badge from "./Badge";

type EstacaoCardProps = {
    estacao: Estacao;
};

export default function EstacaoCard({ estacao }: EstacaoCardProps) {
    const nivel = NIVEIS[estacao.risco];
    const porcentagem = Math.min(Math.round((estacao.nivel / estacao.cota) * 100), 100);
    const descricao =
        `${estacao.nome}, ${estacao.local}. Situação: ${nivel.rotulo}. ` +
        `Nível do córrego em ${porcentagem} por cento do limite. ` +
        `Chuva de ${estacao.chuva} milímetros por hora.`;

    return (
        <View style={globalStyles.cartao} accessible accessibilityLabel={descricao}>
            <View style={styles.topo}>
                <View style={styles.nomes}>
                    <Text style={styles.nome}>{estacao.nome}</Text>
                    <Text style={globalStyles.textoSuave}>{estacao.local}</Text>
                </View>
                <Badge item={nivel} />
            </View>

            <View style={styles.barraFundo}>
                <View style={[styles.barra, { width: `${porcentagem}%`, backgroundColor: nivel.cor }]} />
            </View>

            <View style={styles.medidas}>
                <Text style={styles.medida}>
                    Córrego: <Text style={styles.valor}>{estacao.nivel} cm</Text> de {estacao.cota} cm
                </Text>
                <Text style={styles.medida}>
                    Chuva: <Text style={styles.valor}>{estacao.chuva} mm/h</Text>
                </Text>
            </View>
        </View>
    );
}
