import React from "react";
import { Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, EstacaoCard, Screen } from "../components";
import { NIVEIS } from "../constants/risco";
import { useAuth, useUsuarioLogado } from "../contexts/AuthContext";
import { useSensores } from "../contexts/SensorContext";
import { useOcorrencias } from "../hooks";
import { TabScreenProps } from "../navigation/types";
import { globalStyles } from "../styles/global.styles";
import { styles } from "../styles/painel.styles";
import { cores } from "../styles/theme";

export default function PainelScreen({ navigation }: TabScreenProps<"Painel">) {
    const usuario = useUsuarioLogado();
    const { isAgente } = useAuth();
    const { estacoes, riscoGeral, modo, alternarModo } = useSensores();
    const { abertas } = useOcorrencias();

    const nivel = NIVEIS[riscoGeral];
    const primeiroNome = usuario.nome.split(" ")[0];

    return (
        <Screen>
            <Text style={globalStyles.texto}>Olá, {primeiroNome}.</Text>

            <View
                style={[styles.situacao, { backgroundColor: nivel.cor }]}
                accessible
                accessibilityRole="alert"
                accessibilityLiveRegion="assertive"
                accessibilityLabel={`Situação simulada do bairro: ${nivel.rotulo}. ${nivel.orientacao}`}
            >
                <Ionicons name={nivel.icone} size={48} color={cores.branco} />
                <View style={styles.situacaoTextos}>
                    <Text style={styles.situacaoRotulo}>Situação simulada do bairro</Text>
                    <Text style={styles.situacaoNivel}>{nivel.rotulo}</Text>
                    <Text style={styles.situacaoOrientacao}>{nivel.orientacao}</Text>
                </View>
            </View>

            {isAgente ? (
                <>
                    <View style={globalStyles.cartao}>
                        <Text style={styles.numero}>{abertas}</Text>
                        <Text style={globalStyles.texto}>ocorrências aguardando atendimento</Text>
                    </View>
                    <View style={[globalStyles.cartao, styles.simulacao]}>
                        <View style={styles.simulacaoTextos}>
                            <Text style={styles.simulacaoTitulo}>Simular chuva forte</Text>
                            <Text style={globalStyles.textoSuave}>
                                Altera as leituras fictícias para mostrar como os avisos funcionam.
                            </Text>
                        </View>
                        <Switch
                            value={modo === "chuva"}
                            onValueChange={alternarModo}
                            accessibilityLabel="Simular chuva forte"
                            accessibilityHint="Liga ou desliga a tempestade simulada nos sensores"
                            trackColor={{ false: cores.borda, true: cores.primaria }}
                        />
                    </View>
                </>
            ) : (
                <View style={styles.atalhos}>
                    <View style={styles.atalho}>
                        <Button
                            title="Avisar um problema"
                            icon="megaphone-outline"
                            onPress={() =>
                                navigation.navigate("OcorrenciasTab", { screen: "NovaOcorrencia", initial: false })
                            }
                        />
                    </View>
                    <View style={styles.atalho}>
                        <Button
                            title="Para onde ir"
                            icon="home-outline"
                            variant="secundario"
                            onPress={() => navigation.navigate("Abrigos")}
                        />
                    </View>
                </View>
            )}

            <Text style={globalStyles.subtitulo} accessibilityRole="header">
                Sensores do bairro
            </Text>
            <Text style={[globalStyles.textoSuave, styles.legenda]}>
                Leituras simuladas, atualizadas a cada 4 segundos.
            </Text>
            {estacoes.map((estacao) => (
                <EstacaoCard key={estacao.id} estacao={estacao} />
            ))}
        </Screen>
    );
}
